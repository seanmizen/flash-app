import styles from "../Challenge.module.css";

function ArenaPrompt({ prompt, image = "" }) {
  return (
    <div
      className={
        styles["arena-prompt-box"] +
        " " +
        styles["item-dark"] +
        " " +
        (image ? styles["arena-prompt-box-image"] : "")
      }
    >
      {image ? <img alt="Prompt Preview" src={image} /> : <></>}

      <div
        className={
          styles["arena-prompt"] +
          (image ? " " + styles["arena-prompt-image-caption"] : "")
        }
      >
        {prompt}
      </div>
    </div>
  );
}

export default ArenaPrompt;
