import { useState, useRef } from "react";

function LoadDeckFromFile({ onDeckLoad }) {
  const loadFileRef = useRef();
  const labelRef = useRef();
  const [selectedFile, setSelectedFile] = useState("");

  const validateDeckAndPassUp = (deck) => {
    if (deck.deckName === "" || deck.list.length === 0) {
      console.log("Deck import failed");
      return;
    }
    console.log('Importing deck "' + deck.deckName + '"');
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
      <button onClick={loadFromFile}>Load a deck</button>
      <input
        hidden
        id="fileUpload"
        type="file"
        accept=".json"
        onChange={fileChangeHandler}
        ref={loadFileRef}
      />
      <label ref={labelRef}>{selectedFile.name}</label>
    </>
  );
}

export default LoadDeckFromFile;
