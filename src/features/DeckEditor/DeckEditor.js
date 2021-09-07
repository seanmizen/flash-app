import { useEffect, useState } from "react";
import { ItemList } from "../../components/";
import AddItemForm from "./components/AddItemForm";
import SaveDeckToFile from "./components/SaveDeckToFile";
import LoadDeckFromFile from "./components/LoadDeckFromFile";
import styles from "./DeckEditor.module.css";
import { v4 as uuidv4 } from "uuid";

/*
localStorage.setItem('myData', data);
localStorage.getItem('myData');
localStorage.removeItem('myData');
localStorage.clear();
*/

//Adapted from Tiff In Tech's React tutorial (Todo List)

function DeckEditor() {
  const [deckName, setDeckName] = useState(
    localStorage.getItem("deckName") || []
  );
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("list")) || []
  );
  const ghostItemList = [
    { prompt: "Spooky ghost item", answer: "From an empty deck" },
    { prompt: "ANOTHER spooky ghost item", answer: "From the same deck" },
  ];

  function loadDeck(deck) {
    setDeckName(deck.deckName);
    setList(deck.list);
    localStorage.removeItem("deckName");
    localStorage.removeItem("list");
    localStorage.setItem("deckName", deck.deckName);
    localStorage.setItem("list", JSON.stringify(deck.list));
  }

  function addItem({ prompt = "", answer = "", image = "" }) {
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
      image,
    };

    console.log("Adding item:");
    console.log(newItem);

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

  useEffect(() => {
    localStorage.removeItem("deckName");
    localStorage.removeItem("list");
    localStorage.setItem("deckName(", deckName);
    localStorage.setItem("list", JSON.stringify(list));
    console.log(localStorage.getItem("deckName"));
  }, [list]);

  return (
    <div className={styles["deck-editor"]}>
      <h2>Deck Editor</h2>

      <div className={styles["spacer"]} />

      <div className={styles["title-button-holder"]}>
        <div className={styles["title-item"]}>
          <h3>Deck name:</h3>
          <input
            type="text"
            required={true}
            placeholder="Deck Name"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
          />
        </div>
        <div className={styles["title-item"]}>
          <LoadDeckFromFile onDeckLoad={(e) => loadDeck(e)} />
        </div>
      </div>

      <div className={styles["spacer"]} />

      <div className="deck-editor-edit-area">
        <h3>
          {list.length === 0
            ? "Start building a deck by adding an item:"
            : "Add an item:"}
        </h3>
        <AddItemForm onAdd={(e) => addItem(e)} />
      </div>

      <div className={styles["spacer"]} />

      {list.length > 0 ? (
        <div className="deck-editor-item-list">
          <div className={styles["title-button-holder"]}>
            <div className={styles["title-item"]}>
              <h3>Current Deck: ({list.length} cards)</h3>
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
          <div className={styles["spacer"]} />
          <ItemList
            ghost={false}
            list={list}
            onDeleted={(id) => deleteItem(id)}
            allowEdit={true}
            editItemCallback={setItem}
          />
        </div>
      ) : (
        <div className="deck-editor-item-list">
          <h3>Deck will appear here when loaded:</h3>
          <div className={styles["spacer"]} />
          <ItemList
            ghost={true}
            list={ghostItemList}
            onDeleted={(id) => deleteItem(id)}
            allowEdit={false}
            editItemCallback={setItem}
          />
        </div>
      )}
    </div>
  );
}

export default DeckEditor;
