'use client'

import Navbar from "@/app/components/Navbar/Navbar";

import { Poppins } from 'next/font/google'
import styles from './page.module.css'
import { IoIosSearch } from "react-icons/io";
import Link from 'next/link'

import { FaXmark } from "react-icons/fa6";

import { motion } from 'framer-motion';

import { useState } from "react";

import CardAluno from "@/app/components/CardAluno/CardAluno";
const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
})

export default function Page() {

    const [deleteCard, setDeleteCard] = useState(false)

    const deletingCard = (isDeleteclicked) => {
        setDeleteCard(isDeleteclicked);
    };

    const closeDeleteCard = () => {
        setDeleteCard(false)
    }

    return (
        <main className={`${poppins.className} ${styles.Main} ${deleteCard ? styles.overlay : ''}`}>
            <Navbar />
            <div className={styles.barAlunos}>
                <h1>ALUNOS</h1>
                <div>
                    <label><IoIosSearch /></label>
                    <input></input>
                    <button>
                        <Link href='/alunos/cadastro'> Cadastrar Aluno</Link>
                    </button>
                </div>
            </div>
            <hr></hr>
            <section className={styles.cardsAlunos}>
                <CardAluno deleteCardAluno={deletingCard} />
                <CardAluno deleteCardAluno={deletingCard} />
                <CardAluno deleteCardAluno={deletingCard} />
            </section>
            {deleteCard && (
                <div className={styles.overlay}>
                    <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={styles.deleteCard}>
                            <div className={styles.closeDeleteDiv}>
                                <button className={styles.deleteButton} onClick={closeDeleteCard}><FaXmark /></button>
                            </div>
                            <h4>Você realmente deseja excluir esse aluno?</h4>
                            <div className={styles.ButtonsDeleteDiv}>
                                <button className={styles.deleteBtnAluno}>Sim</button>
                                <button className={styles.CanceldeleteBtnAluno} onClick={closeDeleteCard} >Não</button>
                            </div>
                        </div>
                    </motion.div>
                </div>

            )}
        </main>
    )
}