import { useState } from "react";
import ItemList from "../DeckEditor/components/ItemList";
import Arena from "../Challenge/components/Arena";
import SaveDeckToFile from "../DeckEditor/components/SaveDeckToFile";
import LoadDeckFromFile from "../DeckEditor/components/LoadDeckFromFile";
import AddItemForm from "../DeckEditor/components/AddItemForm";
import { Button } from "../../components";
import styles from "./Swatch.module.css";

const Swatch = () => {
  const [deckName, setDeckName] = useState(
    localStorage.getItem("deckName") || []
  );
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("list")) || []
  );
  const [deckKey, setDeckKey] = useState(Math.random());
  const ghostItemList = [
    { prompt: "Spooky ghost item", answer: "From an empty deck" },
    { prompt: "ANOTHER spooky ghost item", answer: "From the same deck" },
  ];
  const itemList = [
    { prompt: "Item List Item", answer: "!!!" },
    { prompt: ":)", answer: ":O" },
  ];

  function loadDeck(deck) {
    setDeckName(deck.deckName);
    setList(deck.list);
    localStorage.removeItem("deckName");
    localStorage.removeItem("list");
    localStorage.setItem("deckName", deck.deckName);
    localStorage.setItem("list", JSON.stringify(deck.list));
  }

  const clearLocalStorage = () => {
    setDeckName("");
    setList([]);
    localStorage.clear();
    return 0;
  };

  return (
    <div className={styles["main"]}>
      <div className={styles["section"]}>
        <ItemList
          ghost={true}
          list={ghostItemList}
          onDeleted={() => {}}
          allowEdit={false}
          editItemCallback={() => {}}
        />
        <div className={styles["spacer"]} />
        <ItemList
          ghost={false}
          list={list.length > 0 ? list : itemList}
          onDeleted={() => {}}
          allowEdit={false}
          editItemCallback={() => {}}
        />
        <div className={styles["spacer"]} />
        <div className={styles["title-button-holder"]}>
          <LoadDeckFromFile onDeckLoad={(e) => loadDeck(e)} />
          <button onClick={clearLocalStorage}>Clear this deck</button>
          <SaveDeckToFile
            deck={{
              deckName: deckName,
              list: list,
            }}
          />
        </div>
        <div className={styles["spacer"]} />
        <AddItemForm onAdd={() => {}} />
      </div>
      <div className={styles["section"]}>
        <Arena
          deck={{
            deckName: deckName,
            list: list,
          }}
          key={deckKey}
        />
      </div>
    </div>
  );
};

/*
-Item list
  -text item
  -image item

-Ghost item list
<ItemList
                ghost={true}
                list={ghostItemList}
                onDeleted={(id) => deleteItem(id)}
                allowEdit={false}
                editItemCallback={setItem}
              />

-Challenge arena


*/

export default Swatch;
