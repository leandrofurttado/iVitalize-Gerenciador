import styles from './Navbar.module.css'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'


const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
})

export default function Navbar() {
    return (
        <nav className={`${poppins.className} ${styles.NavBar}`}>
            <div className={styles.aboveBar}>
                <Image
                    src={`/images/Slogan.png`}
                    width={200}
                    height={80}
                    alt='Logo'
                />
                <div className={styles.imageUser}>
                    <Image
                        src=''
                        width={20}
                        height={20}
                        alt='UserImg'
                    />
                </div>
            </div>
            <ul className={styles.RedirectBar}>
                <li>
                    <Link href='/alunos'> Alunos</Link>
                </li>
                <li>
                    <Link href='/colaboradores'> Colaboradores</Link>
                </li>
                <li>
                    <Link href='/agenda'> Agenda</Link>
                </li>
            </ul>
        </nav>
    )
}