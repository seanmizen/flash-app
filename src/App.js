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
    //    <Router basename="/apps/flash-app">
    // https://stackoverflow.com/questions/50250223/react-router-app-deployed-on-different-locations-subdirectories
    // This below doesn't provide the functionality I'm looking for - it requires the user to start at the base URL for it to work.
    // so for example I can't navigate directly to /apps/flash-app/swatch - I need to follow the router links for that to work.
    // if there are no router links, that page is now inaccessible!
    // TODO try environment variables
    <Router basename={process.env.BASENAME}>
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
