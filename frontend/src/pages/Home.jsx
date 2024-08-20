import Builder from "../components/LandingPage/Builder";
import BuilderSecond from "../components/LandingPage/BuilderSecond";
import Feature from "../components/LandingPage/Feature";
import Footer from "../components/LandingPage/Footer";
import MoreFeature from "../components/LandingPage/MoreFeature";
import Products from "../components/LandingPage/Products";
import Results from "../components/LandingPage/Results";
import Trial from "../components/LandingPage/Trial";
import styles from "./Home.module.css";
import builderScreenshotSrc from "/images/builder-screenshot.png";

const Home = () => {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        {/* Header section */}
        <div className={styles.header_container}>
          <header className={styles.header}>
            <div className={styles.logoContainer}>
              <a className={styles.logo}>
                <img src="/images/favicon.png" alt="Logo" />
                <p className={styles.heading}>Typebot</p>
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
                Create a typebot
              </a>
            </nav>
          </header>
        </div>
        {/* End Here */}
        <div className={styles.hero}>
          <div className={styles.leftImage}><img src="icons/hero.svg" alt="Heeo" /></div>
          <div className={styles.rightImage}><img src="icons/righthero.svg" alt="Heeo" /></div>
          <div className={styles.hero_main}> 
            <div className={styles.hero_inner}>
              <h1 className={styles.hero_heading}>
                Build advanced chatbots visually
              </h1>
              <p className={styles.hero_para}>
                Formbot gives you powerful blocks to create unique chat
                experiences. Embed them anywhere on your web/mobile apps and
                start collecting results like magic.
              </p>
              <div className={styles.hero_btn_div}>
                <a
                  className={styles.hero_btn}
                  href="/register"
                >
                  Create a typebot for free
                </a>
              </div>
            </div>
            <div className={styles.hero_img}>
              <div className={styles.mainImageLeft}></div>
              <div className={styles.mainImageRight}></div>
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
      </section>
      <Feature />
      <Builder />
      <BuilderSecond />
      <Products />
      <Results />
      <MoreFeature />
      <Trial />
      <Footer />
    </div>
  );
};
export default Home;
