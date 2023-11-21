'use client'

import Input from "../components/Input/Input"
import Button from "../components/Button/Button"

import Image from 'next/image'

import styles from '../page.module.css'

import { Poppins } from 'next/font/google'
import '../globals.css'
import {  useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

import { toast } from 'react-toastify';




const poppins = Poppins({
  subsets: ['latin'],
  weight: '800'
})

const poppins_regular = Poppins({
  subsets: ['latin'],
  weight: '300'
})


export default function Login() {



  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()

    if (email === '' || password === '') {
      toast.warn('Todos os campos abaixo deverão ser preenchidos')
      return
    }

    //Chama nosso credentials com a função de logar envinado nossos dados coletados dos inputs email e password
    const result = await signIn('credentials', {
      email,
      password,
      //Coloca false pois se não ele redireciona para uma pagina ja criada do nextAuth, como quero controlar coloco false
      redirect: false
    })

    if (result.error) {
      console.log(result)
      toast.error('Credenciais incorretas!')
      return
    }

    //Deleta o historico para home, então o voltar n jogara mais para o login
    router.replace('/home')
    toast.success('Login realizado com sucesso!')

  }


  return (
  
    <div className={`${styles.main_content} ${poppins.className}`}>
      <Image
        src={`/images/Slogan.png`}
        width={500}
        height={300}
        alt="Logo Slogan" />
      <div className={styles.Container_Form}>
        <div>
          <h1>Bem Vindo!</h1>
          <Image
            src={`/images/IconIvitalizer.png`}
            width={150}
            height={150}
            alt="IconIvitalizer" />
        </div>
        <form >
          <Input onChange={(e) => { setEmail(e.target.value) }} type='email' name='email' placeholder='Digite seu email' BackgroundInput='backgroundGreen' icon='FaEnvelope' />
          <Input onChange={(e) => { setPassword(e.target.value) }} type='password' name='Senha' placeholder='Digite sua senha' BackgroundInput='backgroundGreen' icon='FaLock' showPass={'true'} />
        </form>
        <Button onClick={handleSubmit} className={styles.Button} name='Entrar' type='submit' />
        <div className={styles.Copyright}>
          <span className={`${poppins_regular.className}`}>iVitalize © 2023</span>
        </div>
      </div>

    </div>

  )
}
