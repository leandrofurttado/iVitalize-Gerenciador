import styles from './loading.module.css'

export default function Loading() {

  return <div className={styles.loading_wrapper}>
    <div className={styles.loading_circle}></div>
  </div>
}