import styles from "./Button.module.css";

const Button = ({ children, className, innerRef, ...others }) => {
  return (
    <button
      type="button"
      className={styles["button-one"] + " " + className}
      ref={innerRef}
      {...others}
    >
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
