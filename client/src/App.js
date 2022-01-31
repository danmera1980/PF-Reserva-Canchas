import "./App.css";
import "../src/styles/index.scss";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <Route exact path="/" component={Home} />
      </div>
    </React.Fragment>
  );
}

export default App;
