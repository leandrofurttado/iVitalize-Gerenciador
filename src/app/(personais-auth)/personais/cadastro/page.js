'use client'
import { Poppins } from 'next/font/google'
import styles from './page.module.css'
import Image from 'next/image'
import InputsCadastro from '@/app/components/InputsCadastro/InputsCadastro'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { CadastroContext } from '@/app/Context/CadastroState'
import { redirect, useRouter } from "next/navigation"
import { format, addYears } from 'date-fns';
import { toast } from 'react-toastify'
import LoadingCadastro from '@/app/components/LoadingCadastro/LoadingCadastro'

const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
})


export default function personalCadastro() {
    const [formPersonal, setFormPersonal] = useState('')
    const [crefControl, setCrefControl] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [loading, setLoading] = useState(false)

    const router = useRouter()

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


    //Valida email
    const validateEmail = (email) => {
        // Implemente a lógica de validação do email
        // Retorne true se o email for válido, false caso contrário
        return /\S+@\S+\.\S+/.test(email);
    };

    //Valida CPF
    const validateCPF = (cpf) => {
        // Remove caracteres não numéricos
        cpf = cpf.replace(/[^\d]/g, '');

        // Verifica se o CPF possui 11 dígitos
        if (cpf.length !== 11) {
            return false;
        }

        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1{10}$/.test(cpf)) {
            return false;
        }

        // Calcula os dígitos verificadores
        let sum = 0;
        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf[i - 1]) * (11 - i);
        }

        let remainder = (sum * 10) % 11;
        remainder = remainder === 10 ? 0 : remainder;

        if (remainder !== parseInt(cpf[9])) {
            return false;
        }

        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf[i - 1]) * (12 - i);
        }

        remainder = (sum * 10) % 11;
        remainder = remainder === 10 ? 0 : remainder;

        if (remainder !== parseInt(cpf[10])) {
            return false;
        }

        return true;
    };

    //Valida Phone
    const validatePhone = (phone) => {
        // Implemente a lógica de validação do telefone
        // Retorne true se o telefone for válido, false caso contrário
        const regexNumerosOnzeDigitos = /^[0-9]{11}$/;
        return (regexNumerosOnzeDigitos.test(phone))

    };

    //Valida CEP
    const validateCEP = async (cep) => {

        if (cep.length < 8) {

            return false
        }

        const verifyCep = cep
        const response = await fetch(`http://viacep.com.br/ws/${verifyCep}/json/`, {
            method: 'GET',
        })

        const data = await response.json()

        if (response.ok) {

            setFormPersonal((prevForm) => ({
                ...prevForm,
                ['address']: `${data.logradouro} - ${data.uf}`,
                ['neighborhood']: data.bairro
            }))

            return true
        }

    }


    //Validação Form CSS
    const validateInput = (field, value) => {

        if (value === '' || value === undefined) {
            return '#ccc'
        }

        if (field === 'cep' && validateCEP(value) && value.length === 8) {
            return 'lightgreen'
        }

        if (field === 'email' && validateEmail(value)) {
            return 'lightgreen'
        }

        if (field === 'cpf' && validateCPF(value)) {
            return 'lightgreen'
        }

        if (field === 'phone' && validatePhone(value)) {
            return 'lightgreen'
        }

        if (field === 'gender' && value !== undefined && value !== 'Selecione') {
            return 'lightgreen'
        }

        if (field === 'has_cref' && crefControl !== undefined && crefControl !== 'Selecione') {
            return 'lightgreen'
        }

        if (field === 'cref' && value !== undefined && value !== '' && value.length === 11) {
            return 'lightgreen'
        }

        if (field === 'house_number' && value.length >= 1) {
            return 'lightgreen'
        }

        if ((field === 'full_name' || field === "first_name" || field === 'birth_date' || field === 'specialization' || field === 'complement' || field === 'address' || field === 'neighborhood') && value !== undefined && value !== '' && value.length >= 3) {
            return 'lightgreen'
        }


        return 'lightcoral'
    }


    //Lida com Imagem
    const handleImageSelect = (e) => {
        const selectedImage = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setPhoto(reader.result);


            setFormPersonal((prevForm) => ({
                ...prevForm,
                ['photo']: reader.result
            }))

        };

        reader.readAsDataURL(selectedImage);



    };

    //Limpa a imagem caso o usario desista

    const handleClearImage = (e) => {
        document.getElementById('imageUser').value = ""
        setFormPersonal((prevForm) => ({
            ...prevForm,
            ['photo']: null
        }))
        setPhoto(null)
    }



    //Validação Form para envio
    const validateForm = () => {
        // Lógica para verificar todos os campos e retornar true se todos estiverem válidos
        // Se algum campo estiver inválido, retorne false
        // Por exemplo:
        console.log(formPersonal)

        if (formPersonal['has_cref'] === 'true' && formPersonal['has_cref'] !== null) {
            if (formPersonal['cref'] === '') {
                // Se o campo has_cref for "true" e o campo cref estiver vazio, então o formulário é inválido
                return false;
            }
        }

        if (
            validateInput('full_name', formPersonal['full_name']) === 'lightgreen' &&
            validateInput('first_name', formPersonal['first_name']) === 'lightgreen' &&
            validateInput('email', formPersonal['email']) === 'lightgreen' &&
            validateInput('cpf', formPersonal['cpf']) === 'lightgreen' &&
            validateInput('birth_date', formPersonal['birth_date']) === 'lightgreen' &&
            validateInput('gender', formPersonal['gender']) === 'lightgreen' &&
            validateInput('phone', formPersonal['phone']) === 'lightgreen' &&
            validateInput('has_cref', formPersonal['has_cref']) === 'lightgreen' &&
            validateInput('cep', formPersonal['cep']) === 'lightgreen' &&
            validateInput('specialization', formPersonal['specialization']) === 'lightgreen' &&
            validateInput('address', formPersonal['address']) === 'lightgreen' &&
            validateInput('neighborhood', formPersonal['neighborhood']) === 'lightgreen' &&
            validateInput('complement', formPersonal['complement']) === 'lightgreen' &&
            validateInput('house_number', formPersonal['house_number']) === 'lightgreen'



        ) {
            return true
        }

        return false

    };

    //Lida com o envio do formulário
    const handleFormPersonal = async (e) => {
        e.preventDefault()
        if (validateForm()) {
            setLoading(true)
            const response = await fetch("https://ivitalize-api.onrender.com/api/v1/personals", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    full_name: formPersonal.full_name,
                    first_name: formPersonal.first_name,
                    email: formPersonal.email,
                    cpf: formPersonal.cpf,
                    birth_date: formPersonal.birth_date,
                    gender: formPersonal.gender,
                    phone: [
                        formPersonal.phone
                    ],
                    address: formPersonal.address,
                    house_number: formPersonal.house_number,
                    cep: formPersonal.cep,
                    neighborhood: formPersonal.neighborhood,
                    has_cref: formPersonal.has_cref,
                    cref: formPersonal.cref,
                    specialization: formPersonal.specialization,
                    complement: formPersonal.complement,
                    photo: formPersonal.photo
                }),
            })

            const data = await response.json()

            if (response.ok) {
                if (data) {
                    setLoading(false)
                    toast.success("Personal criado com sucesso!")
                    router.replace("/colaboradores")
                }

            } else {
                setLoading(false)
                toast.error("Ocorreu um erro, tente novamente")
            }

            return console.log('FORM CORRETO!')
        } else {
            toast.error("Campos não preenchidos ou inválidos")
            return console.log('Form INCORRETO')
        }

    }



    return (
        <main className={`${poppins.className} ${styles.Main}`}>
            {loading && (
                <LoadingCadastro></LoadingCadastro>
            )}
            {!loading && (
                <>
                               <div className={styles.barPersonal}>
                <h1>CADASTRO PERSONAL</h1>
                <Link href='/colaboradores'>Voltar</Link>
            </div>
            <form>
                <div className={styles.containerInfos}>
                    <div className={styles.containerUserImg}>
                        <div className={styles.userImage}>
                            <Image
                                src={photo ? photo : '/images/userDefault.png'}
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
                                onChange={handleImageSelect}
                            />
                        </div>
                        <button className={styles.btnRemove} onClick={handleClearImage}>Remover</button>
                    </div>

                    <div className={styles.inputsPersonal}>
                        <InputsCadastro name='Nome Completo' length='medium' placeholder='Ex: Maria Soares da Silva' type='text' max={40} onChange={(e) => dataPersonal('full_name', e.target.value)} style={{ border: ` 2px solid ${validateInput('full_name', formPersonal['full_name'])}` }} />
                        <InputsCadastro name='Primeiro Nome' length='small' type='text' placeholder='Ex: Maria' max={10} onChange={(e) => dataPersonal('first_name', e.target.value)} style={{ border: ` 2px solid ${validateInput('first_name', formPersonal['first_name'])}` }} />
                        <InputsCadastro name='Email' length='large' type='email' placeholder='Ex: example@example.com' maxLength={40} onChange={(e) => dataPersonal('email', e.target.value)} style={{ border: ` 2px solid ${validateInput('email', formPersonal['email'])}` }} />
                        <InputsCadastro name='CPF' length='medium' maxLength={11} type='text' placeholder='Ex: 000.000.000-00' onChange={(e) => dataPersonal('cpf', e.target.value)} style={{ border: ` 2px solid ${validateInput('cpf', formPersonal['cpf'])}` }} />
                        <InputsCadastro name='Data de Nascimento' type='date' placeholder='00/00/0000' max={formattedCurrentDate} min={formattedMinDate} onChange={(e) => dataPersonal('birth_date', e.target.value)} style={{ border: ` 2px solid ${validateInput('birth_date', formPersonal['birth_date'])}` }} />
                        <InputsCadastro name='Sexo' length='small' type='select' select='sexo' onChange={(e) => dataPersonal('gender', e.target.value)} style={{ border: ` 2px solid ${validateInput('gender', formPersonal['gender'])}` }} />
                        <InputsCadastro name='Telefone' type='tel' maxLength={11} placeholder='(00) 000000000' onChange={(e) => dataPersonal('phone', e.target.value)} style={{ border: ` 2px solid ${validateInput('phone', formPersonal['phone'])}` }} />
                        <InputsCadastro name='Possui CREF?' type='select' select='cref' value={crefControl} onChange={(e) => crefController('has_cref', e.target.value)} style={{ border: ` 2px solid ${validateInput('has_cref', formPersonal['has_cref'])}` }} />
                        {(crefControl === 'true') && (
                            <InputsCadastro name='CREF' length='medium' maxLength={11} type='text' placeholder='Ex: 000.000.000-00' onChange={(e) => dataPersonal('cref', e.target.value)} style={{ border: ` 2px solid ${validateInput('cref', formPersonal['cref'])}` }} />
                        )}
                        <InputsCadastro name='Especialização' length='medium' type='text' placeholder='Ex: Luta' max={20} onChange={(e) => dataPersonal('specialization', e.target.value)} style={{ border: ` 2px solid ${validateInput('specialization', formPersonal['specialization'])}` }} />
                    </div>
                </div>
                <hr></hr>
                <div className={styles.localization}>
                    <InputsCadastro name='Endereco' type='text' value={formPersonal['address']} length='biggest' placeholder='Ex: Rua exemple' onChange={(e) => dataPersonal('address', e.target.value)} style={{ border: ` 2px solid ${validateInput('address', formPersonal['address'])}` }} />
                    <InputsCadastro name='CEP' type='text' step={1} maxLength={8} placeholder='Ex: 12345-678' onChange={(e) => dataPersonal('cep', e.target.value)} style={{ border: ` 2px solid ${validateInput('cep', formPersonal['cep'])}` }} />
                    <InputsCadastro name='Bairro' type='text' value={formPersonal['neighborhood']} placeholder='Ex: Example' onChange={(e) => dataPersonal('neighborhood', e.target.value)} style={{ border: ` 2px solid ${validateInput('neighborhood', formPersonal['neighborhood'])}` }} />
                    <InputsCadastro name='Complemento' type='text' placeholder='Ex: Casa' onChange={(e) => dataPersonal('complement', e.target.value)} style={{ border: ` 2px solid ${validateInput('complement', formPersonal['complement'])}` }} />
                    <InputsCadastro name='Número' type='text' placeholder='Ex: 32' onChange={(e) => dataPersonal('house_number', e.target.value)} style={{ border: ` 2px solid ${validateInput('house_number', formPersonal['house_number'])}` }} />
                </div>
                <div className={styles.nextStep}>
                    <button onClick={handleFormPersonal}>Cadastrar</button>
                </div>
            </form>
                </>
            )}
 
        </main>
    )
}