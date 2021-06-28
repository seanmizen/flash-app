import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
            <nav className="nav">
                <h3>Pages</h3>

                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/DeckEditor">Deck Editor</Link>
                    </li>
                    <li>
                        <Link to="/About">About</Link>
                    </li>
                </ul>

            </nav>
        );
    }
};

export default Nav;
