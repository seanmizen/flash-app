import React, { Component } from "react";
import Nav from "./Nav";
import DeckEditor from "./DeckEditor";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <Nav />
                <h1>Main App screen</h1>
            </div>
        );
    }
};

export default App;
