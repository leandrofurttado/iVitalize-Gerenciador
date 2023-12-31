'use client'
import { Poppins } from 'next/font/google'
import styles from './page.module.css'
import Link from 'next/link'
import CardPlano from '@/app/components/CardsPlano/CardPlano'
import { usePathname, useRouter } from "next/navigation"
import { toast } from 'react-toastify';
import { useContext } from 'react'
import {CadastroContext} from '@/app/Context/CadastroState'


const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
})

export default function Page() {
    const router = useRouter()
    const pathRoute = usePathname()
    const {formData} = useContext(CadastroContext)

  if(!formData){
        if(pathRoute === '/alunos/cadastro/planos'){
            router.push('/alunos/cadastro')
        }
        
  }
 

  
    async function createStudent(){
        try{

            const  response = await fetch('https://ivitalize-api.onrender.com/api/v1/students',  {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({
                    full_name: formData.full_name,
                    first_name: formData.first_name,
                    email: formData.email,
                    cpf: formData.cpf,
                    birth_date: formData.birth_date,
                    gender: formData.gender,
                    phone: [
                        formData.phone
                    ],
                    schedule: parseInt(formData.schedule),
                    modality: parseInt(formData.modality),
                    address: formData.adress,
                    cep: formData.cep,
                    neighborhood: formData.neighborhood,

                }),
              })

              const data = await response.json();

              if(response.ok){
                console.log('User criado')
                return data
              }

        }catch(e){
            console.error(e)
            console.log('Erro no cadastro')
            console.log(parseInt(formData.schedule))
        }
    }
  

    return (
        <main className={`${poppins.className} ${styles.Main}`}>
            <div className={styles.barPlanos}>
                <h1>PLANOS</h1>
                <Link href='/alunos/cadastro'>Voltar</Link>
            </div>

            <section>
                <CardPlano onClick={createStudent} />
                <CardPlano onClick={createStudent}/>
                <CardPlano onClick={createStudent}/>
                <CardPlano onClick={createStudent}/>
                <CardPlano onClick={createStudent}/>
            </section>

        </main>
    )
}