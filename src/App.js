import React from "react";
import Nav from "./core/Nav";
import DeckEditor from "./features/DeckEditor";
import Challenge from "./features/Challenge";
import Swatch from "./features/Swatch";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import './App.css';

function App() {
  return (
    <Router basename="/flash-app">
      <Nav />
      <div className="container">
        <Switch>
          <Route path="/DeckEditor">
            <DeckEditor />
          </Route>
          <Route path="/Challenge">
            <Challenge />
          </Route>
          <Route path="/Swatch">
            <Swatch />
          </Route>
          {/*}
          <Route path="/">
            <DeckEditor />
          </Route>
          */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
