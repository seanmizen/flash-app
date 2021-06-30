import styles from "../Challenge.module.css";

function ArenaAnswer({ answer }) {

    return (
        <div
            className={styles['arena-answer']}
        >
            {answer}
        </div>
    )
}

export default ArenaAnswer;
