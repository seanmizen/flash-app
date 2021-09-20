import styles from "./Button.module.css";

const Button = ({ children, className, ...others }) => {
  return (
    <button className={styles["button-one"] + " " + className} {...others}>
      {children}
    </button>
  );
};

//Simple default button:
/*
const Button = ({ children, ...others }) => {
  return <button {...others}></button>;
};
*/

export default Button;
