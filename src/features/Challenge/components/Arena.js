import { useState, useRef, useEffect } from "react";
import ArenaAnswer from "./ArenaAnswer";
import ArenaPrompt from "./ArenaPrompt";
import styles from "../Challenge.module.css";
//import ItemList from "../../DeckEditor/components/ItemList";

function Arena({ deck }) {
  // shuffledList is separate to deck
  // The parent component will store the original deck.
  // The arena will shuffle, log, etc.
  const [shuffledList, setShuffledList] = useState([]);
  const [currentItem, setCurrentItem] = useState(0);
  const [revealAnswer, setRevealAnswer] = useState(false);
  const [revealButtonText, setRevealButtonText] = useState("Reveal answer");
  const revealButton = useRef();
  const nextItemButton = useRef();
  const prevItemButton = useRef();
  const arenaRef = useRef();

  // magic goes here
  // This line sets the setShuffledList on first instance
  // Every time (parent) deck changes, the change will be copied across
  // TODO look at a tutorial for useEffect
  useEffect(() => {
    setShuffledList(deck.list || []);
  }, [setShuffledList, deck]);
  useEffect(() => {
    window.addEventListener("keydown", arenaKeyDown);
    return () => {
      window.removeEventListener("keydown", arenaKeyDown);
    };
  });

  const arenaKeyDown = (e) => {
    //left key -> un-reveal (if necessary) (37)
    //up key -> prev card (38)
    //right key -> reveal (if necessary) (39)
    //down key -> next card (40)

    //prevent key use if arena is focused
    console.log(e.keyCode);
    if (e.composedPath().includes(arenaRef.current)) {
      switch (e.keyCode) {
        case 27:
          //esc
          //lose arena focus
          e.target.blur();
          break;
        case 37:
          //Left arrow
          e.preventDefault();
          manSetRevealAnswer(false);
          break;
        case 38:
          e.preventDefault();
          //Up arrow
          prevItem();
          break;
        case 39:
          //Right arrow
          e.preventDefault();
          manSetRevealAnswer(true);
          break;
        case 40:
          //Down arrow
          e.preventDefault();
          nextItem();
          break;
        default:
          //do nothing
          break;
      }
    }
  };

  function manSetRevealAnswer(bool) {
    //Manually set revealAnswer
    if (shuffledList.length === 0) {
      bool = false;
    }
    bool
      ? setRevealButtonText("Hide answer")
      : setRevealButtonText("Reveal answer");
    setRevealAnswer(bool);
  }

  function toggleRevealAnswer() {
    // Expand this as necessary
    manSetRevealAnswer(!revealAnswer);
  }

  /* https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
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
    console.log("Shuffling deck");
    setShuffledList(shuffleArray([...shuffledList]));
    setCurrentItem(0);
    manSetRevealAnswer(false);
  }

  function nextItem() {
    setCurrentItem(
      (currentItem + 1 + shuffledList.length) % shuffledList.length || 0
    );
    manSetRevealAnswer(false);
  }

  function prevItem() {
    setCurrentItem(
      (currentItem - 1 + shuffledList.length) % shuffledList.length || 0
    );
    manSetRevealAnswer(false);
  }

  // {statement ? ifTrue : ifFalse}
  // can also be written as
  // {statement && ifTrue}
  // or
  // {statement && ifTrue || ifFalse}

  return (
    <div ref={arenaRef} tabIndex={0} className={styles["arena"]}>
      <button onClick={prevItem} ref={prevItemButton}>
        Previous card
      </button>
      <div
        className={styles["arena-item-box"] + " " + styles["rounded-outline"]}
      >
        <div className={styles["arena-item"]} onClick={toggleRevealAnswer}>
          {(shuffledList.length > 0 && (
            <ArenaPrompt
              // '\xa0' / &nbsp; (non-breaking space) stops the div from collapsing when empty.
              prompt={shuffledList[currentItem]?.prompt || "\xa0"}
              image={shuffledList[currentItem]?.image || "\xa0"}
            />
          )) || <ArenaPrompt prompt="Nothing here !??!!!1?" />}
          {revealAnswer && (
            <ArenaAnswer answer={shuffledList[currentItem]?.answer || "\xa0"} />
          )}
        </div>
        <div className={styles["item-counter"]}>
          {shuffledList.length > 0
            ? currentItem + 1 + "/" + shuffledList.length
            : "0/0"}
        </div>
      </div>

      <button onClick={toggleRevealAnswer} ref={revealButton}>
        {revealButtonText}
      </button>

      <button onClick={nextItem} ref={nextItemButton}>
        Next card
      </button>
      <button onClick={shuffleDeck}>Shuffle Deck</button>

      {/* <ItemList list={shuffledList} /> */}
    </div>
  );
}

export default Arena;
