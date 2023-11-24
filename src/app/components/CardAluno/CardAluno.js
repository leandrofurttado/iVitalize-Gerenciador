import Image from 'next/image'

import styles from './CardAluno.module.css'

import { FaRegTrashCan } from "react-icons/fa6";

export default function CardAluno() {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.dataAluno}>
                <div className={styles.alunoImg}>
                    <Image
                        src={''}
                        width={100}
                        height={100}
                        alt='AlunoPic'
                    />
                </div>
                <div className={styles.infoAluno}>
                    <h4>Nome do Aluno</h4>
                    <p>nome.aluno@gmail.com</p>
                </div>

            </div>
            <div className={styles.buttons}>
                <button className={styles.editButton}>Editar</button>
                <button className={styles.deleteButton}><FaRegTrashCan /></button>
            </div>
        </div>
    )
}