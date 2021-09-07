import { useState, useRef } from "react";
import styles from "../DeckEditor.module.css";

function AddItemForm({ onAdd }) {
  // {} instead of props just allows us to not do props. everywhere
  // <> </> allows us to render consecutive components as siblings (and lets us fragment this component)

  const [prompt, setPrompt] = useState(""); //pass in our default val
  const [answer, setAnswer] = useState("");
  const inputPromptRef = useRef();
  const formRef = useRef();
  const submitRef = useRef();

  const submitForm = (e) => {
    e.preventDefault();
    onAdd({ prompt, answer });
    setPrompt("");
    setAnswer("");
    inputPromptRef.current.focus();
    e.preventDefault();
  };

  const keyDown = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      submitRef.current.click();
    }
  };

  return (
    <form
      className={styles["add-item-form"]}
      onSubmit={submitForm}
      ref={formRef}
    >
      <div className={styles["itemlist-item-edit-inner"]}>
        <div className={styles["item-form-prompt"]}>
          {/*<div>Add a text prompt:</div>*/}
          <input
            className={styles["prompt-text-input"]}
            type="text"
            required={true}
            placeholder="Type your prompt here"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            ref={inputPromptRef}
          />
          {/*<div>Or an image prompt:</div>*/}
          {/*<input className={styles["prompt-image-input"]} type="file" id="img" name="img" accept="image/*" />*/}
          {/*<div>(you can do both)</div>*/}
        </div>
        <div className={styles["item-form-answer"]}>
          {/*<div>Add the answer for the prompt:</div>*/}
          <textarea
            className={styles["answer-text-input"]}
            type="text"
            required={false}
            placeholder="Type the answer to the prompt here"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => keyDown(e)}
          />
        </div>
      </div>

      <button type="submit" ref={submitRef}>
        Add to deck
      </button>
    </form>
  );
}

export default AddItemForm;
