import NextAuth from "next-auth"
//Como é email e senha, tem que chamar o credentialsProviders
import CredentialsProvider from "next-auth/providers/credentials";

require('dotenv').config();

const token = process.env.API_TOKEN

//Lidando com as credenciais da API
const nextAuthOptions = {
    providers: [
        //Tipo de providers da API, No caso Email e Senha
        CredentialsProvider({
            name:'credentials',
            credentials:{
                email:{label: 'email', type: 'email'},
                password:{label:'password', type:'password'}
            },
            //Autorização chamada da API
            async authorize(credentials, req){
                const response = await fetch('https://ivitalize.000webhostapp.com/usuarios/login', {
                    method: 'POST',
                    headers:{
                        'authorization': `Bearer ${token}`,
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        //Envia pro back analisar pelos campos email e senha criados pelo back-end
                        email: credentials.email,
                        password: credentials.password
                    })
                })
                //Resposta da chamada
                const user = await response.json()
                

                if (user.tipo == 'sucesso' && response.ok){
                    console.log('Deuuuuuuu!')
                    console.log(user.status)
                    return user
                }
                console.log(user)
                return null

            }
        })
    ],
    //Ignora as paginas pre prontas do next auth, então assim o login fica definido para a pagina /
    pages: {
        signIn: '/',
    }
}

//Usa o nextauthconfirado no handler
const handler = NextAuth(nextAuthOptions)


//exporta o nextauthoptions para ser usado nas pages
export { handler as GET, handler as POST, nextAuthOptions }