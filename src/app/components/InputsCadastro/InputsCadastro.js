import styles from './InputsCadastro.module.css'



export default function InputsCadastro({ name, length, placeholder, type, select, value, onChange, isValid, style }) {
    return (
        <div className={`${styles.inputConfig}`}>
            <label>{name}</label>
            {!select && (
                <input className={`${styles.input} ${styles['input_' + length]}`} type={type} placeholder={placeholder} value={value} onChange={onChange} style={style}></input>
            )}
            {select == 'sexo' && (
                <select className={`${styles.input} ${styles['input_' + length]}`} value={value} onChange={onChange} style={style}>
                    <option value={'male'} >Masculino</option>
                    <option value={'female'} >Feminino</option>
                    <option value={'other'}>Outro</option>
                </select>
            )}
            {select == 'horario' && (
                <select className={`${styles.input} ${styles['input_' + length]}`} value={value} onChange={onChange} style={style}>
                    <option value={0}>Manhã</option>
                    <option value={1}>Tarde</option>
                    <option value={2}>Noite</option>
                </select>
            )}
            {select == 'modalidade' && (
                <select className={`${styles.input} ${styles['input_' + length]}`} value={value} onChange={onChange} style={style}>
                    <option value={0}>Musculação</option>
                    <option value={1}>Crossfit</option>
                    <option value={2}>Luta</option>
                    <option value={3}>Dança</option>
                    <option value={4}>Pilates</option>
                    <option value={5}>Outros</option>
                </select>
            )}


        </div>
    )
}