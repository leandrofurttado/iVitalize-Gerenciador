'use client'
import { Poppins } from 'next/font/google'
import styles from './page.module.css'
import Image from 'next/image'
import InputsCadastro from '@/app/components/InputsCadastro/InputsCadastro'
import Link from 'next/link'
import { useAppState  } from '@/app/Context/AppState'


const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
})

export default function Page() {

    const { formData, setFormData } = useAppState();

    const handleInputChange = (name, value) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
console.log(formData)
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
                    <InputsCadastro name='Nome Completo' length='medium' placeholder='Ex: Maria Soares da Silva' type='text'  value={formData['full_name']} onChange={(e) => handleInputChange('full_name', e.target.value)}/>
                    <InputsCadastro name='Primeiro Nome' length='small' type='text' placeholder='Ex: Maria' value={formData['first_name']} onChange={(e) => handleInputChange('first_name', e.target.value)}/>
                    <InputsCadastro name='Email' length='large' type='email' placeholder='Ex: example@example.com' value={formData['email']} onChange={(e) => handleInputChange('email', e.target.value)}/>
                    <InputsCadastro name='CPF' length='medium' type='text' placeholder='Ex: 000.000.000-00' value={formData['cpf']} onChange={(e) => handleInputChange('cpf', e.target.value)}/>
                    <InputsCadastro name='Data de Nascimento' type='date' placeholder='00/00/0000'value={formData['birth_date']} onChange={(e) => handleInputChange('birth_date', e.target.value)}/>
                    <InputsCadastro name='Sexo' length='small' type='select' select='sexo' value={formData['gender']} onChange={(e) => handleInputChange('gender', e.target.value)} />
                    <InputsCadastro name='Telefone 1' type='tel' placeholder='(00) 000000000' value={formData['phone']} onChange={(e) => handleInputChange('phone', e.target.value)}/>
                    <InputsCadastro name='Telefone 2' type='tel' placeholder='(00) 000000000' value={formData['phone2']} onChange={(e) => handleInputChange('phone2', e.target.value)}/>
                    <InputsCadastro name='Horario' type='select' select='horario' value={formData['schedule']} onChange={(e) => handleInputChange('schedule', e.target.value)}/>
                    <InputsCadastro name='Modalidade'type='select' select='modalidade' value={formData['modality']} onChange={(e) => handleInputChange('modality', e.target.value)}/>
                </div>
            </div>
            <hr></hr>
            <div className={styles.localization}>
                    <InputsCadastro name='Endereco'type='text' length='biggest' placeholder='Ex: Rua exemple, 150' value={formData['adress']} onChange={(e) => handleInputChange('adress', e.target.value)} />
                    <InputsCadastro name='CEP'type='text' placeholder='Ex: 12345-678' value={formData['cep']} onChange={(e) => handleInputChange('cep', e.target.value)}/>
                    <InputsCadastro name='Bairro'type='text' placeholder='Ex: Example' value={formData['neighborhood']} onChange={(e) => handleInputChange('neighborhood', e.target.value)}/>
            </div>
            <div className={styles.nextStep}>
                <Link href='/alunos/cadastro/planos'>Avançar</Link>
            </div>
        </main>
    )
}