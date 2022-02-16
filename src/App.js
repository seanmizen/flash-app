import React from "react";
import Nav from "./core/Nav";
import { ThemeProvider, ThemeContext } from "./Theme";
import { DeckEditor, Challenge, Swatch } from "./features";
import { ThemeToggle } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";

function App() {
  const { mode, toggleMode } = React.useContext(ThemeContext);
  return (
    <ThemeProvider>
      <Router basename={process.env.REACT_APP_BASENAME}>
        <Nav />
        <ThemeToggle mode={mode} toggleMode={toggleMode} />
        <div className="container">
          <Switch>
            <Route path="/deck-editor">
              {/* /:id - route parameter. useParams() hook will pull this. */}
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
    </ThemeProvider>
  );
}

export default App;
