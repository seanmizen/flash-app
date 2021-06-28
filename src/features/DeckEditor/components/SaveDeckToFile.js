
function SaveDeckToFile({ deck }) {

    const saveToFile = () => {
        //Open a file save prompt
        //If location selected, save the file

        //TODO check for deck name, deck items

        console.log(deck.deckName);
        console.log(deck.list.length);

        if (deck.deckName === "") {
            console.log("Deck name blank. Cancelling export.");
            return;
        }

        if (deck.list.length === 0) {
            console.log("No items in deck. Cancelling export.");
            return;
        }

        var json = JSON.stringify(deck);
        var blob = new Blob([json], { type: "application/json" });
        var url = URL.createObjectURL(blob);

        console.log(url);

        var a = document.createElement('a');    //orphaned element - does not exist in the dom
        a.download = deck.deckName + ".json";
        a.href = url;
        //a.textContent = "Download backup.json";
        a.click();
    }

    return (
        <button
            onClick={saveToFile}
        >
            Save this deck
        </button>
    )
}

export default SaveDeckToFile;
