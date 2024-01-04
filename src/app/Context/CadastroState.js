'use client'

import { createContext, useState } from "react"

export const CadastroContext = createContext()

export const CadastroProvider = ({ children }) =>{
    const [formData, setFormData] = useState({})
    const [photo, setPhoto] = useState()
    const [cepValidContext, setCepValidContext] = useState('gray')
    

    return (
        <CadastroContext.Provider value={{formData, setFormData, photo, setPhoto, cepValidContext, setCepValidContext}}>
            {children}
        </CadastroContext.Provider>
    )

}