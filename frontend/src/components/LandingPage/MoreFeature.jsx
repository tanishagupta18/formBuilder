import styles from "./MoreFeature.module.css";

const features = [
  {
    icon: "/icons/f1.png",
    heading: "Hidden fields",
    description:
      "Include data in your form URL to segment your user and use its data directly in your form.",
  },
  {
    icon: "/icons/f2.png",
    heading: "Team collaboration",
    description: "Invite your teammates to work on your typebots with you.",
  },
  {
    icon: "/icons/f3.png",
    heading: "Link to sub typebots",
    description: "Reuse your typebots in different parent bots.",
  },
  {
    icon: "/icons/f4.png",
    heading: "Custom code",
    description: "Customize everything with your own Javascript & CSS code.",
  },
  {
    icon: "/icons/f5.png",
    heading: "Custom domain",
    description: "Connect your typebot to the custom URL of your choice.",
  },
  {
    icon: "/icons/f6.png",
    heading: "Folder management",
    description:
      "Organize your typebots in specific folders to keep it clean and work with multiple clients.",
  },
];

const MoreFeature = () => {
  return (
    <section className={styles.feature_section}>
      <div className={styles.feature_container}>
        <div className={styles.description}>
          <h2 className={styles.feature_heading}>And many more features</h2>
          <p className={styles.para}>
            Typebot makes form building easy and comes with powerful features
          </p>
        </div>
        <FeatureBox />
        <Team />
      </div>
      
    </section>
  );
};

const FeatureBox = () => {
  return (
    <div className={styles.featureBox}>
      {features.map((feature, index) => (
        <Feature key={index} feature={feature} />
      ))}
    </div>
  );
};

const Feature = ({ feature }) => {
  return (
    <div className={styles.feature1}>
      <div className={styles.image}>
        <img src={feature.icon} alt={feature.heading} />
      </div>
      <p className={styles.fheading}>{feature.heading}</p>
      <p className={styles.fpara}>{feature.description}</p>
    </div>
  );
};

const Team = () => {
  return(
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
  )
}

export default MoreFeature;
