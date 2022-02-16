import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../../../components";

function LoadDeckFromFile({ onDeckLoad }) {
  const loadFileRef = useRef();
  const [selectedFile, setSelectedFile] = useState({});

  const duplicateIdsExist = (list) => {
    list = list.sort();
    let duplicatesExist = false;
    let i = 0;
    for (i = 0; i < list.length - 1; i++) {
      if (list[i] === list[i + 1]) {
        duplicatesExist = true;
        break;
      }
    }
    return duplicatesExist;
  };

  const validateDeckAndPassUp = (deck) => {
    if (deck.deckName === "" || deck.list.length === 0) {
      return;
    }
    //if any IDs are duplicated, generate a completely new set of IDs (Older versions of code had bad ID generation)
    if (duplicateIdsExist(deck.list.map((item) => item.id))) {
      let i = 0;
      let newID = "0";
      for (i = 0; i < deck.list.length; i++) {
        newID = "0";
        const getID = (item) => item.id;
        while (newID === 0 || deck.list.map(getID).includes(newID)) {
          newID = uuidv4();
        }
        deck.list[i].id = newID;
      }
    }

    onDeckLoad(deck);
  };

  const fileChangeHandler = (e) => {
    if (!(e.target.files[0] instanceof Blob)) {
      console.log("Invalid file imported - Deck import aborted");
      return;
    }
    setSelectedFile(e.target.files[0]);
    //if file valid, pass back to DeckEditor
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      validateDeckAndPassUp(JSON.parse(e.target.result));
    };
    e.target.value = null; //reset input file value (this is so we can load the same file twice - otherwise an onChange event won't fire )
  };

  const loadFromFile = () => {
    loadFileRef.current.click();
  };

  return (
    <>
      <Button onClick={loadFromFile}>
        {(selectedFile.name && selectedFile.name) || "Load a deck from file"}
      </Button>
      <input
        hidden
        id="fileUpload"
        type="file"
        accept=".json"
        onChange={fileChangeHandler}
        ref={loadFileRef}
      />
    </>
  );
}

export default LoadDeckFromFile;
