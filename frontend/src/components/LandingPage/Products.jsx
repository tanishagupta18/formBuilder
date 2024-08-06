import styles from "./Products.module.css";
import { FaArrowRight } from "react-icons/fa";
const Products = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.listcontainer}>
          <div className={styles.left}></div>
          <div className={styles.right}></div>
          <div className={styles.listTop}>
            <Box icon="gmail.svg" />
            <Box icon="mailchimp.svg" />
            <Box icon="n.svg" />
            <Box icon="w.svg" />
            <Box icon="wordpress.svg" />
            <Box icon="calendar.svg" />
            <Box icon="product1.svg" />
            <Box icon="drive.svg" />
          </div>
          <div className={styles.listBottom}>
            <Box icon="slack.svg" />
            <Box icon="shopify.svg" />
            <Box icon="product2.svg" />
            <Box icon="excel.svg" />
            <Box icon="zapier.svg" />
            <Box icon="product3.svg" />
            <Box icon="salesforce.svg" />
          </div>
        </div>
        <div className={styles.platform}>
          <h2
            className={styles.platformHeading}
          >
            Integrate with any platform
          </h2>
          <p
           className={styles.platformPara}
          >
            Typebot offers several native integrations blocks as well as
            instructions on how to embed typebot on particular platforms
          </p>
        </div>
      </div>
    </section>
  );
};
const Box = ({ icon }) => {
  return (
    <div className={styles.box}>
      <img src={`/icons/${icon}`} className={styles.img} />
    </div>
  );
};
export default Products;
