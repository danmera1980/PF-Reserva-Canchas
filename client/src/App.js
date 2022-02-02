import "./App.css";
import "../src/styles/index.scss";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home";
import React from "react";
import CourtCreate from "./components/CourtCreate/CourtCreate";
import PostEstablishment from "./components/PostEstablishment/PostEstablishment";
import SiteCreate from "./components/SiteCreate/SiteCreate";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/court" component={CourtCreate} />
        <Route exact path="/establishment" component={PostEstablishment} />
        <Route exact path="/site" component={SiteCreate} />
      </div>
    </React.Fragment>
  );
}

export default App;
