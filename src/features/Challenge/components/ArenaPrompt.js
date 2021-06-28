
function ArenaPrompt({ prompt, onClickCallback }) {

    return (
        <span
            onClick={onClickCallback}
        >
            {prompt}
        </span>
    )
}

export default ArenaPrompt;
