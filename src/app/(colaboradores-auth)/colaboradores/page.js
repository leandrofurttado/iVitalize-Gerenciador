'use client'
import Navbar from "@/app/components/Navbar/Navbar";

import { Poppins } from 'next/font/google';

import { useSession } from 'next-auth/react';

const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
  })

export default function Page(){
    //PUXA DADOS RETORNADOS PÓS LOGIN
    const { data } = useSession();
    
  
    return (
        <main className={poppins.className}>
            <Navbar/>
            <p>COLABORADORES {data.user.name}</p>
        </main>
    )
}