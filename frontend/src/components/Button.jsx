import styles from "./Button.module.css";

const Button = ({ size = "medium", variation = "primary", children, ...props }) => {
  // Dynamically set the class names based on props
  const classNames = `${styles.button} ${styles[size]} ${styles[variation]}`;

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
};

export default Button;
