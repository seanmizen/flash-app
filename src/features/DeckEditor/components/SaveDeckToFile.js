
function SaveDeckToFile({ deck }) {

    const saveToFile = () => {
        //Open a file save prompt
        //If location selected, save the file

        //TODO check for deck name, deck items

        var json = JSON.stringify(deck);
        var blob = new Blob([json], { type: "application/json" });
        var url = URL.createObjectURL(blob);

        console.log(url);

        var a = document.createElement('a');    //orphaned element - does not exist in the dom
        a.download = "saved deck.json";
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
