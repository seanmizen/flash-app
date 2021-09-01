import { useState } from "react";
import ItemList from "./components/ItemList";
import AddItemForm from "./components/AddItemForm";
import SaveDeckToFile from "./components/SaveDeckToFile";
import LoadDeckFromFile from "./components/LoadDeckFromFile";
import DeckName from "./components/DeckName";
import styles from "./DeckEditor.module.css";
import { v4 as uuidv4 } from "uuid";

//Adapted from Tiff In Tech's React tutorial (Todo List)

function DeckEditor() {
  const [deckName, setDeckName] = useState("");
  const [list, setList] = useState([]);

  function loadDeck(deck) {
    setDeckName(deck.deckName);
    setList(deck.list);
  }

  function addItem({ prompt = "", answer = "" }) {
    //create item, assign unique ID
    let newID = "0";

    while (
      newID === 0 ||
      list.filter((item) => item.id === newID).length !== 0 //todo - this is generating ESLint errors
    ) {
      newID = uuidv4();
    }

    const newItem = {
      id: newID,
      prompt,
      answer,
    };

    console.log("adding item with ID of " + newID + " to list");

    setList([...list, newItem]);
    //setLocalStorageState();
  }

  function setItem(item) {
    var newList = list;
    var index;
    for (index in newList) {
      if (newList[index].id === item.id) {
        break;
      }
    }
    //let index = list.findIndex((listItem) => listItem.id == id);

    newList[index].prompt = item.prompt;
    newList[index].answer = item.answer;
    setList(newList);
  }

  function deleteItem(id) {
    setList(list.filter((item) => item.id !== id));
    console.log("New list: \n" + list.map((item) => item.prompt));
    //setLocalStorageState();
  }

  return (
    <div>
      <div className={styles["deck-editor"]}>
        <h2>Deck Editor</h2>
        <div className="deck-editor-deck-name">
          <DeckName deckName={deckName} setDeckName={(e) => setDeckName(e)} />
        </div>

        <div className="deck-editor-edit-area">
          <h3>Add an item:</h3>
          <AddItemForm onAdd={(e) => addItem(e)} />
        </div>

        <div className="deck-editor-item-list">
          <h3>Current Deck:</h3>
          <ItemList
            list={list}
            onDeleted={(id) => deleteItem(id)}
            allowEdit={true}
            editItemCallback={setItem}
          />
        </div>

        <div className="deck-editor-save-area">
          <SaveDeckToFile
            deck={{
              deckName: deckName,
              list: list,
            }}
          />
          <LoadDeckFromFile onDeckLoad={(e) => loadDeck(e)} />
        </div>
      </div>
    </div>
  );
}

export default DeckEditor;
