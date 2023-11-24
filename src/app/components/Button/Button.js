import styles from './Button.module.css'
import { Poppins } from 'next/font/google'
import LoadingLogin from '../LoadingLogin/loading'

const poppins = Poppins({
    subsets: ['latin'],
    weight: '400'
})



export default function Button({ name, type, onClick, refresh }) {

    return (
        <div className={poppins.className}>
            <button onClick={onClick} className={`${styles.Button} ${poppins.className}`} type={type}>
                {refresh ? <LoadingLogin /> : name}
            </button>
        </div>
    )
}