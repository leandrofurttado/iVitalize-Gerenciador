import styles from './Button.module.css'
import { Poppins } from 'next/font/google'


const poppins = Poppins({
    subsets: ['latin'],
    weight: '400'
})



export default function Button({ name, type, functionClick, refresh }) {


    return (
        
            <button onClick={functionClick}  className={`${styles.Button} ${poppins.className}`} type={type}>
                {refresh ? <p className={styles.loading_circle}></p> : <p>{name}</p>}
            </button>
        
    )
}