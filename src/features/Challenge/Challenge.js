import { useState } from "react";
import LoadDeckFromFile from "../DeckEditor/components/LoadDeckFromFile";
import Arena from "./components/Arena";
import styles from "./Challenge.module.css";

function Challenge() {

    const [deckName, setDeckName] = useState("");
    const [list, setList] = useState([]);
    const [deckKey, setDeckKey] = useState(Math.random());

    //TODO how to log "Challenge Rendering"?

    const loadDeck = (deck) => {
        setDeckName(deck.deckName);
        setList(deck.list);
        setDeckKey(Math.random());  //forces Arena to fully reset when loading a new deck
    }

    return (
        <div
            className={styles['challenge']}
        >
            <div className={styles['challenge-arena']}>
                <Arena
                    deck={{
                        deckName: deckName,
                        list: list
                    }}
                    key={deckKey}
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
