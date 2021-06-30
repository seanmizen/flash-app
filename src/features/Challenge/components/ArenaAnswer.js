import styles from "../Challenge.module.css";

function ArenaAnswer({ answer }) {

    return (
        <div
            className={styles['arena-answer-box']}
        >
            <div
                className={styles['arena-answer']}
            >{answer}</div>
        </div>
    )
}

export default ArenaAnswer;
