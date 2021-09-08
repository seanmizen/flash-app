import styles from "../Challenge.module.css";

function ArenaPrompt({ prompt, image = "" }) {
  return (
    <div
      className={
        styles["arena-prompt-box"] +
        " " +
        styles["item-dark"] +
        " " +
        (image.trim() ? styles["arena-prompt-box-image"] : "")
      }
    >
      {/*image.trim() ? <img alt="Prompt Preview" src={image} /> : <></>*/}
      {image.trim() ? (
        <div
          className={styles["test"]}
          style={{ backgroundImage: `url(${image})` }} //magical `template string`
        />
      ) : null}

      {prompt.trim() ? (
        <div
          className={
            styles["arena-prompt"] +
            (image.trim() ? " " + styles["arena-prompt-image-caption"] : "")
          }
        >
          {prompt}
        </div>
      ) : null}
    </div>
  );
}

export default ArenaPrompt;
