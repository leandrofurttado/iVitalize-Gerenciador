'use client'
import { Poppins } from 'next/font/google'
import styles from './page.module.css'
import Link from 'next/link'
import CardPlano from '@/app/components/CardsPlano/CardPlano'
import { useRouter, usePathname, redirect } from "next/navigation"
import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from 'react'
import { CadastroContext } from '@/app/Context/CadastroState'
import Loading from '@/app/loading'
import LoadingCadastro from '@/app/components/LoadingCadastro/LoadingCadastro'




const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
})

export default function Page() {
    const router = useRouter()
    const { formData, photo } = useContext(CadastroContext)
    const [loading, setLoading] = useState(false)

   useEffect(() => {
        const { full_name, first_name, email, cpf, phone, cep, birth_date, address, complement, house_number, gender, schedule, modality } = formData
        if (!full_name || !first_name || !email || !cpf, !phone, !cep, !birth_date || !address || !complement || !house_number || !gender || !schedule || !modality) {
            toast.warn('Todos os campos deverão ser preenchidos!')
            return router.back()
        }

    }, [formData]); 



    async function createStudent() {
        try {

            setLoading(true)
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
                    address: formData.address,
                    cep: formData.cep,
                    neighborhood: formData.neighborhood,
                    complement: formData.complement,
                    house_number: formData.house_number,
                    photo: photo

                }),
            })

            const data = await response.json();

            if (response.ok) {
                setLoading(false)
                router.replace('/alunos')
                toast.success('Aluno cadastrado com sucesso!')
                return data
            } else if (response.ok === 401) {
                setLoading(false)
                router.back()
                toast.error('Aluno já cadastrado')

            }

        } catch (e) {
            setLoading(false)
            console.error(e)
            toast.error('Erro no cadastro, tente novamente!')
            router.replace('/alunos/cadastro')
        }
    }

    return (
        <main>
            {loading && (
                <LoadingCadastro></LoadingCadastro>
            )}

            {!loading && (
                <main className={`${poppins.className} ${styles.Main}`}>
                    <div className={styles.barPlanos}>
                        <h1>PLANOS</h1>
                        <Link href='/alunos/cadastro'>Voltar</Link>
                    </div>

                    <section>
                        <CardPlano onClick={createStudent} plan={'DIAMOND'} price={'R$ 199,90'}/>
                        <CardPlano onClick={createStudent} plan={'GOLD'} price={'R$ 129,90'}/>
                        <CardPlano onClick={createStudent} plan={'SILVER'} price={'R$ 79,90'}/>
                    </section>

                </main>
            )}


        </main>


    )
}