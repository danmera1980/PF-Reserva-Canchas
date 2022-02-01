import "./App.css";
import "../src/styles/index.scss";
import { Route } from "react-router-dom";
import React from "react";
import Home from "./components/Home/Home";
import CourtCreate from "./components/CourtCreate/CourtCreate";
import Results from "./components/Results/Results"

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/court" component={CourtCreate} />
        <Route exact path="/results" component={Results} />
      </div>
    </React.Fragment>
  );
}

export default App;
