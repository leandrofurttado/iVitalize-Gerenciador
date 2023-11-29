import { Poppins } from 'next/font/google'
import styles from './page.module.css'
import Link from 'next/link'
import CardPlano from '@/app/components/CardsPlano/CardPlano'



const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
})

export default function Page() {
    return (
        <main className={`${poppins.className} ${styles.Main}`}>
            <div className={styles.barPlanos}>
                <h1>PLANOS</h1>
                <Link href='/alunos/cadastro'>Voltar</Link>
            </div>

            <section>
                <CardPlano />
                <CardPlano />
                <CardPlano />
                <CardPlano />
                <CardPlano />
            </section>

        </main>
    )
}