import styles from "./FormTheme.module.css";
import { useForm } from "../Contexts/FormContext";
import ThemeSidebar from "../components/ThemeSidebar";

const MainContent = () => {
  const { currentFormData } = useForm();
  
  return (
    <div className={`${styles.mainContent} ${currentFormData.theme}`}>
      <div className={styles.chatContainer}>
        <div className={styles.messageContainer}>
          <div className={styles.message}>
            <div className={styles.avatar}>
              <img src="/icons/bot.png" alt="Bot" />
            </div>
            <div className={styles.messageBubble}>
              <div>Hello</div>
            </div>
          </div>
        </div>
        <div className={styles.responseContainer}>
          <button className={styles.responseButton}>
            Hi
            <span className={styles.notificationDot}></span>
          </button>
        </div>
      </div>
    </div>
  );
};

const FormTheme = () => {
  return (
    <div className={styles.body}>
      <ThemeSidebar />
      <MainContent />
    </div>
  );
};

export default FormTheme;
