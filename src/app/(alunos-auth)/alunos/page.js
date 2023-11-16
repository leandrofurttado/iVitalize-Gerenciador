import Navbar from "@/app/components/Navbar/Navbar";

import { Poppins } from 'next/font/google'

const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
  })

export default function Page(){
    return (
        <main className={poppins.className}>
            <Navbar/>
            <p>ALUNO PAGINA</p>
        </main>
    )
}