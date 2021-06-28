import { useState, useRef } from "react";

function AddItemForm({ onAdd }) {
    // {} instead of props just allows us to not do props. everywhere
    // <> </> allows us to render consecutive components as siblings (and lets us fragment this component)

    const [prompt, setPrompt] = useState(""); //pass in our default val
    const [answer, setAnswer] = useState("");
    const inputRef = useRef();  //default thingy
    const formRef = useRef();  //default thingy

    const submitForm = (e) => {
        e.preventDefault();
        onAdd({ prompt, answer })
        setPrompt("");
        setAnswer("");
        console.log(inputRef.current);
        inputRef.current.focus();
    }

    const submitIfEnter = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            submitForm(e);
        }
    }

    return (
        <form
            onSubmit={submitForm}
            ref={formRef}
        >
            <input
                type="text"
                required={true}
                placeholder="Type your prompt here"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                ref={inputRef}
            />
            <br />
            <textarea
                type="text"
                required={false}
                placeholder="Type the answer to the prompt here"
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                onKeyDown={e => submitIfEnter(e)}
            />
            <button
                type="submit"
            >
                Add
            </button>
        </form>
    )
}

export default AddItemForm;
