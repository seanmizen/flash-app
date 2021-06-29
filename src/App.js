import React from "react";
import Home from "./features/Home";
import Nav from "./core/Nav";
import DeckEditor from "./features/DeckEditor";
import About from "./features/About";
import Challenge from "./features/Challenge";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import './App.css';

function App() {
    return (
        <Router>
            <Nav />
            <div className="container">
                <Switch>
                    <Route path="/DeckEditor">
                        <DeckEditor />
                    </Route>
                    <Route path="/Challenge">
                        <Challenge />
                    </Route>
                    <Route path="/About">
                        <About />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
