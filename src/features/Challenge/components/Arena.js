import { useState, useRef, useEffect } from "react";
import ArenaAnswer from "./ArenaAnswer";
import ArenaPrompt from "./ArenaPrompt";

function Arena({ deck, loadDeckCallback }) {
    // shuffledList is separate to deck
    // The parent component will store the original deck.
    // The arena will shuffle, log, etc.
    const [shuffledList, setShuffledList] = useState([]);
    const [currentItem, setCurrentItem] = useState(0);
    const [revealAnswer, setRevealAnswer] = useState(false);

    // magic goes here
    // This line sets the setShuffledList on first instance
    // Every time (parent) deck changes, the change will be copied across
    // TODO look at a tutorial for useEf
    useEffect(() => { setShuffledList(deck.list || []) }, [setShuffledList, deck]);

    console.log(shuffledList);

    function toggleRevealAnswer() { // Expand this as necessary
        setRevealAnswer(!revealAnswer);
    }

    /* https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    function shuffleDeck() {
        setShuffledList(shuffleArray([...shuffledList]));
        console.log(shuffledList);
    }

    // {statement ? ifTrue : ifFalse}
    // can also be written as
    // {statement && ifTrue} (disregarding ifFalse)

    return (
        <div>
            <ArenaPrompt
                prompt="Example Prompt"
                onClickCallback={toggleRevealAnswer}
            />
            {revealAnswer && <ArenaAnswer answer="Example Answer" />}

            <br />

            <button
                onClick={shuffleDeck}
            >
                Shuffle Deck
            </button>

            <ul>
                {shuffledList.map(item => {
                    return (
                        <li key={item.id}>
                            <div className="item-prompt"><b>{item.prompt}</b></div>
                            <div className="item-answer">{item.answer}</div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Arena;

/*
            <ArenaPrompt prompt={deck.list(currentItem).prompt} />
            <ArenaAnswer answer={deck.list(currentItem).answer} />
*/