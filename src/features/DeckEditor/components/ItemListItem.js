import { useState, useRef, useReducer } from "react";

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
  //   const [innerPrompt, setInnerPrompt] = useState();
  //   const [innerAnswer, setInnerAnswer] = useState();
  //   useEffect(() => {
  //     setInnerPrompt(prompt);
  //     setInnerAnswer(answer);
  //   });

  function toggleEditMode() {
    setEditActive(!editActive);
  }

  function activateEditMode() {
    console.log("Activate");
    if (allowEdit) {
      setEditActive(true);
    }
  }
  function deActivateEditMode() {
    if (allowEdit) {
      setEditActive(false);
    }
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
    <li key={id}>
      {editActive ? (
        <form onSubmit={submitForm} onReset={cancelSubmit} onKeyDown={keyDown}>
          <input
            className="item-prompt"
            value={innerPrompt}
            required={true}
            onChange={(e) => setInnerPrompt(e.target.value)}
            ref={editPromptRef}
          />
          <input
            className="item-answer"
            value={innerAnswer}
            onChange={(e) => setInnerAnswer(e.target.value)}
          />
          <button type="submit" ref={submitRef}>
            Submit
          </button>
          <button type="reset" ref={cancelRef}>
            Cancel
          </button>
        </form>
      ) : (
        <div onDoubleClick={toggleEditMode}>
          <div className="item-prompt">
            <span>
              <b>{innerPrompt}</b>
            </span>
          </div>
          <div className="item-answer">
            <span>{innerAnswer}</span>
          </div>
          {allowEdit && <button onClick={() => onDeleted(id)}>X</button>}
        </div>
      )}
    </li>
  );
}

export default ItemListItem;
