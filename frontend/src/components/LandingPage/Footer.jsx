import React from 'react';
import styles from "./Footer.module.css";
import { BsBoxArrowUpRight } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerOuter}>
          <div className={styles.outerFirst}>
            <p className={styles.para}>
              Made with ❤️ by <br />
              @cuvette
            </p>
          </div>
          <Menu 
            items={[
              { name: 'Status', showIcon: true },
              { name: 'Documentation', showIcon: true },
              { name: 'Roadmap', showIcon: true },
              { name: 'Pricing', showIcon: false },
            ]}
          />
          <Menu 
            items={[
              { name: 'Discord', showIcon: true },
              { name: 'GitHub repository', showIcon: true },
              { name: 'Community', showIcon: true },
              { name: 'Twitter', showIcon: true },
              { name: 'LinkedIn', showIcon: true },
              { name: 'OSS Friends', showIcon: false },
            ]}
          />
          <Menu 
            items={[
              { name: 'About', showIcon: false },
              { name: 'Contact', showIcon: false },
              { name: 'Terms of Service', showIcon: false },
              { name: 'Privacy Policy', showIcon: false },
            ]}
          />
        </div>
      </div>
    </footer>
  );
};

const Menu = ({ items = [] }) => {
  return (
    <div className={styles.outerFirst}>
      {items.map((item, index) => (
        <SubMenu item={item} key={index} />
      ))}
    </div>
  );
};

const SubMenu = ({ item }) => {
  return (
    <a target="_blank" rel="noopener noreferrer" href="/" style={{color:'inherit'}}>
      <span className={styles.submenu}>
        <span>{item.name}</span>
        {item.showIcon && <BsBoxArrowUpRight />}
      </span>
    </a>
  );
};

export default Footer;
