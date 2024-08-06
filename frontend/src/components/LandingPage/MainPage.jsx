import Builder from "./Builder";
import BuilderSecond from "./BuilderSecond";
import Feature from "./Feature";
import Footer from "./Footer";
import styles from "./MainPage.module.css";
import MoreFeature from "./MoreFeature";
import Products from "./Products";
import Results from "./Results";
import builderScreenshotSrc from "/images/builder-screenshot.png";
const Logo = ({ className }) => (
  <img src="/images/favicon.png" className={className} alt="Logo" />
);

const MainPage = () => {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        {/* Header section */}
        <div className={styles.header_container}>
          <header className={styles.header}>
            <div className={styles.logoContainer}>
              <a className={styles.logo}>
                <img src="/images/favicon.png" alt="Logo" />
                <p className={styles.heading}>Formbot</p>
              </a>
            </div>
            <nav className={styles.nav}>
              <a href="/login" className={styles.signin}>
                Sign in
              </a>
              <a
                href="/register"
                className={styles.register}
              >
                Create a FormBot
              </a>
            </nav>
          </header>
        </div>
        {/* End Here */}
        <div className={styles.hero}>
          <div className={styles.hero_main}>
            <div className={styles.hero_inner}>
              <h1 className={styles.hero_heading}>
                Build advanced chatbots visually
              </h1>
              <p className={styles.hero_para}>
                FormBot gives you powerful blocks to create unique chat
                experiences. Embed them anywhere on your web/mobile apps and
                start collecting results like magic.
              </p>
              <div className={styles.hero_btn_div}>
                <a
                  className={styles.hero_btn}
                  href="/register"
                >
                  Create a formbot for free
                </a>
              </div>
            </div>
            <div className={styles.hero_img}>
              {/* <figure className={styles.hero_figure}> */}
              <img
                alt="Builder screenshot"
                loading="lazy"
                width="3454"
                height="1976"
                decoding="async"
                data-nimg="1"
                src={builderScreenshotSrc}
              />
              {/* </figure> */}
            </div>
          </div>
        </div>
        <div className={styles.team_container}>
          <div className={styles.team}>
            <h2 className={styles.team_heading}>
              Loved by teams and creators from all around the world
            </h2>
            <div className={styles.team_list}>
              <img className={styles.img} src="/icons/iban.svg" />
              <img className={styles.img} src="/icons/team2.svg" />
              <img className={styles.img} src="/icons/team3.svg" />
              <img className={styles.img} src="/icons/team4.svg" />
              <img className={styles.img} src="/icons/team5.svg" />
              <img className={styles.img} src="/icons/team6.svg" />
              <img className={styles.img} src="/icons/team7.svg" />
              <img className={styles.img} src="/icons/team8.svg" />
            </div>
          </div>
        </div>
      </section>
      <Feature />
      <Builder />
      <BuilderSecond />
      <Products />
      <Results />
      <MoreFeature />
      <Footer />
    </div>
  );
};
export default MainPage;
