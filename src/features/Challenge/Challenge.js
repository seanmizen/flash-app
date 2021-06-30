import { useState } from "react";
import LoadDeckFromFile from "../DeckEditor/components/LoadDeckFromFile";
import Arena from "./components/Arena";
import styles from "./Challenge.module.css";

function Challenge() {

    const [deckName, setDeckName] = useState("");
    const [list, setList] = useState([]);

    //TODO how to log "Challenge Rendering"?

    const logKey = (e) => {
        console.log(e.KeyCode);
        console.log(e.shiftKey);
    }

    const loadDeck = (deck) => {
        setDeckName(deck.deckName);
        setList(deck.list);
    }

    return (
        <div
            className={styles['challenge']}
            onKeyDown={e => logKey(e)}
        >
            <div className={styles['challenge-arena']}>
                <Arena
                    deck={{
                        deckName: deckName,
                        list: list
                    }}
                    loadDeckCallback={(e) => loadDeck(e)}
                />
            </div>
            {list.length === 0 ? null :
                <div className="challenge-information-area">
                    <span>
                        Deck name: {deckName}
                    </span>
                    <br />
                    <span>
                        Deck Length: {list.length}
                    </span>
                </div>
            }
            <div className="challenge-load-area">
                <LoadDeckFromFile
                    onDeckLoad={e => loadDeck(e)}
                />
            </div>
        </div>
    );
};

export default Challenge;
