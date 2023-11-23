import styles from './loading.module.css'

export default function LoadingLogin() {

  return <div className={styles.loading_wrapper}>
    <div className={styles.loading_circle}></div>
  </div>
}