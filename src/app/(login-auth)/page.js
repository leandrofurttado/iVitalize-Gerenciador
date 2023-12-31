'use client'

import Input from "../components/Input/Input"
import Button from "../components/Button/Button"
import Image from 'next/image'
import styles from '../page.module.css'
import { Poppins } from 'next/font/google'
import '../globals.css'
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';


const poppins = Poppins({
  subsets: ['latin'],
  weight: '800'
})

const poppins_regular = Poppins({
  subsets: ['latin'],
  weight: '300'
})


export default function Login() {

  const [refresh, setRefresh] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  async function handleEnterKey() {

    if (email === '' || password === '') {
      toast.warn('Todos os campos abaixo deverão ser preenchidos')
      return
    }

    setRefresh(true);
    //Chama nosso credentials com a função de logar envinado nossos dados coletados dos inputs email e password
    const result = await signIn('credentials', {
      email,
      password,
      //Coloca false pois se não ele redireciona para uma pagina ja criada do nextAuth, como quero controlar coloco false
      redirect: false
    })

    if(result.error){
      setRefresh(false);
      toast.error('Credenciais Incorretas!')
      return
    }


    //Deleta o historico para home, então o voltar n jogara mais para o login
    router.replace('/home')
    toast.success('Login realizado com sucesso!')
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (email === '' || password === '') {
      toast.warn('Todos os campos abaixo deverão ser preenchidos')
      return
    }

    setRefresh(true);
    //Chama nosso credentials com a função de logar envinado nossos dados coletados dos inputs email e password
    const result = await signIn('credentials', {
      email,
      password,
      //Coloca false pois se não ele redireciona para uma pagina ja criada do nextAuth, como quero controlar coloco false
      redirect: false
      
    })

console.log(result)


    if(result.error){
      setRefresh(false);
      toast.error('Credenciais Incorretas!')
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
        alt="Logo Slogan"
        priority />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }} className={styles.Container_Form}>
        <div>
          <h1>Bem Vindo!</h1>
          <Image
            src={`/images/IconIvitalizer.png`}
            width={150}
            height={150}
            alt="IconIvitalizer" />
        </div>
        <form >
          <Input onChange={(e) => { setEmail(e.target.value) }} handleEnterKey={handleEnterKey} type='email' name='email' placeholder='Digite seu email'BackgroundInput='backgroundGreen' icon='FaEnvelope' />
          <Input onChange={(e) => { setPassword(e.target.value) }} handleEnterKey={handleEnterKey} type='password' name='Senha' placeholder='Digite sua senha' BackgroundInput='backgroundGreen' icon='FaLock' showPass={'true'} />
        </form>
        <Button functionClick={handleSubmit}   className={styles.Button} name='Entrar' type='submit' refresh={refresh ? true : false} />
        <div className={styles.Copyright}>
          <span className={`${poppins_regular.className}`}>iVitalize © 2023</span>
        </div>
      </motion.div>

    </div >

  )
}
