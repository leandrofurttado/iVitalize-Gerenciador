import styles from './Button.module.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
    subsets: ['latin'],
    weight: '400'
})


export default function Button({ name, type, onClick }) {
    return (
        <div className={poppins.className}>
            <button onClick={onClick} className={`${styles.Button} ${poppins.className}`} type={type}>{name}</button>
        </div>
    )
}