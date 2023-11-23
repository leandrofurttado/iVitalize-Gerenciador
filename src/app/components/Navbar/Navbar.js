'use client'

//imports auth
import { NextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { signOut } from 'next-auth/react'

import styles from './Navbar.module.css'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'


import { useState } from 'react'
import { useRouter } from 'next/navigation'


const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
})



export default function Navbar() {

    const router = useRouter()
    //Desloga
    async function logout() {
        await signOut({
            redirect: false
        })
        //quando deslogar volta para a raiz
        router.replace('/')
    }

    const [clickImg, setClickImg] = useState(false)

    function handleClick() {
        //Quando mouse estiver por cima, ativa o modal
        setClickImg(!clickImg)
    }


    return (

        <nav className={`${poppins.className} ${styles.NavBar}`}>
            <div className={styles.aboveBar}>
                <Image
                    src={`/images/ivitalize_ngtv.png`}
                    width={290}
                    height={50}
                    alt='Logo'
                />
                <div className={styles.imageUser} onClick={handleClick}>
                    <Image
                        src='/images/Personal.jpeg'
                        width={50}
                        height={50}
                        alt='UserImg'
                    />

                </div>

                {clickImg && (
                    <div className={`${styles.modalUser} ${styles.show}`}>
                        <button>Perfil</button>
                        <button onClick={logout}>Sair</button>
                    </div>
                )}


            </div>
            <ul className={styles.RedirectBar}>
                <li>
                    <Link href='/home'> HOME</Link>
                </li>
                <li>
                    <Link href='/alunos'> ALUNOS</Link>
                </li>
                <li>
                    <Link href='/colaboradores'> COLABORADORES</Link>
                </li>
                <li>
                    <Link href='/agenda'> AGENDA</Link>
                </li>
            </ul>
        </nav>
    )
}