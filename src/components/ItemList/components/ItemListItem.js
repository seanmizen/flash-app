import { useState, useRef, useEffect } from "react";
import styles from "../ItemList.module.css";

function ItemListItem({
  id,
  allowEdit,
  onDeleted,
  prompt,
  answer,
  image,
  answerImage,
  editItemCallback,
}) {
  const [editActive, setEditActive] = useState(false);
  const [innerPrompt, setInnerPrompt] = useState(prompt);
  const [innerAnswer, setInnerAnswer] = useState(answer);
  const submitRef = useRef();
  const cancelRef = useRef();
  const editPromptRef = useRef();
  const editAnswerRef = useRef();
  const liRef = useRef();

  useEffect(() => {
    if (editActive) {
      editPromptRef.current.focus();
    }
  }, [editActive, prompt, answer]);

  const keyDown = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      submitRef.current.click();
    }
    if (e.keyCode === 27) {
      cancelRef.current.click();
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    editItemCallback({ id: id, prompt: innerPrompt, answer: innerAnswer });
    setEditActive(false);
  };
  const cancelSubmit = (e) => {
    e.preventDefault();
    setEditActive(false);
    setInnerPrompt(prompt);
    setInnerAnswer(answer);
  };

  //handle doubleclicks
  useEffect(() => {
    const handleDoubleClick = (e) => {
      if (e.composedPath().includes(liRef.current) && allowEdit) {
        //clicked inside li
        setEditActive(true);
      } else {
        //clicked outside of li
        if (editActive) {
          //simulate cancel click
          cancelSubmit(e);
        }
      }
    };

    window.addEventListener("dblclick", handleDoubleClick);

    //stop the app from generating a bajillion eventListeners:
    return () => {
      window.removeEventListener("dblclick", handleDoubleClick);
    };
  });

  return (
    <li
      ref={liRef}
      className={styles["no-bullets"] + " " + styles["itemlist-item"]}
    >
      {editActive ? (
        <form onSubmit={submitForm} onReset={cancelSubmit} onKeyDown={keyDown}>
          <div className={styles["itemlist-item-edit-inner"]}>
            {image ? (
              <div className={styles["limited-image-container"]}>
                <img alt="Prompt Preview" src={image} />
              </div>
            ) : (
              <></>
            )}
            <input
              className={styles["item-prompt-edit"]}
              value={innerPrompt}
              required={true}
              onChange={(e) => setInnerPrompt(e.target.value)}
              ref={editPromptRef}
            />
            <textarea
              className={styles["item-answer-edit"]}
              value={innerAnswer}
              onChange={(e) => setInnerAnswer(e.target.value)}
              ref={editAnswerRef}
            />
          </div>
          <div className={styles["itemlist-item-edit-buttons"]}>
            <button type="submit" ref={submitRef}>
              Save
            </button>
            <button type="reset" ref={cancelRef}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className={styles["itemlist-item-inner"]}>
            <div className={styles["item-prompt"]}>
              {image ? (
                <div className={styles["limited-image-container"]}>
                  <img alt="Prompt Preview" src={image} />
                </div>
              ) : (
                <></>
              )}
              <div>
                <b>{innerPrompt}</b>
              </div>
            </div>
            <div className={styles["item-answer"]}>
              {answerImage ? (
                <div className={styles["limited-image-container"]}>
                  <img alt="Answer Preview" src={answerImage} />
                </div>
              ) : (
                <></>
              )}

              <span>{innerAnswer || "\xa0"}</span>
            </div>
          </div>
          {allowEdit && (
            <div
              className={styles["itemlist-item-delete-button"]}
              onClick={() => {
                onDeleted(id);
              }}
            >
              X
            </div>
          )}
        </>
      )}
    </li>
  );
}

export default ItemListItem;
