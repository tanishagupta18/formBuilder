
import styles from "./ThemeSidebar.module.css";
import { useForm } from "../Contexts/FormContext";


const ThemeSidebar = () => {
    const {setCurrentFormData, currentFormData} = useForm();
    const handleClick = (type) => {
      setCurrentFormData(prevData => ({
        ...prevData,
        theme: type
      }));
    };
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarGroup}>
      <h2 className={styles.heading}>Customize the theme</h2>
          <div className={styles.container}>
            <div className={styles.img} onClick={() =>handleClick('light')}>
            <img className={`${
              currentFormData.theme == "light" ? styles.active : ""
            }`} src="/icons/light.png" />
            </div>
            <div className={styles.img} onClick={() =>handleClick('dark')}>
            <img className={` ${
              currentFormData.theme == "dark" ? styles.active : ""
            }`} src="/icons/dark.png" />
            </div>
            <div className={styles.img} onClick={() =>handleClick('tat_blue')}>
            <img className={`${
              currentFormData.theme == "tat_blue" ? styles.active : ""
            }`} src="/icons/blue.png" />
            </div>
          </div> 
      </div>
    </div>
  );
};

export default ThemeSidebar;
