'use client'
import styles from './page.module.css'
import { useEffect, useState, useContext } from "react"
import LoadingCadastro from "@/app/components/LoadingCadastro/LoadingCadastro"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import InputsCadastro from "@/app/components/InputsCadastro/InputsCadastro"
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { format, addYears, set } from 'date-fns';
import { CadastroContext } from '@/app/Context/CadastroState'
import { LiaWindowClose } from "react-icons/lia";
import Image from 'next/image'

const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
})



export default function alunoid({ params }) {
    const { formData, setFormData, cepValidContext, setCepValidContext } = useContext(CadastroContext)
    const [refresh, setRefresh] = useState(true)
    const [disabledInput, setDisabledInput] = useState(true)
    const [dataAluno, setDataAluno] = useState([])
    const [oldArray, setOldArray] = useState(true)
    const [oldAluno, setOldAluno] = useState([])
    const [ruaCep, setRuaCep] = useState()
    const [bairoCep, setBairroCEP] = useState()
    const [cepInValidation, setCepInValidation] = useState(false)
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
                    setOldAluno(data)

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
            setDataAluno((prevDataAluno) => ({
                ...prevDataAluno,
                [name]: bairoCep,


            }))
        }


        if (name === 'address') {
            setRuaCep(value)
            setDataAluno((prevdataAluno) => ({
                ...prevdataAluno,
                [name]: ruaCep,


            }))
        }

        if (name === 'schedule') {
            setDataAluno((prevDataAluno) => ({
                ...prevDataAluno,
                schedule: value,  // Substitua 'schedule' pelo nome do campo que você está tentando atualizar manualmente
            }));
        }

        // Update other form fields
        setDataAluno((prevDataAluno) => ({
            ...prevDataAluno,
            [name]: value,


        }));


    };


    const validateInputs = () => {
        // Validação para Nome Completo e Nome


        const { full_name, first_name, email, cpf, phone, cep, birth_date, address, complement, house_number, gender, schedule, modality } = dataAluno



        if (dataAluno['gender'] === '' || dataAluno['schedule'] === '' || dataAluno['modality'] === '') {
            toast.warn('Todos os campos deverão ser preenchidos!')
            console.log(dataAluno, 'pq esta vazio')
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
            setCepInValidation(true)
            // Valid CEP
            setDataAluno((prevDataAluno) => ({
                ...prevDataAluno,
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
            return '#ccc'
        }

        if (field === 'cpf' && validateCPF(value)) {
            return '#ccc'
        }

        if (field === 'cep' && cepInValidation) {
            return '#ccc'
        }
        if ((field === 'modality' && dataAluno['modality']) || ((field === 'schedule' && dataAluno['schedule'])) || ((field === 'gender' && dataAluno['gender'])) || ((field === 'birth_date' && dataAluno['birth_date']))) {
            return '#ccc'
        }

        if ((field === 'address' || field === 'neighborhood' || field === 'complement' || field === 'full_name' || field === 'first_name') && value.length > 2) {
            return '#ccc'
        }

        if (field === 'house_number' && value.length >= 1) {
            return '#ccc'
        }

        if (field === 'phone' && value) {
            const regexNumerosOnzeDigitos = /^[0-9]{11}$/;
            if (regexNumerosOnzeDigitos.test(value)) {

                return '#ccc'
            }


        }

        return 'lightcoral'


        // Adicione mais lógica de validação para outros campos conforme necessário
    }

    const handleImageSelect = (e) => {
        const selectedImage = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setDataAluno((prevdataAluno) => ({
                ...prevdataAluno,
                photo: reader.result,


            }))
        };

        reader.readAsDataURL(selectedImage);

    };

    const handleClearImage = () => {
        document.getElementById('imageUser').value = ""
        setDataAluno((prevdataAluno) => ({
            ...prevdataAluno,
            photo: null,
        }))
        
    }


    const handleFormCadastro = () => {
        if (validateInputs()) {

            console.log('Tudo, ok!', dataAluno)
            // Adicione aqui a lógica para prosseguir com o cadastro
        } else {
            console.log("Inconformidades nos campos", dataAluno)
            toast.error('Verifique os campos e tente novamente!')
        }

    };

    const optionsValidate = (field) => {
        if (field === 'schedule') {
            console.log('Entramos no horario', dataAluno['schedule'])


            if (dataAluno['schedule'] === '') {
                return null
            } else if (dataAluno['schedule'] === '0') {
                return 0
            }
            else if (dataAluno['schedule'] === "1") {
                return 1
            } else {
                return 2
            }
        }

        if (field === 'modality') {
            if (dataAluno['modality'] === "gym") {
                return 0
            }
            if (dataAluno['modality'] === "crossfit") {
                return 1
            }
            if (dataAluno['modality'] === "fight") {
                return 2
            }
            if (dataAluno['modality'] === "dance") {
                return 3
            }
            if (dataAluno['modality'] === "pilates") {
                return 4
            }
            if (dataAluno['modality'] === "other") {
                return 5
            }
        }
    }

    const optionsValidateOld = (field) => {
        if (field === 'schedule') {



            if (oldAluno['schedule'] === '') {
                return null
            } else if (oldAluno['schedule'] === '0') {
                return 0
            }
            else if (oldAluno['schedule'] === "1") {
                return 1
            } else {
                return 2
            }
        }

        if (field === 'modality') {
            if (oldAluno['modality'] === "gym") {
                return 0
            }
            if (oldAluno['modality'] === "crossfit") {
                return 1
            }
            if (oldAluno['modality'] === "fight") {
                return 2
            }
            if (oldAluno['modality'] === "dance") {
                return 3
            }
            if (oldAluno['modality'] === "pilates") {
                return 4
            }
            if (oldAluno['modality'] === "other") {
                return 5
            }
        }
    }


    const handleEditForm = () => {
        setDisabledInput(!disabledInput)
        setOldArray(false)
    }

    const handleEditFormCancel = () => {
        setDisabledInput(!disabledInput)
        setOldArray(true)
    

    }

    const verifyImage = () => {
        if (oldArray) {
            return oldAluno['photo']
        } else if (dataAluno['photo'] !== null) {
            return dataAluno['photo']
        } else {
            return '/images/userDefault.png'
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
                <div className={styles.editionButton}>
                    {disabledInput && (
                        <button onClick={handleEditForm} >Editar</button>
                    )}{
                    }
                    {!disabledInput && (
                        <LiaWindowClose onClick={handleEditFormCancel} />
                    )}{
                    }

                </div>
                <div className={styles.containerInfos}>
                    <div className={styles.containerUserImg}>
                        <div className={styles.userImage}>
                            <Image
                                src={verifyImage()}
                                height={200}
                                width={200}
                                alt='userImage'
                                
                            />
                        </div>
                        {!disabledInput && (
                            <>
                                <div className={styles.buttonsImage}>
                                    <input
                                        type='file'
                                        accept='image/*'
                                        onChange={handleImageSelect}
                                        id='imageUser'

                                    />
                                </div>
                                <button className={styles.btnRemove} onClick={handleClearImage}>Remover</button>
                            </>
                        )}

                    </div>
                    <div className={styles.inputsAluno}>
                        <InputsCadastro name='Nome Completo' length='medium' placeholder='Ex: Maria Soares da Silva' type='text' disabled={disabledInput} value={oldArray ? oldAluno['full_name'] : dataAluno['full_name']} max={40} onChange={(e) => handleInputChange('full_name', e.target.value)} />
                        <InputsCadastro name='Primeiro Nome' length='small' type='text' disabled={disabledInput} placeholder='Ex: Maria' value={oldArray ? oldAluno['first_name'] : dataAluno['first_name']} max={10} onChange={(e) => handleInputChange('first_name', e.target.value)} />
                        <InputsCadastro name='Email' length='large' type='email' disabled={disabledInput} placeholder='Ex: example@example.com' value={oldArray ? oldAluno['email'] : dataAluno['email']} maxLength={40} onChange={(e) => handleInputChange('email', e.target.value)} />
                        <InputsCadastro name='CPF' length='medium' maxLength={11} type='text' disabled={disabledInput} placeholder='Ex: 000.000.000-00' value={oldArray ? oldAluno['cpf'] : dataAluno['cpf']} onChange={(e) => handleInputChange('cpf', e.target.value)} />
                        <InputsCadastro name='Data de Nascimento' type='date' placeholder='00/00/0000' disabled={disabledInput} value={oldArray ? oldAluno['birth_date'] : dataAluno['birth_date']} onChange={(e) => handleInputChange('birth_date', e.target.value)} max={formattedCurrentDate} min={formattedMinDate} />
                        <InputsCadastro name='Sexo' length='small' type='select' disabled={disabledInput} select='sexo' value={oldArray ? oldAluno['gender'] : dataAluno['gender']} onChange={(e) => handleInputChange('gender', e.target.value)} style={{ border: ` 2px solid ${validateInput('gender', dataAluno['gender'])}` }} />
                        <InputsCadastro name='Telefone' type='tel' disabled={disabledInput} maxLength={11} placeholder='(00) 000000000' value={oldArray ? oldAluno['phone'] : dataAluno['phone']} onChange={(e) => handleInputChange('phone', e.target.value)} style={{ border: ` 2px solid ${validateInput('phone', dataAluno['phone'])}` }} />
                        <InputsCadastro name='Horario' type='select' disabled={disabledInput} select='horario' value={oldArray ? optionsValidateOld('schedule') : optionsValidate('schedule')} onChange={(e) => handleInputChange('schedule', e.target.value)} style={{ border: ` 2px solid ${validateInput('schedule', dataAluno['schedule'])}` }} />
                        <InputsCadastro name='Modalidade' type='select' disabled={disabledInput} select='modalidade' value={oldArray ? optionsValidateOld('modality') : optionsValidate('modality')} onChange={(e) => handleInputChange('modality', e.target.value)} style={{ border: ` 2px solid ${validateInput('modality', dataAluno['modality'])}` }} />
                    </div>
                </div>
                <hr></hr>
                <div className={styles.localization}>
                    <InputsCadastro name='Endereco' type='text' disabled={disabledInput} value={oldArray ? oldAluno['address'] : dataAluno['address']} length='biggest' placeholder='Ex: Rua exemple, 150' onChange={(e) => handleInputChange('address', e.target.value)} />
                    <InputsCadastro name='CEP' type='text' disabled={disabledInput} step={1} maxLength={8} placeholder='Ex: 12345-678' value={oldArray ? oldAluno['cep'] : dataAluno['cep']} onChange={(e) => completeCEP('cep', e.target.value)} />
                    <InputsCadastro name='Bairro' type='text' disabled={disabledInput} value={oldArray ? oldAluno['neighborhood'] : dataAluno['neighborhood']} placeholder='Ex: Example' onChange={(e) => handleInputChange('neighborhood', e.target.value)} />
                    <InputsCadastro name='Complemento' type='text' disabled={disabledInput} value={oldArray ? oldAluno['complement'] : dataAluno['complement']} placeholder='Ex: Casa' onChange={(e) => handleInputChange('complement', e.target.value)} />
                    <InputsCadastro name='Número' type='text' disabled={disabledInput} value={oldArray ? oldAluno['house_number'] : dataAluno['house_number']} placeholder='Ex: 32' onChange={(e) => handleInputChange('house_number', e.target.value)} />
                </div>
                {!disabledInput && (
                    <div className={styles.nextStep}>
                        <button onClick={handleFormCadastro} >Salvar</button>
                    </div>
                )}
            </main>
        </>
    )
}