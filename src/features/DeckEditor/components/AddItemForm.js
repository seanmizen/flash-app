import { useState, useRef } from "react";
import styles from "../DeckEditor.module.css";

function AddItemForm({ onAdd }) {
  // {} instead of props just allows us to not do props. everywhere
  // <> </> allows us to render consecutive components as siblings (and lets us fragment this component)

  const [prompt, setPrompt] = useState(""); //pass in our default val
  const [answer, setAnswer] = useState("");
  const inputRef = useRef(); //default thingy
  const formRef = useRef();
  const submitRef = useRef();

  const submitForm = (e) => {
    e.preventDefault();
    onAdd({ prompt, answer });
    setPrompt("");
    setAnswer("");
    console.log(inputRef.current);
    inputRef.current.focus();
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
      <input
        type="text"
        required={true}
        placeholder="Type your prompt here"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        ref={inputRef}
      />
      <textarea
        type="text"
        required={false}
        placeholder="Type the answer to the prompt here"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={(e) => keyDown(e)}
      />
      <button type="submit" ref={submitRef}>
        Add
      </button>
    </form>
  );
}

export default AddItemForm;
