import styles from "../Challenge.module.css";

function ArenaPrompt({ prompt, onClickCallback }) {

    return (
        <div
            className={styles['arena-prompt']}
            onClick={onClickCallback}
        >
            {prompt}
        </div>
    )
}

export default ArenaPrompt;
