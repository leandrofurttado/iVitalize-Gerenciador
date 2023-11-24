import Navbar from "@/app/components/Navbar/Navbar";

import { Poppins } from 'next/font/google'
import styles from './page.module.css'
import { IoIosSearch } from "react-icons/io";

import CardAluno from "@/app/components/CardAluno/CardAluno";
const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
})

export default function Page() {
    return (
        <main className={`${poppins.className} ${styles.Main}`}>
            <Navbar />
            <div className={styles.barAlunos}>
                <h1>ALUNOS</h1>
                <div>
                    <label><IoIosSearch /></label>
                    <input></input>
                    <button>Cadastrar Aluno</button>
                </div>
            </div>
            <hr></hr>
            <section className={styles.cardsAlunos}>
            <CardAluno/>
            <CardAluno/>
            <CardAluno/>
            </section>
        </main>
    )
}