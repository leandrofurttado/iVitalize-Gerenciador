'use client'
import { Poppins } from 'next/font/google'
import styles from './page.module.css'
import Image from 'next/image'
import InputsCadastro from '@/app/components/InputsCadastro/InputsCadastro'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { CadastroContext } from '@/app/Context/CadastroState'
import { useRouter } from "next/navigation"
import { format, addYears } from 'date-fns';
import { toast } from 'react-toastify'

const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
})


export default function personalCadastro() {
    const [formPersonal, setFormPersonal] = useState('')
    const [crefControl, setCrefControl] = useState(null)

    //Coleta a data atual para travar o input de data de nascimento até o ano atual
    function getDateLimits() {
        const currentDate = new Date();
        const minDate = addYears(currentDate, -80);
        const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd');
        const formattedMinDate = format(minDate, 'yyyy-MM-dd');

        return { formattedCurrentDate, formattedMinDate };
    }
    const { formattedCurrentDate, formattedMinDate } = getDateLimits()

    //Controle do select para inserção no formPersonal
    const crefController = (name, value) => {
        setCrefControl(value)

        if (value === 'true') {
            dataPersonal(name, value)
        } else {
            setFormPersonal((prevForm) => ({
                ...prevForm,
                ['cref']: '',
                ['has_cref']: 'false'
            }))
        }

    }

    //Cria um form geral com todos os campos e valores desejados
    //Assim com o uso de spread operator, mantem o que foi criado anterioremente enquanto cria um novo campo name com um valor desejado
    const dataPersonal = (name, value) => {
        setFormPersonal((prevForm) => ({
            ...prevForm,
            [name]: value
        }))

    }

    //Lida com o envio do formulário
    const handleFormPersonal = (e) => {
        e.preventDefault()
        console.log(formPersonal)
        console.log(formPersonal.cpf, "< Este é o CPF")
    }



    return (
        <main className={`${poppins.className} ${styles.Main}`}>
            <div className={styles.barAlunos}>
                <h1>CADASTRO PERSONAL</h1>
                <Link href='/colaboradores'>Voltar</Link>
            </div>
            <form onSubmit={handleFormPersonal} >
                <div className={styles.containerInfos}>
                    <div className={styles.containerUserImg}>
                        <div className={styles.userImage}>
                            <Image
                                src={''}
                                height={200}
                                width={200}
                                alt='userDefault'
                            />
                        </div>
                        <div className={styles.buttonsImage}>
                            <input
                                type='file'
                                accept='image/*'
                                id='imageUser'

                            />
                        </div>
                        <button className={styles.btnRemove} onClick={''}>Remover</button>
                    </div>

                    <div className={styles.inputsAluno}>
                        <InputsCadastro name='Nome Completo' length='medium' placeholder='Ex: Maria Soares da Silva' type='text' max={40} onChange={(e) => dataPersonal('full_name', e.target.value)} />
                        <InputsCadastro name='Primeiro Nome' length='small' type='text' placeholder='Ex: Maria' max={10} onChange={(e) => dataPersonal('first_name', e.target.value)} />
                        <InputsCadastro name='Email' length='large' type='email' placeholder='Ex: example@example.com' maxLength={40} onChange={(e) => dataPersonal('email', e.target.value)} />
                        <InputsCadastro name='CPF' length='medium' maxLength={11} type='text' placeholder='Ex: 000.000.000-00' onChange={(e) => dataPersonal('cpf', e.target.value)} />
                        <InputsCadastro name='Data de Nascimento' type='date' placeholder='00/00/0000' max={formattedCurrentDate} min={formattedMinDate} onChange={(e) => dataPersonal('birth_date', e.target.value)} />
                        <InputsCadastro name='Sexo' length='small' type='select' select='sexo' onChange={(e) => dataPersonal('gender', e.target.value)} />
                        <InputsCadastro name='Telefone' type='tel' maxLength={11} placeholder='(00) 000000000' onChange={(e) => dataPersonal('phone', e.target.value)} />
                        <InputsCadastro name='Possui CREF?' type='select' select='cref' value={crefControl} onChange={(e) => crefController('has_cref', e.target.value)} />
                        {(crefControl === 'true') && (
                            <InputsCadastro name='CREF' length='medium' maxLength={11} type='text' placeholder='Ex: 000.000.000-00' onChange={(e) => dataPersonal('cref', e.target.value)} />
                        )}
                        <InputsCadastro name='Especialização' length='medium' type='text' placeholder='Ex: Luta' max={20} onChange={(e) => dataPersonal('specialization', e.target.value)} />
                    </div>
                </div>
                <hr></hr>
                <div className={styles.localization}>
                    <InputsCadastro name='Endereco' type='text' length='biggest' placeholder='Ex: Rua exemple, 150' onChange={(e) => dataPersonal('address', e.target.value)} />
                    <InputsCadastro name='CEP' type='text' step={1} maxLength={8} placeholder='Ex: 12345-678' onChange={(e) => dataPersonal('cep', e.target.value)} />
                    <InputsCadastro name='Bairro' type='text' placeholder='Ex: Example' onChange={(e) => dataPersonal('neighborhood', e.target.value)} />
                    <InputsCadastro name='Complemento' type='text' placeholder='Ex: Casa' onChange={(e) => dataPersonal('complement', e.target.value)} />
                    <InputsCadastro name='Número' type='text' placeholder='Ex: 32' onChange={(e) => dataPersonal('house_number', e.target.value)} />
                </div>
                <div className={styles.nextStep}>
                    <button type='submit'>Cadastrar</button>
                </div>
            </form>
        </main>
    )
}