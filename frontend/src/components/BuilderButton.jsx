import styles from './BuilderButton.module.css'


const BuilderButton = ({bubble,iconClass,onClick}) => {
    return (
        <div className={styles.buttoncontainer} onClick={onClick}>
            <div className={styles.box}>
                <bubble.icon className={iconClass} />
                <p className={styles.para}>{bubble.name}</p>
            </div>
        </div>
    )
}

export default BuilderButton