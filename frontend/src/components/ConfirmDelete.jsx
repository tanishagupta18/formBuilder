import Button from "./Button";
import styles from './ConfirmDelete.module.css'

function ConfirmDelete({ onConfirm, disabled, onCloseModal }) {
  return (
    <div className={styles.modal}>
    <h2 className={styles.title}>Are you sure you want to 
    delete this folder ?</h2>
    
    <div className={styles.actions}>
      <button className={styles.buttonDone} onClick={onConfirm}>
        Confirm
      </button>
      <span style={{color: '#47474A',fontSize: '27px'}}>|</span>
      <button className={styles.buttonCancel} onClick={onCloseModal}>
        Cancel
      </button>
    </div>
  </div>
  );
}

export default ConfirmDelete;
