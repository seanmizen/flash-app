import { useState } from "react";
import LoadDeckFromFile from "../DeckEditor/components/LoadDeckFromFile";
import Arena from "./components/Arena";

function Challenge() {

    const [deckName, setDeckName] = useState("");
    const [list, setList] = useState([]);

    //TODO how to log "Challenge Rendering"?

    function loadDeck(deck) {
        setDeckName(deck.deckName);
        setList(deck.list);
    }

    return (
        <div>
            <div className="deck-challenge-arena">
                <Arena
                    deck={{
                        deckName: deckName,
                        list: list
                    }}
                    loadDeckCallback={(e) => loadDeck(e)}
                />
            </div>
            {list.length === 0 ? null :
                <div className="deck-challenge-information-area">
                    <span>
                        Deck name: {deckName}
                    </span>
                    <br />
                    <span>
                        Deck Length: {list.length}
                    </span>
                </div>
            }
            <div className="deck-challenge-load-area">
                <LoadDeckFromFile
                    onDeckLoad={e => loadDeck(e)}
                />
            </div>
        </div>
    );
};

export default Challenge;
