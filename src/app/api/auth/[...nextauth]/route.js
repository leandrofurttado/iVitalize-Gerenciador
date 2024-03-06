import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/dist/server/api-utils";
import { toast } from "react-toastify";

const token = process.env.API_TOKEN;

const nextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const response = await
            fetch("https://ivitalize-api.onrender.com/api/v1/users/login", {
              method: "POST",
              headers: {
                'Authorization': `Bearer ${token}`,
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            })
          

         

          const data = await response.json();
           
            const timedOut = () =>{
              toast.error("Ocorreu um erro, tente novamente!")
              redirect('/')
            }

          if(response.ok){
            setTimeout(timedOut, 15000)
            if(!data.error){
              return data
            }
            
          }

          return
        
        } catch (error) {
        
          return error
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
