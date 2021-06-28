
function AddItemForm({ onAdd }) {
    // {} instead of props just allows us to not do props. everywhere
    // <> </> allows us to render consecutive components as siblings (and lets us fragment this component)

    const [prompt, setPrompt] = useState(""); //pass in our default val
    const [answer, setAnswer] = useState("");

    return (
        <>
            <input
                type="text"
                tabindex="1"
                placeholder="Type your prompt here"
                value={this.state.newPrompt}
                onChange={e => this.updateInput("newPrompt", e.target.value)}
            />
            <button
                tabindex="3"
                onClick={() => this.addItem()}
            >
                Add
            </button>
            <br />
            <textarea
                type="text"
                tabindex="2"
                placeholder="Type the answer to the prompt here"
                value={this.state.newAnswer}
                onChange={e => this.updateInput("newAnswer", e.target.value)}
            />
        </>
    )
}

export default AddItemForm;
