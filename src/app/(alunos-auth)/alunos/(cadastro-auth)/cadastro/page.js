import { Poppins } from 'next/font/google'
import styles from './page.module.css'
import Image from 'next/image'
import InputsCadastro from '@/app/components/InputsCadastro/InputsCadastro'


const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
})

export default function Page() {
    return (
        <main className={`${poppins.className} ${styles.Main}`}>
            <div className={styles.barAlunos}>
                <h1>CADASTRO</h1>
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
                    <InputsCadastro name='Nome Completo' length='medium' placeholder='Ex: Maria Soares da Silva' type='text'/>
                    <InputsCadastro name='Primeiro Nome' length='small' type='text' placeholder='Ex: Maria'/>
                    <InputsCadastro name='Email' length='large' type='email' placeholder='Ex: example@example.com'/>
                    <InputsCadastro name='CPF' length='medium' type='text' placeholder='Ex: 000.000.000-00'/>
                    <InputsCadastro name='Data de Nascimento' type='date' placeholder='00/00/0000'/>
                    <InputsCadastro name='Sexo' length='small' type='select' />
                    <InputsCadastro name='Telefone 1' type='tel' placeholder='(00) 000000000'/>
                    <InputsCadastro name='Telefone 2' type='tel' placeholder='(00) 000000000'/>
                    <InputsCadastro name='Horário' type='select'/>
                    <InputsCadastro name='Modalidade'type='select'/>
                </div>
            </div>
            <hr></hr>
            <div className={styles.localization}>
                    <InputsCadastro name='Endereço'type='text' length='biggest' placeholder='Rua exemple, 150' />
                    <InputsCadastro name='CEP'type='text' placeholder='12345-678'/>
                    <InputsCadastro name='Bairro'type='text' placeholder='Example'/>
            </div>
        </main>
    )
}