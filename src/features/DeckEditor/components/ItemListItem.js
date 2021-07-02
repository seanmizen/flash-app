import { useState } from "react";

function ItemListItem({
  id,
  allowEdit,
  onDeleted,
  prompt,
  answer,
  editItemCallback,
}) {
  const [editActive, setEditActive] = useState(false);
  const [newPrompt, setNewPrompt] = useState(prompt);
  const [newAnswer, setNewAnswer] = useState(prompt);
  //   const [newPrompt, setNewPrompt] = useState();
  //   const [newAnswer, setNewAnswer] = useState();
  //   useEffect(() => {
  //     setNewPrompt(prompt);
  //     setNewAnswer(answer);
  //   });

  function toggleEditMode() {
    setEditActive(!editActive);
  }

  /*function activateEditMode() {
    console.log("Activate");
    if (allowEdit) {
      setEditActive(true);
    }
  }
  function deActivateEditMode() {
    if (allowEdit) {
      setEditActive(false);
    }
  }*/

  const submitForm = (e) => {
    e.preventDefault();
    editItemCallback({ id: id, prompt: newPrompt, answer: newAnswer });
    setEditActive(false);
  };
  const cancelSubmit = (e) => {
    e.preventDefault();
    setEditActive(false);
  };

  return (
    <li onDoubleClick={toggleEditMode} key={id}>
      {editActive ? (
        <form onSubmit={submitForm} onReset={cancelSubmit}>
          <input
            className="item-prompt"
            value={newPrompt}
            onChange={(e) => setNewPrompt(e.target.value)}
          />
          <input
            className="item-answer"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <button type="submit">Submit</button>
          <button type="reset">Cancel</button>
        </form>
      ) : (
        <>
          <div className="item-prompt">
            <span>
              <b>{prompt}</b>
            </span>
          </div>
          <div className="item-answer">
            <span>{answer}</span>
          </div>
          {allowEdit && <button onClick={() => onDeleted(id)}>X</button>}
        </>
      )}
    </li>
  );
}

export default ItemListItem;
