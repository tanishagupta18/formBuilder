import styles from "./Builder.module.css";
import { FaArrowRight } from "react-icons/fa";
const Builder = () => {
  return (
    <section className={styles.builder_section}>
      <img src="icons/builder.svg" alt="builder" className={styles.back_img} />
      <div className={styles.container}>
        <div className={styles.img}>
          <img src="images/builder-dnd.png" alt="builder" />
        </div>
        <div className={styles.instruction}>
          <h1 className={styles.heading}>Easy building experience</h1>
          <p className={styles.para}>
            All you have to do is drag and drop blocks to create your app. Even
            if you have custom needs, you can always add custom code.
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
      </div>
    </section>
  );
};
export default Builder;
