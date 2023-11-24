
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export const metadata = {
    title: 'iVitalize - Cadastro',
  }

//Protege a rota quando a sessão não está ativa

export default async function Privatelayout({children}){
    const session = await getServerSession(nextAuthOptions)

    if (!session){
        redirect('/')
    } 

    return <>{children}</>

}
