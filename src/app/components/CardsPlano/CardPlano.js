'use client'

import Image from 'next/image'

import styles from './CardPlano.module.css'

import { FaLocationDot } from "react-icons/fa6";

import { useState } from 'react';

import { motion } from 'framer-motion';

export default function CardPlano({ }) {


    return (
        <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .5 }} 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}

        >
            <div className={styles.cardContainer}>
                <div className={styles.plano}>
                    <h3>Plano</h3>
                    <h5><FaLocationDot /> iVitalize</h5>
                    <h6>a partir de</h6>
                    <h2>100,00</h2>
                    <div>Mensal</div>
                </div>
                <div className={styles.modalidades}>
                    <h4>MODALIDADES</h4>
                    <div className={styles.modalidadeInfos}>
                        <div className={styles.imageModalidade}>
                            <Image
                                src={''}
                                width={50}
                                height={50}
                                alt='Alt'
                                priority={true}
                            />
                        </div>
                        <div>
                            <h5>Boxe</h5>
                            <p>Todo dia</p>
                        </div>
                    </div>
                    <button>
                        <span>MATRICULAR</span>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}