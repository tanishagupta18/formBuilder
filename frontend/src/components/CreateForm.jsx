
import styles from './CreateForm.module.css';
import { LuPlus } from "react-icons/lu";

const CreateForm = ({onClick}) => {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      <div className={styles.stack}>
        <span className={styles.icon}><LuPlus /></span> {/* Replace SVG with `+` icon */}
        <p className={styles.text}>Create a typebot</p>
      </div>
    </button>
  );
};

export default CreateForm;
