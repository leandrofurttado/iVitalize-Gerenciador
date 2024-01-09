'use client'

import { Kanit } from 'next/font/google'

import styles from './CardPlano.module.css'

import { FaLocationDot } from "react-icons/fa6";
import { IoCheckmarkCircleOutline } from "react-icons/io5"

import { useState } from 'react';

import { motion } from 'framer-motion';

const inter = Kanit({
    subsets: ['latin'],
    weight: '300'
  })


export default function CardPlano({ onClick, plan, price, beneficities }) {

    

    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}

        >
            <div className={`${styles.cardContainer} ${inter.className}`}>
                <div className={`${styles.plano} ${styles[`plano_${plan}`]}`}>
                    <h3>Plano Musculação</h3>
                    <h4>{plan}</h4>
                    <h5><FaLocationDot /> iVitalize</h5>
                    <h6>a partir de</h6>
                    <h2>{price}</h2>
                    <div>Mensal</div>
                </div>
                <div className={styles.beneficios}>
                    <h4>BENEFÍCIOS</h4>
                    <p><IoCheckmarkCircleOutline /> Acesso à musculação.</p>
                    <p><IoCheckmarkCircleOutline /> Acesso livre em todas as nossas academias (incluindo feriados).</p>
                    <p><IoCheckmarkCircleOutline /> Ajuste de treinos e dietas pelo nosso aplicativo.</p>
                    <p><IoCheckmarkCircleOutline /> Nutricionista disponível para DÚVIDAS.</p>
                    <p><IoCheckmarkCircleOutline /> Fisioterapeuta disponível para DÚVIDAS.</p>
                    <p><IoCheckmarkCircleOutline /> Acesso a todas as modalidades (Luta, dança e esportes).</p>
                    <p><IoCheckmarkCircleOutline /> Nutricionista (1x Consulta por mês).</p>
                    <p><IoCheckmarkCircleOutline /> Massagem (2x por mês).</p>
                    <p><IoCheckmarkCircleOutline /> Suporte de treino em nossos aplicativos diretamente com o personal alocado.</p>
                    <p><IoCheckmarkCircleOutline /> Estacionamento preferencial.</p>
                    <p><IoCheckmarkCircleOutline /> Coqueteleira original GROWTH SUPLEMENTS.</p>
                </div>
                <div className={`${styles.buttonPlano} ${styles[`buttonPlano_${plan}`]}`}>
                    <button onClick={onClick}>
                        <span>MATRICULAR</span>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}