import { useState } from "react";
import ItemList from "./components/ItemList";
import AddItemForm from "./components/AddItemForm";
import SaveDeckToFile from "./components/SaveDeckToFile";
import LoadDeckFromFile from "./components/LoadDeckFromFile";
import DeckName from "./components/DeckName";
import styles from "./DeckEditor.module.css";

//Adapted from Tiff In Tech's React tutorial (Todo List)

function DeckEditor() {

  const [deckName, setDeckName] = useState("");
  const [list, setList] = useState([]);

  //TODO how to log "DeckEditor rendering"?

  function loadDeck(deck) {
    setDeckName(deck.deckName);
    setList(deck.list);
  }

  /*function setLocalStorageState() {
    localStorage.setItem("storageList", this.state.list)
  }*/

  function addItem({ prompt = "", answer = "" }) {
    //create item, assign unique ID

    const newItem = {
      id: 1 + Math.random(),
      prompt,
      answer
    }

    setList([...list, newItem]);
    //setLocalStorageState();
  }

  function deleteItem(id) {
    setList(list.filter(item => item.id !== id));
    //setLocalStorageState();
  }

  return (
    <div>
      <div className={styles['deck-editor']}>
        <h2>Deck Editor</h2>
        <div className="deck-editor-deck-name">
          <DeckName
            deckName={deckName}
            setDeckName={(e) => setDeckName(e)}
          />
        </div>

        <div className="deck-editor-edit-area">
          <h3>Add an item:</h3>
          <AddItemForm
            onAdd={e => addItem(e)}
          />
        </div>

        <div className="deck-editor-item-list">
          <h3>Current Deck:</h3>
          <ItemList
            list={list}
            onDeleted={id => deleteItem(id)}
            allowEdit={true}
          />
        </div>

        <div className="deck-editor-save-area">
          <SaveDeckToFile
            deck={{
              deckName: deckName,
              list: list
            }}
          />
          <LoadDeckFromFile
            onDeckLoad={e => loadDeck(e)}
          />
        </div>

      </div>
    </div >
  );
};

export default DeckEditor;
