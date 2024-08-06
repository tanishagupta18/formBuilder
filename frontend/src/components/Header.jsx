import React, { useState } from "react";
import styles from "./Header.module.css"; // Importing CSS module
import { useAuthenticate } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user,logout} = useAuthenticate();
  const navigate = useNavigate()
 
  // Toggle menu visibility
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.menuContainer}>
      <button
        type="button"
        className={styles.menuButton}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls="menu-list"
        onClick={toggleMenu}
      >
        {`${user?.name}'s workspace`}
        <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className={styles.menuList} role="menu" id="menu-list">
          <button
            type="button"
            className={styles.menuItem}
            role="menuitem"
            onClick={() => navigate('/app/settings')}
          >
            Settings
          </button>
          <button
            type="button"
            className={`${styles.menuItem} ${styles.logout}`}
            role="menuitem"
            onClick={logout}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
