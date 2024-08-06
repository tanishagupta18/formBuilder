import React from 'react';
import styles from './FormBuilder.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarGroup}>
        <h3>Bubbles</h3>
        <button className={styles.sidebarButton}>Text</button>
        <button className={styles.sidebarButton}>Image</button>
        <button className={styles.sidebarButton}>Video</button>
        <button className={styles.sidebarButton}>GIF</button>
      </div>
      <div className={styles.sidebarGroup}>
        <h3>Inputs</h3>
        <button className={styles.sidebarButton}>Text</button>
        <button className={styles.sidebarButton}>Number</button>
        <button className={styles.sidebarButton}>Email</button>
        <button className={styles.sidebarButton}>Phone</button>
        <button className={styles.sidebarButton}>Date</button>
        <button className={styles.sidebarButton}>Rating</button>
        <button className={styles.sidebarButton}>Buttons</button>
      </div>
    </div>
  );
};

export default Sidebar;
