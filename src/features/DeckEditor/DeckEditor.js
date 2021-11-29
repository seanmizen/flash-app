import { useEffect, useState } from "react";
import ItemList from "./components/ItemList";
import AddItemForm from "./components/AddItemForm";
import SaveDeckToFile from "./components/SaveDeckToFile";
import LoadDeckFromFile from "./components/LoadDeckFromFile";
import styles from "./DeckEditor.module.css";
import { Button } from "../../components";
import { v4 as uuidv4 } from "uuid";

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

    setList([...list, newItem]);
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

  const clearLocalStorage = () => {
    setDeckName("");
    setList([]);
    localStorage.clear();
    return 0;
  };

  function deleteItem(id) {
    setList(list.filter((item) => item.id !== id));
    //setLocalStorageState();
  }

  useEffect(() => {
    localStorage.setItem("deckName(", deckName);
    localStorage.setItem("list", JSON.stringify(list));
    console.log("DE deckName: " + localStorage.getItem("deckName"));
  }, [list, deckName]);

  return (
    <>
      <div className={styles["page-title-container"]}>
        <h2>Deck Builder</h2>
      </div>
      <div className={styles["deck-editor"]}>
        <div className={styles["section"]}>
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

          <div className={styles["spacer"]} />

          <div className={styles["deck-editor-edit-area"]}>
            <h3>
              {list.length === 0
                ? "Start building a deck by adding an item:"
                : "Add an item:"}
            </h3>
            <AddItemForm onAdd={(e) => addItem(e)} />
          </div>

          <div className={styles["spacer"]} />
        </div>
        <div className={styles["section"]}>
          {list.length > 0 ? (
            <div className="deck-editor-item-list">
              <div className={styles["title-button-holder"]}>
                <LoadDeckFromFile onDeckLoad={(e) => loadDeck(e)} />
                <Button onClick={clearLocalStorage}>Clear this deck</Button>
                <SaveDeckToFile
                  deck={{
                    deckName: deckName,
                    list: list,
                  }}
                />
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
              <div className={styles["title-button-holder"]}>
                <LoadDeckFromFile onDeckLoad={(e) => loadDeck(e)} />
              </div>
              <div className={styles["spacer"]} />
              <ItemList
                ghost={true}
                list={ghostItemList}
                onDeleted={() => {}}
                allowEdit={false}
                editItemCallback={() => {}}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DeckEditor;
