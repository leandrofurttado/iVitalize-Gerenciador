import styles from './LoadingCadastro.module.css'

export default function LoadingCadastro() {

  return <div className={styles.loading_wrapper}>
    <div className={styles.loading_circle}></div>
  </div>
}