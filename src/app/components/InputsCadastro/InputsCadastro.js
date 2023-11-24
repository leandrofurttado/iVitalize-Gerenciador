import styles from './InputsCadastro.module.css'

export default function InputsCadastro({name, length, placeholder, type}){
    return (
        <div className={`${styles.inputConfig}`}>
            <label>{name}</label>
            <input className={`${styles.input} ${styles['input_' + length]}`} type={type} placeholder={placeholder}></input>
        </div>
    )
}