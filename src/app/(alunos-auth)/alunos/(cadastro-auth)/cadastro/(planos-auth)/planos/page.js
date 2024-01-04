'use client'
import { Poppins } from 'next/font/google'
import styles from './page.module.css'
import Link from 'next/link'
import CardPlano from '@/app/components/CardsPlano/CardPlano'
import { useRouter, usePathname, redirect } from "next/navigation"
import { toast } from 'react-toastify';
import { useContext, useEffect } from 'react'
import { CadastroContext } from '@/app/Context/CadastroState'




const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
})

export default function Page() {
    const router = useRouter()
    const { formData } = useContext(CadastroContext)

    useEffect(() => {
           const { full_name, first_name, email, cpf, phone, cep, birth_date, address, complement, house_number, gender, schedule, modality } = formData
        if (!full_name || !first_name || !email || !cpf, !phone, !cep, !birth_date || !address || !complement || !house_number || !gender || !schedule || !modality) {
            toast.warn('Todos os campos deverão ser preenchidos!')
            return router.back()
        }

      }, [formData]);



    async function createStudent() {
        try {

            const response = await fetch('https://ivitalize-api.onrender.com/api/v1/students', {
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

            if (response.ok) {
                router.replace('/alunos')
                toast.success('Aluno cadastrado com sucesso!')
                return data
            }

        } catch (e) {
            console.error(e)
            toast.error('Erro no cadastro, tente novamente!')
            router.replace('/alunos')
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
                <CardPlano onClick={createStudent} />
                <CardPlano onClick={createStudent} />
                <CardPlano onClick={createStudent} />
                <CardPlano onClick={createStudent} />
            </section>

        </main>
    )
}