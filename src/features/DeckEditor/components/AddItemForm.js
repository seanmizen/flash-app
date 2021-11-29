import { useState, useRef } from "react";
import styles from "../DeckEditor.module.css";
import { Button } from "../../../components";

function AddItemForm({ onAdd }) {
  // {} instead of props just allows us to not do props. everywhere
  // <> </> allows us to render consecutive components as siblings (and lets us fragment this component)

  const [prompt, setPrompt] = useState(""); //pass in our default val
  const [answer, setAnswer] = useState("");
  const [imageObject, setImageObject] = useState(""); //image file object (including name, dimensions, etc)
  const [image, setImage] = useState(""); //base64 encoded image
  const inputPromptRef = useRef();
  const inputPromptImageRef = useRef();
  const formRef = useRef();
  const submitRef = useRef();

  const submitForm = (e) => {
    let newItem = { prompt, answer };
    if (image) {
      newItem = { ...newItem, image: image };
      if (prompt === "") {
        setPrompt(imageObject.name);
      }
    }
    e.preventDefault();
    onAdd(newItem);
    setPrompt("");
    setAnswer("");
    setImageObject({});
    setImage("");
    inputPromptImageRef.current.value = "";
    inputPromptRef.current.focus();
  };

  const keyDown = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      submitRef.current.click();
    }
  };

  const uploadImagePromptClick = () => {
    inputPromptImageRef.current.click();
  };

  //https://dev.to/guscarpim/upload-image-base64-react-4p7j
  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    if (reader !== undefined && file !== undefined) {
      reader.onloadend = () => {
        setImageObject(file);
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
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
          <div className={styles["item-form-prompt-text"]}>
            <div>Add a text prompt:</div>
            <input
              className={styles["prompt-text-input"]}
              type="text"
              required={image === ""}
              placeholder="Type your prompt here"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              ref={inputPromptRef}
            />
          </div>
          <div className={styles["item-form-prompt-image"]}>
            <Button onClick={uploadImagePromptClick}>📷</Button>
            <input
              hidden
              className={styles["prompt-image-input"]}
              type="file"
              id="img"
              name="img"
              accept="image/*"
              ref={inputPromptImageRef}
              onChange={photoUpload}
            />
          </div>
          {image ? (
            <div className={styles["limited-image-container"]}>
              <img alt="Prompt Preview" src={image} />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={styles["spacer"]} />

        <div className={styles["item-form-answer"]}>
          <div>Add the answer here:</div>
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
        <div className={styles["spacer"]} />
      </div>
      <Button type="submit" ref={submitRef}>
        Add to deck
      </Button>
    </form>
  );
}

export default AddItemForm;
