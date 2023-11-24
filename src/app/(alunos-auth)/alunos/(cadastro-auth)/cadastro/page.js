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
                <h1>ALUNOS</h1>
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
                    <InputsCadastro name='Nome Completo'/>
                    <InputsCadastro name='Primeiro Nome'/>
                    <InputsCadastro name='Email'/>
                </div>
            </div>
        </main>
    )
}