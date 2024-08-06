import styles from "./Results.module.css";

const Results = () => {
  return (
    <section className={styles.resultSection}>
      <div className={styles.container}>
        <div className={styles.instruction}>
          <h2 className={styles.heading}>Collect results in real-time</h2>
          <p className={styles.para}>
            One of the main advantage of a chat application is that you collect
            the user's responses on each question.
            <br />
            <strong>You won't lose any valuable data.</strong>
          </p>
          <img
            src="/icons/result.png"
            alt="result"
            style={{
              border: "1px solid #1A202C",
              
            }}
          />
        </div>
      </div>
    </section>
  );
};
export default Results;
