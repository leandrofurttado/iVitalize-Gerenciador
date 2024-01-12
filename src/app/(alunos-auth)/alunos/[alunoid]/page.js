'use client'
import styles from './page.module.css'
import { useEffect, useState, useContext } from "react"
import LoadingCadastro from "@/app/components/LoadingCadastro/LoadingCadastro"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import InputsCadastro from "@/app/components/InputsCadastro/InputsCadastro"
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { format, addYears } from 'date-fns';
import { CadastroContext } from '@/app/Context/CadastroState'
import Image from 'next/image'

const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
})



export default function alunoid({ params }) {
    const { formData, setFormData, photo, setPhoto, cepValidContext, setCepValidContext } = useContext(CadastroContext)
    const [refresh, setRefresh] = useState(true)
    const [dataAluno, setDataAluno] = useState([])
    const router = useRouter()

    const id = params.alunoid


    useEffect(() => {
        const validateId = async () => {
            try {
                const res = await fetch(`https://ivitalize-api.onrender.com/api/v1/students/${id}`)
                const data = await res.json()

                if (res.ok) {
                    setRefresh(false)
                    setDataAluno(data)
                }
                
            } catch (err) {
                router.back()
                toast.error('Ocorreu algum erro!')
                setRefresh(false)
                
            }

        }

        validateId()

    }, [])

        //Actual Date
        function getDateLimits() {
            const currentDate = new Date();
            const minDate = addYears(currentDate, -80);
            const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd');
            const formattedMinDate = format(minDate, 'yyyy-MM-dd');
    
            return { formattedCurrentDate, formattedMinDate };
        }
        const { formattedCurrentDate, formattedMinDate } = getDateLimits()
    
        const handleInputChange = (name, value) => {
    
            if (name === 'neighborhood') {
                setBairroCEP(value)
                setdataAluno((prevdataAluno) => ({
                    ...prevdataAluno,
                    [name]: value,
    
    
                }))
            }
    
    
            if (name === 'address') {
                setRuaCep(value)
                setdataAluno((prevdataAluno) => ({
                    ...prevdataAluno,
                    [name]: value,
    
    
                }))
            }
    
            // Update other form fields
            setdataAluno((prevdataAluno) => ({
                ...prevdataAluno,
                [name]: value,
    
    
            }));
    
    
        };
    
    
        const validateInputs = () => {
            // Validação para Nome Completo e Nome
            const { full_name, first_name, email, cpf, phone, cep, birth_date, address, complement, house_number, gender, schedule, modality } = dataAluno
    
    
    
            if (!full_name || !first_name || !email || !cpf, !phone, !cep, !birth_date || !address || !complement || !house_number || !gender || !schedule || !modality) {
                toast.warn('Todos os campos deverão ser preenchidos!')
                console.log(dataAluno)
                return false
            }
    
            if (typeof dataAluno['full_name'] !== 'string' || typeof dataAluno['first_name'] !== 'string' || dataAluno['full_name'].length < 3 || dataAluno['first_name'].length < 3) {
                console.log('Nome completo e primeiro nome devem conter no mínimo 3 letras');
                return false;
            }
    
            if (typeof dataAluno['address'] !== 'string' || typeof dataAluno['neighborhood'] !== 'string' || typeof dataAluno['complement'] !== 'string' || dataAluno['address'].length < 3 || dataAluno['neighborhood'].length < 3 || dataAluno['complement'].length < 3) {
                console.log('Complemento, Endereço e Bairro tem de ser maior que 3');
                return false;
            }
    
            // Validação para CPF
            if (!validateCPF(dataAluno['cpf'])) {
                toast.error('CPF Inválido!')
                return false;
            }
    
            // Validação para Email
            if (!validateEmail(dataAluno['email'])) {
                console.log('Email inválido');
                return false;
            }
    
            // Validação para CEP
            if (
                typeof dataAluno['cep'] !== 'string' ||  // Check if 'cep' is a string
                !validateCEP(dataAluno['cep'], dataAluno['cpf']) ||  // Your custom validation logic
                dataAluno['cep'].length !== 8
            ) {
                toast.error('CEP Inválido')
                return false;
            }
    
            // Validação para Telefone
            if (!validatePhone(dataAluno['phone'])) {
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
            return (regexNumerosOnzeDigitos.test(phone))
    
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
                setdataAluno((prevdataAluno) => ({
                    ...prevdataAluno,
                    cep: cepVerificationResult.result.zipcode,
                    neighborhood: cepVerificationResult.result.district,
                    address: `${cepVerificationResult.result.street}, ${cepVerificationResult.result.city} - ${cepVerificationResult.result.stateShortname}`  // Update the CEP in dataAluno with the validated CEP
    
                }));
    
                return true
            }
            return false
    
        };
    
        function validateInput(field, value) {
            if (field === 'cep' && cepValidContext === 'gray') {
                return '#ccc'
            }
    
            if (value === '' || !value) {
    
                return '#ccc';
            }
    
            if (field === 'email' && validateEmail(value)) {
                return 'lightgreen'
            }
    
            if (field === 'cpf' && validateCPF(value)) {
                return 'lightgreen'
            }
    
            if (field === 'cep' && cepValidContext === 'green') {
                return 'lightgreen'
            }
            if ((field === 'modality' && dataAluno['modality']) || ((field === 'schedule' && dataAluno['schedule'])) || ((field === 'gender' && dataAluno['gender'])) || ((field === 'birth_date' && dataAluno['birth_date']))) {
                return 'lightgreen'
            }
    
            if ((field === 'address' || field === 'neighborhood' || field === 'complement' || field === 'full_name' || field === 'first_name') && value.length > 2) {
                return 'lightgreen'
            }
    
            if (field === 'house_number' && value.length >= 1) {
                return 'lightgreen'
            }
    
            if (field === 'phone' && value) {
                const regexNumerosOnzeDigitos = /^[0-9]{11}$/;
                if (regexNumerosOnzeDigitos.test(value)) {
    
                    return 'lightgreen'
                }
    
    
            }
    
            return 'lightcoral'
    
    
            // Adicione mais lógica de validação para outros campos conforme necessário
        }
    
        const handleImageSelect = (e) => {
            const selectedImage = e.target.files[0];
            const reader = new FileReader();
    
            reader.onload = () => {
                setPhoto(reader.result);
            };
    
            reader.readAsDataURL(selectedImage);
    
        };
    
        const handleClearImage = (e) => {
            setPhoto(null)
        }
    
    
        const handleFormCadastro = () => {
            if (validateInputs()) {
                router.push('/alunos/cadastro/planos')
                console.log('Tudo, ok!')
                // Adicione aqui a lógica para prosseguir com o cadastro
            }
            console.log("Inconformidades nos campos", dataAluno)
        };
    
        const optionsValidate = (field) =>{
            if(field === 'schedule'){
                if(dataAluno['schedule'] === 'morning'){
                    return 0
                }else if(dataAluno['schedule'] === 'afternoon'){
                    return 1
                }else {
                    return 2
                }
            }

            if(field === 'modality'){
                if(dataAluno['modality'] === 'gym'){
                    return 0
                }
                if(dataAluno['modality'] === 'crossfit'){
                    return 1
                }
                if(dataAluno['modality'] === 'fight'){
                    return 2
                }
                if(dataAluno['modality'] === 'dance'){
                    return 3
                }
                if(dataAluno['modality'] === 'pilates'){
                    return 4
                }
                if(dataAluno['modality'] === 'other'){
                    return 5
                }
            }
        }


    return (
        <>
            {refresh && (
                <LoadingCadastro />
            )}
                 <main className={`${poppins.className} ${styles.Main}`}>
            <div className={styles.barAlunos}>
                <h1>EDIÇÃO</h1>
                <Link href='/alunos'>Voltar</Link>
            </div>
            <div className={styles.containerInfos}>
                <div className={styles.containerUserImg}>
                    <div className={styles.userImage}>
                        <Image
                            src={dataAluno.photo ? dataAluno.photo : '/images/userDefault.png'}
                            height={200}
                            width={200}
                            alt='userDefault'
                        />
                    </div>
                    <div className={styles.buttonsImage}>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={handleImageSelect}

                        />
                    </div>
                    <button className={styles.btnRemove} onClick={handleClearImage}>Remover</button>
                </div>
                <div className={styles.inputsAluno}>
                    <InputsCadastro name='Nome Completo' length='medium' placeholder='Ex: Maria Soares da Silva' type='text' value={dataAluno['full_name']} max={40} onChange={(e) => handleInputChange('full_name', e.target.value)} style={{ border: ` 2px solid ${validateInput('full_name', dataAluno['full_name'])}` }} />
                    <InputsCadastro name='Primeiro Nome' length='small' type='text' placeholder='Ex: Maria' value={dataAluno['first_name']} max={10} onChange={(e) => handleInputChange('first_name', e.target.value)} style={{ border: ` 2px solid ${validateInput('first_name', dataAluno['first_name'])}` }} />
                    <InputsCadastro name='Email' length='large' type='email' placeholder='Ex: example@example.com' value={dataAluno['email']} maxLength={40} onChange={(e) => handleInputChange('email', e.target.value)} style={{ border: ` 2px solid ${validateInput('email', dataAluno['email'])}` }} />
                    <InputsCadastro name='CPF' length='medium' maxLength={11} type='text' placeholder='Ex: 000.000.000-00' value={dataAluno['cpf']} onChange={(e) => handleInputChange('cpf', e.target.value)} style={{ border: ` 2px solid ${validateInput('cpf', dataAluno['cpf'])}` }} />
                    <InputsCadastro name='Data de Nascimento' type='date' placeholder='00/00/0000' value={dataAluno['birth_date']} onChange={(e) => handleInputChange('birth_date', e.target.value)} max={formattedCurrentDate} min={formattedMinDate} style={{ border: ` 2px solid ${validateInput('birth_date', dataAluno['birth_date'])}` }} />
                    <InputsCadastro name='Sexo' length='small' type='select' select='sexo' value={dataAluno['gender']} onChange={(e) => handleInputChange('gender', e.target.value)} style={{ border: ` 2px solid ${validateInput('gender', dataAluno['gender'])}` }} />
                    <InputsCadastro name='Telefone' type='tel' maxLength={11} placeholder='(00) 000000000' value={dataAluno['phone']} onChange={(e) => handleInputChange('phone', e.target.value)} style={{ border: ` 2px solid ${validateInput('phone', dataAluno['phone'])}` }} />
                    <InputsCadastro name='Horario' type='select' select='horario' value={optionsValidate('schedule')} onChange={(e) => handleInputChange('schedule', e.target.value)} style={{ border: ` 2px solid ${validateInput('schedule', dataAluno['schedule'])}` }} />
                    <InputsCadastro name='Modalidade' type='select' select='modalidade' value={optionsValidate('modality')} onChange={(e) => handleInputChange('modality', e.target.value)} style={{ border: ` 2px solid ${validateInput('modality', dataAluno['modality'])}` }} />
                </div>
            </div>
            <hr></hr>
            <div className={styles.localization}>
                <InputsCadastro name='Endereco' type='text' value={dataAluno['address']} length='biggest' placeholder='Ex: Rua exemple, 150' onChange={(e) => handleInputChange('address', e.target.value)} style={{ border: ` 2px solid ${validateInput('address', dataAluno['address'])}` }} />
                <InputsCadastro name='CEP' type='text' step={1} maxLength={8} placeholder='Ex: 12345-678' value={dataAluno['cep']} onChange={(e) => completeCEP('cep', e.target.value)} style={{ border: ` 2px solid ${validateInput('cep', cepValidContext)}` }} />
                <InputsCadastro name='Bairro' type='text' value={dataAluno['neighborhood']} placeholder='Ex: Example' onChange={(e) => handleInputChange('neighborhood', e.target.value)} style={{ border: ` 2px solid ${validateInput('neighborhood', dataAluno['neighborhood'])}` }} />
                <InputsCadastro name='Complemento' type='text' value={dataAluno['complement']} placeholder='Ex: Casa' onChange={(e) => handleInputChange('complement', e.target.value)} style={{ border: ` 2px solid ${validateInput('complement', dataAluno['complement'])}` }} />
                <InputsCadastro name='Número' type='text' value={dataAluno['house_number']} placeholder='Ex: 32' onChange={(e) => handleInputChange('house_number', e.target.value)} style={{ border: ` 2px solid ${validateInput('house_number', dataAluno['house_number'])}` }} />
            </div>
            <div className={styles.nextStep}>
                <button onClick={handleFormCadastro} >Avançar</button>
            </div>
        </main>
        </>
    )
}