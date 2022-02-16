import { useState, useRef } from "react";
import { Button } from "../../../components";

function SaveDeckToFile({ deck }) {
  const failedToSaveRef = useRef();
  const [saveErrorMessage, setSaveErrorMessage] = useState();

  const saveToFile = () => {
    //Open a file save prompt
    //If location selected, save the file

    if (saveErrorMessage == null) {
      setSaveErrorMessage("");
    }

    if (deck.deckName === "") {
      setSaveErrorMessage("Deck name blank.");
      return;
    }

    if (deck.list.length === 0) {
      setSaveErrorMessage("No items in deck.");
      return;
    }

    setSaveErrorMessage("");

    var json = JSON.stringify(deck);
    var blob = new Blob([json], { type: "application/json" });
    var url = URL.createObjectURL(blob);

    var a = document.createElement("a"); //orphaned element - does not exist in the dom
    a.download = deck.deckName + ".json";
    a.href = url;
    //a.textContent = "Download backup.json";
    a.click();
  };

  return (
    <>
      <Button onClick={saveToFile}>Save this deck</Button>
      <label ref={failedToSaveRef}>{saveErrorMessage}</label>
    </>
  );
}

export default SaveDeckToFile;
