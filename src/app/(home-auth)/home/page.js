import CardsHome from "@/app/components/CardsHome/CardsHome";
import Navbar from "@/app/components/Navbar/Navbar";

import styles from './page.module.css'

import { Poppins } from 'next/font/google'

const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
})

export default function Page() {
    return (
        <main className={`${poppins.className} ${styles.Main}`}>
            <Navbar />
            <section className={styles.cardSection}>
                <CardsHome icon={'FaUsers'} name='ALUNOS CADASTRADOS ATIVOS' value='2567' />
                <CardsHome icon={'FaUserPlus'} name='MATRÍCULAS REALIZADAS' value='3127' />
                <CardsHome icon={'FaUserMinus'} name='MATRÍCULAS CANCELADAS' value='560' />
            </section>

        </main>
    )
}