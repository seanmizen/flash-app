import React, { Component } from "react";
import Home from "./Home";
import Nav from "./Nav";
import DeckEditor from "./DeckEditor";
import About from "./About";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <Nav />
                <Switch>
                    <Route path="/DeckEditor">
                        <DeckEditor />
                    </Route>
                    <Route path="/About">
                        <About />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        );
    }
};

export default App;
