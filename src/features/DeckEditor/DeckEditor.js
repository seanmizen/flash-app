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
    const getID = (item) => item.id;
    while (newID === 0 || list.map(getID).includes(newID)) {
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
    const newList = [...list];
    const index = list.findIndex((listItem) => listItem.id === item.id);

    //this next bit is cool -
    //destructure your newlist[item] and your item and then re-merge them.
    //because "item" is later than "newList[item]"", it's values will take priority.
    newList[index] = {
      ...newList[index],
      ...item,
    };
    setList(newList);
  }

  function deleteItem(id) {
    setList(list.filter((item) => item.id !== id));
    console.log("New list: \n" + list.map((item) => item.prompt));
    //setLocalStorageState();
  }

  return (
    <div className={styles["deck-editor"]}>
      <h2>Deck Editor</h2>
      <div className={styles["title-button-holder"]}>
        <div className={styles["title-item"]}>
          <h3>Deck name:</h3>
          <DeckName deckName={deckName} setDeckName={(e) => setDeckName(e)} />
        </div>
        <div className={styles["title-item"]}>
          <LoadDeckFromFile onDeckLoad={(e) => loadDeck(e)} />
        </div>
      </div>
      <div className="deck-editor-edit-area">
        <h3>Add an item:</h3>
        <AddItemForm onAdd={(e) => addItem(e)} />
      </div>

      {(list.length > 0 && (
        <div className="deck-editor-item-list">
          <div className={styles["title-button-holder"]}>
            <div className={styles["title-item"]}>
              <h3>Current Deck:</h3>
            </div>
            <div className={styles["title-item"]}>
              <SaveDeckToFile
                deck={{
                  deckName: deckName,
                  list: list,
                }}
              />
            </div>
          </div>
          <ItemList
            list={list}
            onDeleted={(id) => deleteItem(id)}
            allowEdit={true}
            editItemCallback={setItem}
          />
        </div>
      )) || (
        <div className="deck-editor-item-list">
          <h3>[Deck will appear here when loaded]</h3>
        </div>
      )}
    </div>
  );
}

export default DeckEditor;
