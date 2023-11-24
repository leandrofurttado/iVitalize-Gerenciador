import styles from './InputsCadastro.module.css'

export default function InputsCadastro({name}){
    return (
        <div className={styles.inputConfig}>
            <label>{name}</label>
            <input></input>
        </div>
    )
}