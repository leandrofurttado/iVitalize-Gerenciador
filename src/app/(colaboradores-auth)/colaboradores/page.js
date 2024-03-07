'use client'
import Navbar from "@/app/components/Navbar/Navbar";

import { Poppins } from 'next/font/google';

import Link from "next/link";
import styles from './page.module.css'
import { IoIosSearch } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { motion } from 'framer-motion';
import { useState, useEffect } from "react";
import { redirect, usePathname } from "next/navigation";
import ReactPaginate from "react-paginate";
import CardPersonal from "@/app/components/CardPersonal/CardPersonal"
import LoadingCadastro from "@/app/components/LoadingCadastro/LoadingCadastro";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


const poppins = Poppins({
    subsets: ['latin'],
    weight: '500'
  })

export default function Page(){
    //PUXA DADOS RETORNADOS PÓS LOGIN
    /* const { data } = useSession(); */
    const [deleteCard, setDeleteCard] = useState(false)
    const [itemsData, setItemsData] = useState([])
    const [pageCount, setPageCount] = useState()
    const [refresh, setRefresh] = useState(false)
    const [personalID, setPersonalID] = useState(null)
    const [search, setSearch] = useState(null)
    const [personalDelete, setPersonalDelete] = useState(false)
    const pathRoute = usePathname();
    const router = useRouter()
    
    const deletingCard = async (idPersonal) => {
        setPersonalID(idPersonal)
        closeDeleteCard();
    };



    const closeDeleteCard = () => {
        setDeleteCard(!deleteCard)
    }

    useEffect(() => {
        setRefresh(true)
        try {
            const getPersonais = async () => {

                const res = await fetch('https://ivitalize-api.onrender.com/api/v1/personals?page=1')
                const data = await res.json()
                let totalPages = Math.ceil(data.length / 16);
                setPageCount(totalPages)
                setItemsData(data)
                setRefresh(false)


            }

            getPersonais()
        } catch (err) {
            toast.error('Houve algum erro!')
            redirect('/home')
        }


    }, [])

    const getSelectedPage = async (currentPage) => {
        setRefresh(true)
        const res = await fetch(`https://ivitalize-api.onrender.com/api/v1/personals?page=${currentPage}`)
        const data = await res.json()


        return data
    }

    const handlePageClick = async (data) => {
        console.log(data.selected)
        let currentPage = data.selected + 1

        const newDataPersonal = await getSelectedPage(currentPage);
        setRefresh(false)
        setItemsData(newDataPersonal);
    }

    const editPersonal = (idPersonal) => {
        router.push(`/colaboradores/${idPersonal}`) 
    }

    const deletePersonal = async () => {
        setRefresh(true);
        closeDeleteCard()
        console.log(personalID, ' personal id')
        let personalIDDelete = personalID;
        try {

            const response = await fetch(`https://ivitalize-api.onrender.com/api/v1/personals/${personalIDDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': "application/json"
                }
            })


            if (response.ok) {
                toast.success('Personal excluído com sucesso!')
                const posDelete = await getSelectedPage(1)
                setItemsData(posDelete);
                setRefresh(false);
            }

        } catch (err) {
            console.log(err)
            toast.error('Ocorreu um erro, tente novamente mais tarde!')
        }


    }

    const searchPersonal = async () => {
        if (search === null) {
            toast.warning("Você deve preencher o campo de pesquisa")
        } else {

            try{
                setRefresh(true);
                const response = await fetch(`https://ivitalize-api.onrender.com/api/v1/personals?search=${search}`, {
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })

                const data = await response.json()

                if(response.ok){
                    setItemsData(data)
                    setRefresh(false);
                }else{
                    setRefresh(false);
                    toast.error('Personal não encontrado!')
                }

            }catch(err){
                setRefresh(false);
                console.log(err)
                toast.error("Ocorreu um erro, tente novamente")
            }


        }
    }


  
    return (
        <main className={poppins.className}>
            {/* <p>COLABORADORES {data.user.name}</p> */}
            <main className={`${poppins.className} ${styles.Main} ${deleteCard ? styles.overlay : ''}`} >
            <Navbar />
            <div className={styles.barPersonais}>
                <h1>PERSONAIS</h1>
                <div className={styles.containerInput}>
                    <div className={styles.searchInput}>
                        <input type="text" placeholder="Pesquisar"  onChange={(e) => { setSearch(e.target.value) }} />
                        <span><IoIosSearch onClick={searchPersonal} /></span>
                    </div>
                    <button>
                        <Link href='/personais/cadastro'> Cadastro de Personais</Link>
                    </button>
                </div>
            </div>
            <hr></hr>

            <section className={styles.cardsPersonais}>
                {refresh ? (
                    <LoadingCadastro />
                ) : (
                    <>
                        {itemsData.map((item) => {
                            return (
                                <CardPersonal key={item.id} deleteCardPersonal={() => deletingCard(item.id)} name={item.full_name} email={item.email} photo={item.photo === null ? '/images/userDefault.png' : item.photo}  EditPersonal={() => editPersonal(item.id)} />
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
                            <h4>Você realmente deseja excluir esse personal?</h4>
                            <div className={styles.ButtonsDeleteDiv}>
                                <button className={styles.deleteBtnPersonal} onClick={deletePersonal}>Sim</button>
                                <button className={styles.CanceldeleteBtnPersonal} onClick={closeDeleteCard} >Não</button>
                            </div>
                        </div>
                    </motion.div>
                </div>


            )}
        </main>
        </main>
    )
}