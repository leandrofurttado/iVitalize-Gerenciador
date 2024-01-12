'use client'

import Image from 'next/image'

import styles from './CardAluno.module.css'

import { FaRegTrashCan } from "react-icons/fa6";


import { useState } from 'react';

export default function CardAluno({deleteCardAluno, name, email, photo, EditAluno}) {

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
                        src={photo}
                        width={100}
                        height={100}
                        alt='AlunoPic'
                    />
                </div>
                <div className={styles.infoAluno}>
                    <h4>{name}</h4>
                    <p>{email}</p>
                </div>

            </div>
            <div className={styles.buttons}>
                <button className={styles.editButton} onClick={EditAluno}>Editar</button>
                <button className={styles.deleteButton} onClick={deletaAluno}><FaRegTrashCan /></button>
            </div>
        </div>
    )
}