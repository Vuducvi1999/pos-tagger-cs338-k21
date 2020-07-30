import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import History from "./components/History";
import About from "./components/About";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/history" component={History} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
