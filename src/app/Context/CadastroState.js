'use client'

import { createContext, useState } from "react"

export const CadastroContext = createContext()

export const CadastroProvider = ({ children }) =>{
    const [formData, setFormData] = useState({})

    return (
        <CadastroContext.Provider value={{formData, setFormData}}>
            {children}
        </CadastroContext.Provider>
    )

}