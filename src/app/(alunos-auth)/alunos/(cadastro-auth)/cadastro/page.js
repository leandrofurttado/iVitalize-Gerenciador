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


const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
})

export default function Page() {

    const { formData, setFormData } = useContext(CadastroContext)
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
        console.log(formData)
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


    const completeCEP = async (cep, value) => {
        setCepInValidation(value)
        const cepVerificationResult = await validateCEP(value);

        if (cepVerificationResult) {
            setBairroCEP(cepVerificationResult.bairro)
            setRuaCep(cepVerificationResult.logradouro)
            const cepSemTraco = cepVerificationResult.cep.replace(/-/g, '');
            // Valid CEP
            setFormData((prevFormData) => ({
                ...prevFormData,
                cep: cepSemTraco,
                neighborhood: cepVerificationResult.bairro,
                address: `${cepVerificationResult.logradouro}, ${cepVerificationResult.localidade} - ${cepVerificationResult.uf}`  // Update the CEP in formData with the validated CEP
                
            }));

            return true
        }
            return false

    };

  function validateInput(field, value) {
    if (value === '' || !value) {
      return '#ccc';
    }

    if (field === 'cep' && value== formData['cep']){
        return 'lightgreen'
    }
    if ((field === 'modality' && formData['modality']) || ((field === 'schedule' && formData['schedule'])) || ((field === 'gender' && formData['gender'])) || ((field === 'birth_date' && formData['birth_date']))){
        return 'lightgreen'
    }

    if ((field === 'address' || field === 'neighborhood' || field === 'complement' ) &&  value.length > 3) {
        // Adapte a lógica de validação para o campo 'Bairro'
        // Neste exemplo, estou apenas verificando se o comprimento é maior que 3
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
                <InputsCadastro name='CEP' type='text'  step={1} maxLength={8} placeholder='Ex: 12345-678' value={cepInValidation} onChange={(e) => completeCEP('cep', e.target.value)} style={{ border: ` 2px solid ${validateInput('cep', cepInValidation)}` }} />
                <InputsCadastro name='Bairro' type='text' value={bairroCep} placeholder='Ex: Example'  onChange={(e) => handleInputChange('neighborhood', e.target.value)} style={{ border: ` 2px solid ${validateInput('neighborhood', formData['neighborhood'])}` }} />
                <InputsCadastro name='Complemento' type='text' value={formData['complement']} placeholder='Ex: Casa'  onChange={(e) => handleInputChange('complement', e.target.value)} style={{ border: ` 2px solid ${validateInput('complement', formData['complement'])}` }}/>
                <InputsCadastro name='Número' type='text' value={formData['house_number']} placeholder='Ex: 32'  onChange={(e) => handleInputChange('house_number', e.target.value)} style={{ border: ` 2px solid ${validateInput('house_number', formData['house_number'])}` }}/>
            </div>
            <div className={styles.nextStep}>
                <button onClick={handleFormCadastro} >Avançar</button>
            </div>
        </main>
    )
}