import { useState, useRef, useEffect } from "react";
import styles from "../DeckEditor.module.css";

function ItemListItem({
  id,
  allowEdit,
  onDeleted,
  prompt,
  answer,
  editItemCallback,
}) {
  const [editActive, setEditActive] = useState(false);
  const [innerPrompt, setInnerPrompt] = useState(prompt);
  const [innerAnswer, setInnerAnswer] = useState(answer);
  const submitRef = useRef();
  const cancelRef = useRef();
  const editPromptRef = useRef();
  const editAnswerRef = useRef();

  useEffect(() => {
    if (editActive) {
      editPromptRef.current.focus();
    }

    //console.log("useEffect - ItemListItem");
    console.log("prompt: " + prompt + " - innerPrompt: " + innerPrompt);
  }, [editActive, prompt, answer]);

  function toggleEditMode() {
    setEditActive(!editActive);
  }

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

  return (
    <li
      onDoubleClick={toggleEditMode}
      className={
        styles["rounded-outline"] +
        " " +
        styles["no-bullets"] +
        " " +
        styles["itemlist-item"]
      }
    >
      {editActive ? (
        <form onSubmit={submitForm} onReset={cancelSubmit} onKeyDown={keyDown}>
          <div className={styles["itemlist-item-edit-inner"]}>
            <input
              className={styles["item-prompt"]}
              value={innerPrompt}
              required={true}
              onChange={(e) => setInnerPrompt(e.target.value)}
              ref={editPromptRef}
            />
            <textarea
              className={styles["item-answer"]}
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
              <span>
                <b>{innerPrompt}</b>
              </span>
            </div>
            <div className={styles["item-answer"]}>
              <span>{innerAnswer}</span>
            </div>
          </div>
          <div className={styles["itemlist-item-delete-button"]}>
            {allowEdit && (
              <button
                onClick={() => {
                  console.log("Deleting " + id);
                  onDeleted(id);
                }}
              >
                X
              </button>
            )}
          </div>
        </>
      )}
    </li>
  );
}

export default ItemListItem;
