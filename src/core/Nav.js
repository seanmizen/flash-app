import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./Nav.module.css";

class Nav extends Component {
  render() {
    return (
      <nav className="nav-holder">
        <div className="nav">
          <ul className={styles["nav-list"]}>
            <li className={styles["nav-list-item"]}>
              <Link to="/deck-editor">Deck Builder</Link>
            </li>
            <li className={styles["nav-list-spacer"]} />
            <li className={styles["nav-list-item"]}>
              <Link to="/challenge">Challenge</Link>
            </li>
            {/*}
            <li className={styles["nav-list-spacer"]} />
            <li className={styles["nav-list-item"]}>
              <Link to="/Swatch">Swatch</Link>
            </li>
            */}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;
