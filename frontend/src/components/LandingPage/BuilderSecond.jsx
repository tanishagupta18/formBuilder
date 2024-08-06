import styles from "./BuilderSecond.module.css";
import { FaArrowRight } from "react-icons/fa";
const BuilderSecond = () => {
  return (
    <section className={styles.builder_section}>
      <img src="icons/builderSecond.svg" alt="builder" className={styles.back_img} />
      <div className={styles.container}>
       
        <div className={styles.instruction}>
          <h1 className={styles.heading}>Embed it in a click</h1>
          <p className={styles.para}>
          Embedding your Formbot in your applications is a walk in the park. Formbot gives you several step-by-step platform-specific instructions. Your formbot will always feel "native".
          </p>
          {/* <div className={styles.btndiv}>
            <a className={styles.btn} href="/register">
              Try it now
              <span className={styles.arrow}>
                <FaArrowRight />
              </span>
            </a>
          </div> */}
        </div>
        <div className={styles.img}>
          <img src="images/native-feeling.png" alt="builder" />
        </div>
      </div>
    </section>
  );
};
export default BuilderSecond;
