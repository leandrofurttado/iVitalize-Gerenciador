'use client'

import Image from 'next/image'

import styles from './CardPersonal.module.css'

import { FaRegTrashCan } from "react-icons/fa6";


import { useState } from 'react';

export default function CardPersonal({deleteCardPersonal, name, email, photo, EditPersonal, idforDelete}) {

  

    return (
        <div className={styles.cardContainer}>
            <div className={styles.dataPersonal}>
                <div className={styles.PersonalImg}>
                    <Image
                        src={photo}
                        width={100}
                        height={100}
                        alt='PersonalPic'
                    />
                </div>
                <div className={styles.infoPersonal}>
                    <h4>{name}</h4>
                    <p>{email}</p>
                </div>

            </div>
            <div className={styles.buttons}>
                <button className={styles.editButton} onClick={EditPersonal}>Editar</button>
                <button className={styles.deleteButton} onClick={deleteCardPersonal}><FaRegTrashCan /></button>
            </div>
        </div>
    )
}