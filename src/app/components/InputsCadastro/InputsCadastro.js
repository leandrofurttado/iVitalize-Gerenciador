import styles from './InputsCadastro.module.css'



export default function InputsCadastro({ name, length, placeholder, type, select, value, onChange, style, step, maxLength, max, min, disabled, editAluno }) {
    return (
        <div className={`${styles.inputConfig}`}>
            <label>{name}</label>
            {!select && (
                <input className={`${styles.input} ${styles['input_' + length]}`} type={type} placeholder={placeholder} value={value} disabled={disabled} onChange={onChange} style={style} step={step} maxLength={maxLength} max={max} min={min}></input>
            )}
            {select == 'sexo' && (
                <select className={`${styles.input} ${styles['input_' + length]}`} value={value} onChange={onChange} style={style} disabled={disabled}>
                    <option value={null} >Selecione</option>
                    <option value={'male'} >Masculino</option>
                    <option value={'female'} >Feminino</option>
                    <option value={'other'}>Outro</option>
                </select>
            )}
            {select === 'horario' && (
                <select className={`${styles.input} ${styles['input_' + length]}`} value={value} onChange={onChange} style={style} disabled={disabled}>
                    <option value={null} >Selecione</option>
                    <option value={0}>Manhã</option>
                    <option value={1}>Tarde</option>
                    <option value={2}>Noite</option>
                </select>
            )}
            {select === 'modalidade' && (
                <select className={`${styles.input} ${styles['input_' + length]}`} value={value} onChange={onChange} style={style} disabled={disabled}>
                    <option value={null} >Selecione</option>
                    <option value={0}>Musculação</option>
                    <option value={1}>Crossfit</option>
                    <option value={2}>Luta</option>
                    <option value={3}>Dança</option>
                    <option value={4}>Pilates</option>
                    <option value={5}>Outros</option>
                </select>
            )}
                        {select === 'cref' && (
                <select className={`${styles.input} ${styles['input_' + length]}`} value={value} onChange={onChange} style={style} disabled={disabled} >
                    <option value={null} >Selecione</option>
                    <option value={true}>Sim</option>
                    <option value={false}>Não</option>
                    
                </select>
            )}
        </div>
    )
}