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
      onClick={console.log(image)}
    >
      {image.trim() ? <img alt="Prompt Preview" src={image} /> : <></>}

      <div
        className={
          styles["arena-prompt"] +
          (image.trim() ? " " + styles["arena-prompt-image-caption"] : "")
        }
      >
        {prompt}
      </div>
    </div>
  );
}

export default ArenaPrompt;
