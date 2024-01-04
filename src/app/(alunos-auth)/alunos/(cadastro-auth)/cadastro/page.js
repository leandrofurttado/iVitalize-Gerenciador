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

export default function Page() {

    const { formData, setFormData, photo, setPhoto, cepValidContext, setCepValidContext} = useContext(CadastroContext)
    const [bairroCep, setBairroCEP] = useState('')
    const [ruaCep, setRuaCep] = useState('')
    const [cepInValidation, setCepInValidation] = useState('')
    const router = useRouter()
    
//Actual Date
function getDateLimits() {
    const currentDate = new Date();
    const minDate = addYears(currentDate, -80);
    const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd');
    const formattedMinDate = format(minDate, 'yyyy-MM-dd');
  
    return { formattedCurrentDate, formattedMinDate };
  }
      const {formattedCurrentDate, formattedMinDate} = getDateLimits()

    const handleInputChange = (name, value) => {

            if (name === 'neighborhood'){
                setBairroCEP(value)
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: value,
    
    
                }))
            }

            
            if (name === 'address'){
                setRuaCep(value)
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: value,
    
    
                }))
            }
      
            // Update other form fields
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,


            }));
            
        
    };


    const validateInputs = () => {
        // Validação para Nome Completo e Nome
        const { full_name, first_name, email, cpf, phone, cep, birth_date, address, complement, house_number, gender, schedule, modality } = formData

   

        if (!full_name || !first_name || !email || !cpf, !phone, !cep, !birth_date || !address || !complement || !house_number || !gender || !schedule || !modality) {
            toast.warn('Todos os campos deverão ser preenchidos!')
            console.log(formData)
            return false
        }

        if (typeof formData['full_name'] !== 'string' || typeof formData['first_name'] !== 'string' || formData['full_name'].length < 3 || formData['first_name'].length < 3) {
            console.log('Nome completo e primeiro nome devem conter no mínimo 3 letras');
            return false;
        }

        if (typeof formData['address'] !== 'string' || typeof formData['neighborhood'] !== 'string' || typeof formData['complement'] !== 'string'  || formData['address'].length < 3 || formData['neighborhood'].length < 3 || formData['complement'].length < 3) {
            console.log('Complemento, Endereço e Bairro tem de ser maior que 3');
            return false;
        }

        // Validação para CPF
        if (!validateCPF(formData['cpf'])) {
            toast.error('CPF Inválido!')
            return false;
        }

        // Validação para Email
        if (!validateEmail(formData['email'])) {
            console.log('Email inválido');
            return false;
        }

        // Validação para CEP
        if (
            typeof formData['cep'] !== 'string' ||  // Check if 'cep' is a string
            !validateCEP(formData['cep'], formData['cpf']) ||  // Your custom validation logic
            formData['cep'].length !== 8
        ) {
            toast.error('CEP Inválido')
            return false;
        }

        // Validação para Telefone
        if (!validatePhone(formData['phone'])) {
            toast.error("Telefone deve conter 11 dígitos");
            return false;
        }

        // Todas as validações passaram
        return true;
    };

   

    const validateEmail = (email) => {
        // Implemente a lógica de validação do email
        // Retorne true se o email for válido, false caso contrário
        return /\S+@\S+\.\S+/.test(email);
    };

    const validatePhone = (phone) => {
        // Implemente a lógica de validação do telefone
        // Retorne true se o telefone for válido, false caso contrário
        const regexNumerosOnzeDigitos = /^[0-9]{11}$/;
        return  (regexNumerosOnzeDigitos.test(phone))
       
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
        const cepValid = parseInt(cep, 10)
        
        try {
            const response = await fetch(`https://brasilaberto.com/api/v1/zipcode/${cepValid}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
            });
    
            const cepVerify = await response.json();
    
            if (response.ok) {
                setBairroCEP(cepVerify.bairro)
                setRuaCep(cepVerify.logradouro)
                console.log('CEP VÁLIDO');
                console.log(cepVerify)
                setCepValidContext('green')
          
                return cepVerify;
            } else {
                console.log('CEP INVÁLIDO');
                setCepValidContext('red')
                return false;
            }
        } catch (error) {
            console.error('Erro ao validar CEP:', error);
            console.log('Cep invalido e erro na req')
            return false;
        }
    }


    const completeCEP = async (cep, value) => {
        handleInputChange(cep, value)
        const cepVerificationResult = await validateCEP(value);
        

        if (cepVerificationResult) {
            setBairroCEP(cepVerificationResult.result.district)
            setRuaCep(cepVerificationResult.result.street)
            setCepInValidation(true)
            // Valid CEP
            setFormData((prevFormData) => ({
                ...prevFormData,
                cep: cepVerificationResult.result.zipcode,
                neighborhood: cepVerificationResult.result.district,
                address: `${cepVerificationResult.result.street}, ${cepVerificationResult.result.city} - ${cepVerificationResult.result.stateShortname}`  // Update the CEP in formData with the validated CEP
                
            }));

            return true
        }
            return false

    };

  function validateInput(field, value) {
    if(field === 'cep' && cepValidContext === 'gray'){
        return '#ccc'
    }
   
    if (value === '' || !value) {
    
      return '#ccc';
    }

    if(field === 'email' && validateEmail(value)){
        return 'lightgreen'
    }

    if(field === 'cpf' && validateCPF(value)){
        return 'lightgreen'
    }

    if (field === 'cep' &&  cepValidContext === 'green'){
        return 'lightgreen'
    }
    if ((field === 'modality' && formData['modality']) || ((field === 'schedule' && formData['schedule'])) || ((field === 'gender' && formData['gender'])) || ((field === 'birth_date' && formData['birth_date']))){
        return 'lightgreen'
    }

    if ((field === 'address' || field === 'neighborhood' || field === 'complement' || field === 'full_name' ||field === 'first_name') &&  value.length > 2) {
        return 'lightgreen'
      }

      if(field === 'house_number' && value.length >= 1){
        return 'lightgreen'
      }

      if(field === 'phone' && value){
        const regexNumerosOnzeDigitos = /^[0-9]{11}$/;
         if (regexNumerosOnzeDigitos.test(value)){
            
            return 'lightgreen'
         }

        
      }
  
    return 'lightcoral'
    
  
    // Adicione mais lógica de validação para outros campos conforme necessário
  }


  const handleFormCadastro = () => {
    if (validateInputs()) {
        router.push('/alunos/cadastro/planos')
        console.log('Tudo, ok!')
        // Adicione aqui a lógica para prosseguir com o cadastro
    }
    console.log("Inconformidades nos campos", formData)
};


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
                    <InputsCadastro name='Nome Completo' length='medium' placeholder='Ex: Maria Soares da Silva' type='text' value={formData['full_name']} max={40} onChange={(e) => handleInputChange('full_name', e.target.value)} style={{ border: ` 2px solid ${validateInput('full_name', formData['full_name'])}` }}/>
                    <InputsCadastro name='Primeiro Nome' length='small' type='text' placeholder='Ex: Maria' value={formData['first_name']} max={10} onChange={(e) => handleInputChange('first_name', e.target.value)} style={{ border: ` 2px solid ${validateInput('first_name', formData['first_name'])}` }}/>
                    <InputsCadastro name='Email' length='large' type='email' placeholder='Ex: example@example.com' value={formData['email']} maxLength={40} onChange={(e) => handleInputChange('email', e.target.value)} style={{ border: ` 2px solid ${validateInput('email', formData['email'])}` }}/>
                    <InputsCadastro name='CPF' length='medium' maxLength={11} type='text' placeholder='Ex: 000.000.000-00' value={formData['cpf']} onChange={(e) => handleInputChange('cpf', e.target.value)} style={{ border: ` 2px solid ${validateInput('cpf', formData['cpf'])}` }} />
                    <InputsCadastro name='Data de Nascimento' type='date' placeholder='00/00/0000' value={formData['birth_date']} onChange={(e) => handleInputChange('birth_date', e.target.value)} max={formattedCurrentDate} min={formattedMinDate} style={{ border: ` 2px solid ${validateInput('birth_date', formData['birth_date'])}` }}/>
                    <InputsCadastro name='Sexo' length='small' type='select' select='sexo' value={formData['gender']} onChange={(e) => handleInputChange('gender', e.target.value)} style={{ border: ` 2px solid ${validateInput('gender', formData['gender'])}` }}/>
                    <InputsCadastro name='Telefone' type='tel' maxLength={11} placeholder='(00) 000000000' value={formData['phone']} onChange={(e) => handleInputChange('phone', e.target.value)} style={{ border: ` 2px solid ${validateInput('phone', formData['phone'])}` }}/>
                    <InputsCadastro name='Horario' type='select' select='horario' value={formData['schedule']} onChange={(e) => handleInputChange('schedule', e.target.value)} style={{ border: ` 2px solid ${validateInput('schedule', formData['schedule'])}` }}/>
                    <InputsCadastro name='Modalidade' type='select' select='modalidade' value={formData['modality']} onChange={(e) => handleInputChange('modality', e.target.value)} style={{ border: ` 2px solid ${validateInput('modality', formData['modality'])}` }}/>
                </div>
            </div>
            <hr></hr>
            <div className={styles.localization}>
                <InputsCadastro name='Endereco' type='text' value={formData['address']} length='biggest' placeholder='Ex: Rua exemple, 150'  onChange={(e) => handleInputChange('address', e.target.value)} style={{ border: ` 2px solid ${validateInput('address', formData['address'])}` }}/>
                <InputsCadastro name='CEP' type='text'  step={1} maxLength={8} placeholder='Ex: 12345-678' value={formData['cep']} onChange={(e) => completeCEP('cep', e.target.value)} style={{ border: ` 2px solid ${validateInput('cep', cepValidContext)}` }} />
                <InputsCadastro name='Bairro' type='text' value={formData['neighborhood']} placeholder='Ex: Example'  onChange={(e) => handleInputChange('neighborhood', e.target.value)} style={{ border: ` 2px solid ${validateInput('neighborhood', formData['neighborhood'])}` }} />
                <InputsCadastro name='Complemento' type='text' value={formData['complement']} placeholder='Ex: Casa'  onChange={(e) => handleInputChange('complement', e.target.value)} style={{ border: ` 2px solid ${validateInput('complement', formData['complement'])}` }}/>
                <InputsCadastro name='Número' type='text' value={formData['house_number']} placeholder='Ex: 32'  onChange={(e) => handleInputChange('house_number', e.target.value)} style={{ border: ` 2px solid ${validateInput('house_number', formData['house_number'])}` }}/>
            </div>
            <div className={styles.nextStep}>
                <button onClick={handleFormCadastro} >Avançar</button>
            </div>
        </main>
    )
}