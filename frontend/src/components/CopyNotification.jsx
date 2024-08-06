import styles from './CopyNotification.module.css'
const CopyNotification = () => {
    return(
        <span className={styles.message}><img src='/icons/check.png'/> Link Copied</span>
    );
}

export default CopyNotification