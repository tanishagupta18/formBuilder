import styles from "./Feature.module.css";

const Feature = () => {
  return (
    <section className={styles.feature_section}>
      <div className={styles.feature_container}>
        <div className={styles.description}>
          <h2 className={styles.feature_heading}>
            Replace your old school forms with chatbots
          </h2>
          <p className={styles.para}>
            Formbot is a better way to ask for information. It leads to an
            increase in customer satisfaction and retention and multiply by 3
            your conversion rate compared to classical forms.
          </p>
        </div>
        <div className={styles.feature_image}>
          <div className={styles.form1}>
            <img
              src="/icons/cross.svg"
              className={styles.icon}
              alt="Not used"
            />
            <img src="images/oldform.png" alt='Form' />
          </div>
          <div className={styles.form1}>
            <img
              src="/icons/correct.svg"
              className={styles.icon}
              alt="Not used"
            />
            <img src="images/Background.png" alt='Form' />
            <div className={styles.try}>
              <p className={styles.tryHeading}>Try it out!</p>
              <img src="icons/tryarrow.svg" alt="try" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Feature;
