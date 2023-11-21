'use client'
import Link from 'next/link'
import styles from './not-found.module.css'
import Image from 'next/image'

import { Poppins } from 'next/font/google'


const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
  })

export default function NotFound() {
    return (
        <div className={`${styles.mainContent} ${poppins.className}`}>
            <div>        <Image
                src={'/images/IconIvitalizer.png'}
                width={100}
                height={100}
                alt='Icom'
            /></div>

            <h2>Oops!</h2>
            <h3>Página não encontrada!</h3>
            <Link href="/">Início</Link>
        </div>
    )
}