'use client'
import { Poppins } from 'next/font/google'
import styles from './page.module.css'
import Link from 'next/link'
import CardPlano from '@/app/components/CardsPlano/CardPlano'
import { useAppState } from '@/app/Context/AppState'
import { useRouter } from "next/navigation"
import { toast } from 'react-toastify';


const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
})

export default function Page() {
    const router = useRouter()
    const { formData } = useAppState();

  
    if(!formData){
        router.push('/alunos/cadastro')
        toast.error('Os dados  não estão preenchidos')
        return
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

              if(data){
                console.log('User criado')
                return
              }

        }catch(e){
            console.error(e)
            console.log('Erro no cadastro')
            console.log(parseInt(formData.schedule))
        }
    }
  
    console.log(formData)
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