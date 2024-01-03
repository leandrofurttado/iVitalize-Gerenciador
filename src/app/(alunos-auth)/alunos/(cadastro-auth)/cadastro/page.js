'use client'
import { Poppins } from 'next/font/google'
import styles from './page.module.css'
import Image from 'next/image'
import InputsCadastro from '@/app/components/InputsCadastro/InputsCadastro'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { CadastroContext } from '@/app/Context/CadastroState'
import { useRouter } from "next/navigation"


const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
})

export default function Page() {

    const { formData, setFormData } = useContext(CadastroContext)
    const [bairroCep, setBairroCEP] = useState('')
    const [ruaCep, setRuaCep] = useState('')
    const router = useRouter()



    const handleInputChange = (name, value) => {
        if (name === 'neighborhood') {
            // Update only the neighborhood field
            setBairroCEP(value);
        } else if (name === 'adress') {
            // Update only the address field
            setRuaCep(value);
        } else {
            // Update other form fields
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };


    const validateInputs = () => {
        // Validação para Nome Completo e Nome
        const { full_name, first_name, email, cpf, phone, phone2, cep, birth_date } = formData

   

        if (!full_name || !first_name || !email || !cpf || !phone || !phone2 || !cep || !birth_date) {
            console.log('Campos em branco!')
            return false
        }

        if (formData['full_name'].length < 3 || formData['first_name'].length < 3) {
            console.log('Nome completo e primeiro nome devem conter no mínimo 3 letras');
            return false;
        }

        // Validação para CPF
        if (!validateCPF(formData['cpf'])) {
            console.log('CPF inválido');
            return false;
        }

        // Validação para Email
        if (!validateEmail(formData['email'])) {
            console.log('Email inválido');
            return false;
        }

        // Validação para CEP
        if (!validateCEP(formData['cep'], formData['cpf']) || formData['cep'].length > 9 || formData['cep'] < 8) {
            console.log('CEP inválido');
            return false;
        }

        // Validação para Telefone
        if (!validatePhone(formData['phone']) || !validatePhone(formData['phone2'])) {
            console.log('Telefone inválido');
            return false;
        }

        // Todas as validações passaram
        return true;
    };

    const handleFormCadastro = () => {
        if (validateInputs()) {
            router.replace('/alunos/cadastro/planos')
            // Adicione aqui a lógica para prosseguir com o cadastro
        }
    };

    const validateEmail = (email) => {
        // Implemente a lógica de validação do email
        // Retorne true se o email for válido, false caso contrário
        return /\S+@\S+\.\S+/.test(email);
    };

    const validatePhone = (phone) => {
        // Implemente a lógica de validação do telefone
        // Retorne true se o telefone for válido, false caso contrário
        const regexTelefone = /^(?:\()?\d{0,2}(?:\))?(?:[-.\s]?\d{4,5}){1,2}[-.\s]?\d{4}$/;

        return (regexTelefone.test(phone));
       
    };

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

    async function validateCEP(cep) {
        console.log(cep);
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
            });
    
            const cepVerify = await response.json();
    
            if (!cepVerify.erro) {
                setBairroCEP(cepVerify.bairro)
                setRuaCep(cepVerify.logradouro)
                console.log('CEP VÁLIDO');
                console.log(cepVerify)
          
                return cepVerify;
            } else {
                console.log('CEP INVÁLIDO');
                return false;
            }
        } catch (error) {
            console.error('Erro ao validar CEP:', error);
            console.log('Cep invalido e erro na req')
            return false;
        }
    }


 function completeCEP(cep, value){
    validateCEP(value)
   
  }

    return (
        <main className={`${poppins.className} ${styles.Main}`}>
            <div className={styles.barAlunos}>
                <h1>CADASTRO</h1>
                <Link href='/alunos'>Voltar</Link>
            </div>
            <div className={styles.containerInfos}>
                <div className={styles.containerUserImg}>
                    <div className={styles.userImage}>
                        <Image
                            src='/images/userDefault.png'
                            height={150}
                            width={150}
                            alt='userDefault'
                        />
                        <div className={styles.buttonsImage}>
                            <button className={styles.btnAdd}>Adicionar</button>
                            <button className={styles.btnRemove}>Remover</button>
                        </div>
                    </div>
                </div>
                <div className={styles.inputsAluno}>
                    <InputsCadastro name='Nome Completo' length='medium' placeholder='Ex: Maria Soares da Silva' type='text' value={formData['full_name']} onChange={(e) => handleInputChange('full_name', e.target.value)} />
                    <InputsCadastro name='Primeiro Nome' length='small' type='text' placeholder='Ex: Maria' value={formData['first_name']} onChange={(e) => handleInputChange('first_name', e.target.value)} />
                    <InputsCadastro name='Email' length='large' type='email' placeholder='Ex: example@example.com' value={formData['email']} onChange={(e) => handleInputChange('email', e.target.value)} />
                    <InputsCadastro name='CPF' length='medium' type='text' placeholder='Ex: 000.000.000-00' value={formData['cpf']} onChange={(e) => handleInputChange('cpf', e.target.value)} />
                    <InputsCadastro name='Data de Nascimento' type='date' placeholder='00/00/0000' value={formData['birth_date']} onChange={(e) => handleInputChange('birth_date', e.target.value)} />
                    <InputsCadastro name='Sexo' length='small' type='select' select='sexo' value={formData['gender']} onChange={(e) => handleInputChange('gender', e.target.value)} />
                    <InputsCadastro name='Telefone 1' type='tel' placeholder='(00) 000000000' value={formData['phone']} onChange={(e) => handleInputChange('phone', e.target.value)} />
                    <InputsCadastro name='Telefone 2' type='tel' placeholder='(00) 000000000' value={formData['phone2']} onChange={(e) => handleInputChange('phone2', e.target.value)} />
                    <InputsCadastro name='Horario' type='select' select='horario' value={formData['schedule']} onChange={(e) => handleInputChange('schedule', e.target.value)} />
                    <InputsCadastro name='Modalidade' type='select' select='modalidade' value={formData['modality']} onChange={(e) => handleInputChange('modality', e.target.value)} />
                </div>
            </div>
            <hr></hr>
            <div className={styles.localization}>
                <InputsCadastro name='Endereco' type='text' length='biggest' placeholder='Ex: Rua exemple, 150' value={ruaCep} onChange={(e) => handleInputChange('adress', e.target.value)} />
                <InputsCadastro name='CEP' type='text' placeholder='Ex: 12345-678' value={formData['cep']} onChange={(e) => completeCEP('cep', e.target.value)} />
                <InputsCadastro name='Bairro' type='text' placeholder='Ex: Example' value={bairroCep} onChange={(e) => handleInputChange('neighborhood', e.target.value)} />
            </div>
            <div className={styles.nextStep}>
                <button onClick={handleFormCadastro} >Avançar</button>
            </div>
        </main>
    )
}