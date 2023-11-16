'use client'
import {SessionProvider} from 'next-auth/react'
//Coloca os providers em toda a aplicação, tem que colocar no layolt
export default function NextAuthSessionProvider({children}){
    return <SessionProvider>{children}</SessionProvider>
}