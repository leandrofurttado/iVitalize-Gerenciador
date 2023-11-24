'use client'

//imports auth
import { NextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { signOut } from 'next-auth/react'
import { motion } from 'framer-motion';
import styles from './Navbar.module.css'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'


import { useEffect, useState } from 'react'
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

    function openTab() {
        //Quando mouse estiver por cima, ativa o modal
        setClickImg(!clickImg)
        
    }





    return (

        <nav className={`${poppins.className} ${styles.NavBar}`} >
            <div className={styles.aboveBar}>
                <Image
                    src={`/images/ivitalize_ngtv.png`}
                    width={290}
                    height={50}
                    alt='Logo'
                />
                <div className={styles.imageUser}  >
                    <Image
                        src='/images/Personal.jpeg'
                        width={50}
                        height={50}
                        alt='UserImg'
                        onClick={openTab}
                    />

                </div>

                {clickImg && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: 1, y: 0 }}    
                        transition={{ duration: 0.5 }}
                        className={`${styles.modalUser} ${styles.show}`}
                    >
                        <button>Perfil</button>
                        <button className={`${styles.exit}`} onClick={logout}>Sair</button>
                    </motion.div>
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