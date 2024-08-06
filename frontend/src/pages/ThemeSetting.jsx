import React from 'react';
import styles from './FormBuilder.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <input type="text" placeholder="Enter Form Name" className={styles.formNameInput} />
      <div className={styles.headerButtons}>
        <button className={styles.headerButton}>Flow</button>
        <button className={styles.headerButton}>Theme</button>
        <button className={styles.headerButton}>Response</button>
      </div>
      <div className={styles.actionButtons}>
        <button className={styles.shareButton}>Share</button>
        <button className={styles.saveButton}>Save</button>
      </div>
    </div>
  );
};
const Sidebar = () => {
    return (
      <div className={styles.sidebar}>
        <h3>Customize the theme</h3>
        <div className={styles.themeOption}>
          <div className={`${styles.themePreview} ${styles.light}`}></div>
          <span>Light</span>
        </div>
        <div className={styles.themeOption}>
          <div className={`${styles.themePreview} ${styles.dark}`}></div>
          <span>Dark</span>
        </div>
        <div className={styles.themeOption}>
          <div className={`${styles.themePreview} ${styles.blue}`}></div>
          <span>Tail Blue</span>
        </div>
      </div>
    );
  };
  const MainContent = () => {
    return (
      <div className={styles.mainContent}>
        <div className={styles.message}>
          <img src="user-avatar.png" alt="User" className={styles.avatar} />
          <span className={styles.messageText}>Hello</span>
        </div>
        <div className={`${styles.message} ${styles.response}`}>
          <span className={styles.messageText}>Hi</span>
        </div>
      </div>
    );
  };

const ThemeSetting = () => {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.body}>
          <Sidebar />
          <MainContent />
        </div>
      </div>
    );
  };
  
  export default ThemeSetting;

