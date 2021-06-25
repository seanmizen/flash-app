import React, { Component } from "react";
//import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class Nav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="nav">
                <h3>Pages</h3>
                <ul>
                    <li>Home</li>
                    <li>Deck Editor</li>
                </ul>
            </nav>
        );
    }
};

export default Nav;
