import styles from "../Challenge.module.css";

function ArenaAnswer({ answer }) {
  return (
    <div className={styles["arena-answer-box"] + " " + styles["item-light"]}>
      <div className={styles["arena-answer"]}>{answer}</div>
    </div>
  );
}

export default ArenaAnswer;
