import { Poppins } from 'next/font/google'
import './globals.css'
import NextAuthSessionProvider from '@/providers/sessionProviders'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import { CadastroProvider } from './Context/CadastroState';





const inter = Poppins({
  subsets: ['latin'],
  weight: '300'
})


export default async function RootLayout({ children }) {
  //depois verificar mas n precisa
  const session = await getServerSession(nextAuthOptions)

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <NextAuthSessionProvider>
          <CadastroProvider>
            {children}
          </CadastroProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
