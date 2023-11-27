import styles from './InputsCadastro.module.css'

export default function InputsCadastro({ name, length, placeholder, type, select }) {
    return (
        <div className={`${styles.inputConfig}`}>
            <label>{name}</label>
            {!select && (
                <input className={`${styles.input} ${styles['input_' + length]}`} type={type} placeholder={placeholder}></input>
            )}
            {select == 'sexo' && (
                <select className={`${styles.input} ${styles['input_' + length]}`}>
                    <option>Masculino</option>
                    <option>Feminino</option>
                    <option>Outro</option>
                </select>
            )}
            {select == 'horario' && (
                <select className={`${styles.input} ${styles['input_' + length]}`}>
                    <option>Manhã</option>
                    <option>Tarde</option>
                    <option>Noite</option>
                </select>
            )}
            {select == 'modalidade' && (
                <select className={`${styles.input} ${styles['input_' + length]}`}>
                    <option>Musculação</option>
                    <option>Crossfit</option>
                    <option>Luta</option>
                </select>
            )}


        </div>
    )
}