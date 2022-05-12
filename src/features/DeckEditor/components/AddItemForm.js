import { useState, useRef } from "react";
import styles from "../DeckEditor.module.css";
import { Button } from "../../../components";

//https://stackoverflow.com/questions/45576748/how-can-i-detect-rendering-support-for-emoji-in-javascript
function checkSupportsEmoji() {
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.canvas.width = ctx.canvas.height = 1;
  ctx.fillText("😗", -4, 4);
  return ctx.getImageData(0, 0, 1, 1).data[3] > 0; // Not a transparent pixel
}
const supportsEmoji = checkSupportsEmoji();

function AddItemForm({ onAdd }) {
  const [prompt, setPrompt] = useState(""); //pass in our default val
  const [answer, setAnswer] = useState("");
  const [imageObject, setImageObject] = useState(""); //image file object (including name, dimensions, etc)
  const [image, setImage] = useState(""); //base64 encoded image
  const inputPromptRef = useRef();
  const inputPromptImageRef = useRef();
  const [answerImageObject, setAnswerImageObject] = useState(""); //image file object (including name, dimensions, etc)
  const [answerImage, setAnswerImage] = useState(""); //base64 encoded image
  const inputAnswerRef = useRef();
  const inputAnswerImageRef = useRef();
  const formRef = useRef();
  const submitRef = useRef();

  const submitForm = (e) => {
    let newItem = { prompt, answer };
    if (image) {
      newItem = { ...newItem, image };
      if (prompt === "") {
        setPrompt(imageObject.name);
      }
    }
    if (answerImage) {
      newItem = { ...newItem, answerImage };
      if (answer === "") {
        setAnswer(answerImageObject.name);
      }
    }
    e.preventDefault();
    onAdd(newItem);
    setPrompt("");
    setAnswer("");
    setImageObject({});
    setAnswerImageObject({});
    setImage("");
    setAnswerImage("");
    //inputPromptImageRef.current.value = "";
    //inputAnswerImageRef.current.value = "";
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
  const uploadImageAnswerClick = () => {
    inputAnswerImageRef.current.click();
  };

  //https://dev.to/guscarpim/upload-image-base64-react-4p7j
  const promptPhotoUpload = (e) => {
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
  const answerPhotoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    if (reader !== undefined && file !== undefined) {
      reader.onloadend = () => {
        setAnswerImageObject(file);
        setAnswerImage(reader.result);
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
      <div className={styles["item-form-inner"]}>
        <div className={styles["item-form-prompt"]}>
          <div className={styles["item-form-prompt-text"]}>
            <div>Add a text prompt:</div>
            <textarea
              className={styles["prompt-text-input"]}
              type="text"
              required={image === ""}
              placeholder="Type your prompt here"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              ref={inputPromptRef}
            />
          </div>

          {image ? (
            <img
              className={styles["limited-image-container"]}
              alt="Prompt Preview"
              src={image}
            />
          ) : (
            <div className={styles["item-form-image"]}>
              <Button
                className={
                  styles["image-upload-button"] +
                  (supportsEmoji
                    ? " " + styles["image-upload-button-emoji"]
                    : "")
                }
                onClick={uploadImagePromptClick}
              >
                {supportsEmoji ? "📷" : "Upload an image"}
              </Button>
              <input
                hidden
                className={styles["image-input"]}
                type="file"
                id="img"
                name="img"
                accept="image/*"
                ref={inputPromptImageRef}
                onChange={promptPhotoUpload}
              />
            </div>
          )}
        </div>
        <div className={styles["spacer"]} />

        <div className={styles["item-form-answer"]}>
          <div className={styles["item-form-answer-text"]}>
            <div>Add the answer here:</div>
            <textarea
              className={styles["answer-text-input"]}
              type="text"
              required={false}
              placeholder="Type the answer to the prompt here"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => keyDown(e)}
              ref={inputAnswerRef}
            />
          </div>

          {answerImage ? (
            <img
              className={styles["limited-image-container"]}
              alt="Answer Preview"
              src={answerImage}
            />
          ) : (
            <div className={styles["item-form-image"]}>
              <Button
                className={
                  styles["image-upload-button"] +
                  (supportsEmoji
                    ? " " + styles["image-upload-button-emoji"]
                    : "")
                }
                onClick={uploadImageAnswerClick}
              >
                {supportsEmoji ? "📷" : "Upload an image"}
              </Button>
              <input
                hidden
                className={styles["image-input"]}
                type="file"
                id="img"
                name="img"
                accept="image/*"
                ref={inputAnswerImageRef}
                onChange={answerPhotoUpload}
              />
            </div>
          )}
        </div>
        <div className={styles["spacer"]} />
      </div>
      <Button type="submit" innerRef={submitRef}>
        Add to deck
      </Button>
    </form>
  );
}

export default AddItemForm;
