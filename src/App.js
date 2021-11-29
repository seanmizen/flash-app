import React from "react";
import Nav from "./core/Nav";
import DeckEditor from "./features/DeckEditor";
import Challenge from "./features/Challenge";
import Swatch from "./features/Swatch";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import './App.css';
//test commit

function App() {
  return (
    <Router basename="/apps/flash-app">
      <Nav />
      <div className="container">
        <Switch>
          <Route path="/deck-editor">
            <DeckEditor />
          </Route>
          <Route path="/challenge">
            <Challenge />
          </Route>
          <Route path="/swatch">
            <Swatch />
          </Route>
          <Route path="/">
            <DeckEditor />
          </Route>
          <Route path="/*">
            <DeckEditor />
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
