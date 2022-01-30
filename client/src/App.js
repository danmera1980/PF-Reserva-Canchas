import "./App.css";
import "../src/styles/index.scss";
import { Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <Route exact path="/" component={Landing} />
      </div>
    </React.Fragment>
  );
}

export default App;
