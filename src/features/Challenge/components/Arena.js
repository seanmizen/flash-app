import { useState, useRef, useEffect } from "react";
import ArenaAnswer from "./ArenaAnswer";
import ArenaPrompt from "./ArenaPrompt";
import ItemList from "../../DeckEditor/components/ItemList";

function Arena({ deck, loadDeckCallback }) {
    // shuffledList is separate to deck
    // The parent component will store the original deck.
    // The arena will shuffle, log, etc.
    const [shuffledList, setShuffledList] = useState([]);
    const [currentItem, setCurrentItem] = useState(0);
    const [revealAnswer, setRevealAnswer] = useState(false);
    const [revealButtonText, setRevealButtonText] = useState("Reveal answer")
    const revealButton = useRef();
    const nextItemButton = useRef();
    const prevItemButton = useRef();

    // magic goes here
    // This line sets the setShuffledList on first instance
    // Every time (parent) deck changes, the change will be copied across
    // TODO look at a tutorial for useEf
    useEffect(() => { setShuffledList(deck.list || []) }, [setShuffledList, deck]);

    function manSetRevealAnswer(bool) {
        bool ? setRevealButtonText("Hide answer") : setRevealButtonText("Reveal answer")
        setRevealAnswer(bool);
    }

    function toggleRevealAnswer() { // Expand this as necessary
        manSetRevealAnswer(!revealAnswer);
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
        setCurrentItem(0)
        manSetRevealAnswer(false);
    }

    function nextItem() {
        setCurrentItem((currentItem + 1 + shuffledList.length) % shuffledList.length)
        manSetRevealAnswer(false);
    }

    function prevItem() {
        console.log(currentItem);
        setCurrentItem((currentItem - 1 + shuffledList.length) % shuffledList.length)
        manSetRevealAnswer(false);
    }

    // {statement ? ifTrue : ifFalse}
    // can also be written as
    // {statement && ifTrue} (disregarding ifFalse)

    return (
        <div>
            <button
                onClick={prevItem}
                ref={prevItemButton}
            >
                Previous card
            </button>

            <br />

            <div>
                <ArenaPrompt
                    prompt={shuffledList[currentItem]?.prompt}
                    onClickCallback={toggleRevealAnswer}
                />
                {revealAnswer && <ArenaAnswer answer={shuffledList[currentItem]?.answer} />}
            </div>

            <br />

            <button
                onClick={toggleRevealAnswer}
                ref={revealButton}
            >
                {revealButtonText}
            </button>

            <br />

            <button
                onClick={nextItem}
                ref={nextItemButton}
            >
                Next card
            </button>

            <br />

            <button
                onClick={shuffleDeck}
            >
                Shuffle Deck
            </button>

            <ItemList
                list={shuffledList}
            />

        </div>
    )
}

export default Arena;

/*
            <ArenaPrompt prompt={deck.list(currentItem).prompt} />
            <ArenaAnswer answer={deck.list(currentItem).answer} />
*/