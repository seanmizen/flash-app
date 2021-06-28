import { useState, useRef } from "react";

function LoadDeckFromFile({ onDeckLoad }) {

    const loadFileRef = useRef();
    const labelRef = useRef();
    const [selectedFile, setSelectedFile] = useState("");

    const validateDeckAndPassUp = (deck) => {
        if (deck.deckName === "" || deck.list.length === 0) {
            return
        }
        onDeckLoad(deck);
    }

    const changeHandler = (e) => {
        setSelectedFile(e.target.files[0]);
        //if file valid, pass back to DeckEditor
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            console.log("e.target.result", e.target.result);
            validateDeckAndPassUp(JSON.parse(e.target.result));
        };
    }

    const loadFromFile = () => {
        loadFileRef.current.click();
    }

    return (
        <>
            <button
                onClick={loadFromFile}
            >
                Load a deck
            </button>
            <input
                hidden
                id="fileUpload"
                type="file"
                accept=".json"
                onChange={changeHandler}
                ref={loadFileRef}
            />
            <label
                ref={labelRef}>
                {selectedFile.name}
            </label>
        </>
    )

}

export default LoadDeckFromFile;
