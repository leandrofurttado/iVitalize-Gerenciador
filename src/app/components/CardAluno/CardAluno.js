'use client'

import Image from 'next/image'

import styles from './CardAluno.module.css'

import { FaRegTrashCan } from "react-icons/fa6";


import { useState } from 'react';

export default function CardAluno({deleteCardAluno}) {

    const [deleteCard, setDeleteCard] = useState(false)


    const deletaAluno = () =>{
        setDeleteCard(true)
        deleteCardAluno(true)
    }


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
                <button className={styles.deleteButton} onClick={deletaAluno}><FaRegTrashCan /></button>
            </div>
        </div>
    )
}