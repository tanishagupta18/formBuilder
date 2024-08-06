import styles from './Trial.module.css';

const Trial = () => {
    return (
        <section className={styles.trial}>
            <div className={styles.leftImage}><img src="icons/hero.svg" alt="Heeo" /></div>
            <div className={styles.rightImage}><img src="icons/righthero.svg" alt="Heeo" /></div>
            <div className={styles.container}>
                <h2 className={styles.heading}>Improve conversion and user engagement with FormBots
                </h2>
                <div className={styles.btn}><a className={styles.link} href="/register">Create a FormBot</a></div>
                <p className={styles.para}>No trial. Generous <strong>free</strong> plan.</p>
            </div>
        </section>
    );
}
export default Trial;