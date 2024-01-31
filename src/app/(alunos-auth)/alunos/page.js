'use client'

import Navbar from "@/app/components/Navbar/Navbar";
import { Poppins } from 'next/font/google'
import styles from './page.module.css'
import { IoIosSearch } from "react-icons/io";
import Link from 'next/link'
import { FaXmark } from "react-icons/fa6";
import { motion } from 'framer-motion';
import { useState, useContext, useEffect } from "react";
import { redirect, usePathname } from "next/navigation";
import ReactPaginate from "react-paginate";
import { CadastroContext } from '@/app/Context/CadastroState'
import CardAluno from "@/app/components/CardAluno/CardAluno";
import LoadingCadastro from "@/app/components/LoadingCadastro/LoadingCadastro";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { set } from "date-fns";


const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
})

export default function Page() {
    const [deleteCard, setDeleteCard] = useState(false)
    const { setFormData, setCepValidContext, setPhoto } = useContext(CadastroContext)
    const [itemsData, setItemsData] = useState([])
    const [pageCount, setPageCount] = useState()
    const [refresh, setRefresh] = useState(false)
    const [alunoID, setAlunoID] = useState(null)
    const [alunoDelete, setAlunoDelete] = useState(false)
    const pathRoute = usePathname();
    const router = useRouter()

    if (pathRoute === '/alunos') {
        setFormData('')
        setCepValidContext('gray')
        setPhoto(null)
    }



    const deletingCard = async (idAluno) => {
        setAlunoID(idAluno)
        closeDeleteCard();
    };



    const closeDeleteCard = () => {
        setDeleteCard(!deleteCard)
    }

    useEffect(() => {
        setRefresh(true)
        try {
            const getAlunos = async () => {

                const res = await fetch('https://ivitalize-api.onrender.com/api/v1/students?page=1')
                const data = await res.json()
                let totalPages = Math.ceil(data.length / 16);
                setPageCount(totalPages)
                setItemsData(data)
                setRefresh(false)
            }

            getAlunos()
        } catch (err) {
            toast.error('Houve algum erro!')
            redirect('/home')
        }


    }, [])

    const getSelectedPage = async (currentPage) => {
        setRefresh(true)
        const res = await fetch(`https://ivitalize-api.onrender.com/api/v1/students?page=${currentPage}`)
        const data = await res.json()


        return data
    }

    const handlePageClick = async (data) => {
        console.log(data.selected)
        let currentPage = data.selected + 1

        const newDataAluno = await getSelectedPage(currentPage);
        setRefresh(false)
        setItemsData(newDataAluno);
    }

    const editAluno = (idAluno) => {
        router.push(`/alunos/${idAluno}`)
    }

    const deleteAluno = async () => {
        closeDeleteCard()
        console.log(alunoID, ' aluno id')
        let alunoIdDelete = alunoID;
        try {
            
            const response = await fetch(`https://ivitalize-api.onrender.com/api/v1/students/${alunoIdDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': "application/json"
                }
            })


            if (response.ok) {
                toast.success('Aluno excluído com sucesso!')
                router.push('/')
            }

        } catch (err) {
            console.log(err)
            toast.error('Ocorreu um erro, tente novamente mais tarde!')
        }


    }




    return (
        <main className={`${poppins.className} ${styles.Main} ${deleteCard ? styles.overlay : ''}`} >
            <Navbar />
            <div className={styles.barAlunos}>
                <h1>ALUNOS</h1>
                <div>
                    <label><IoIosSearch /></label>
                    <input></input>
                    <button>
                        <Link href='/alunos/cadastro'> Cadastrar Aluno</Link>
                    </button>
                </div>
            </div>
            <hr></hr>

            <section className={styles.cardsAlunos}>
                {refresh ? (
                    <LoadingCadastro />
                ) : (
                    <>
                        {itemsData.map((item) => {
                            return (
                                <CardAluno key={item.id} deleteCardAluno={() => deletingCard(item.id)} name={item.full_name} email={item.email} photo={item.photo ? item.photo : ''} EditAluno={() => editAluno(item.id)} />
                            )
                        })}

                    </>
                )}
                <div className={styles.paginateDiv}>
                    {pageCount > 1 && (
                        <ReactPaginate
                            previousLabel={'<<'}
                            nextLabel={'>>'}
                            breakLabel={'...'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            className={styles.PaginationClass}
                            activeClassName={styles.activeLI}
                        />
                    )}
                </div>

            </section>


            {deleteCard && (
                <div className={styles.overlay}>
                    <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={styles.deleteCard}>
                            <div className={styles.closeDeleteDiv}>
                                <button className={styles.deleteButton} onClick={closeDeleteCard}><FaXmark /></button>
                            </div>
                            <h4>Você realmente deseja excluir esse aluno?</h4>
                            <div className={styles.ButtonsDeleteDiv}>
                                <button className={styles.deleteBtnAluno} onClick={deleteAluno}>Sim</button>
                                <button className={styles.CanceldeleteBtnAluno} onClick={closeDeleteCard} >Não</button>
                            </div>
                        </div>
                    </motion.div>
                </div>


            )}
        </main>
    )
}