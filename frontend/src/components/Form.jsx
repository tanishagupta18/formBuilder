
import styles from './Form.module.css';
import { RiDeleteBin6Line } from "react-icons/ri";
const Form = ({form,onClick}) => {
  // const handleDeleteClick = (e) => {
  //   e.stopPropagation(); 
  //   onClick(); 
  // };
  return (
    <div className={styles.button}>
        {form.name}
        <span className={styles.delete_btn} onClick={onClick}><RiDeleteBin6Line /></span>
    </div>

  );
};

export default Form;
