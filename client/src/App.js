import './App.css';
import '../src/styles/index.scss';
import { Route } from 'react-router-dom';
import React from 'react';
import Home from './components/Home/Home';
import CourtCreate from './components/CourtCreate/CourtCreate';
import Results from './components/Results/Results';
import PostEstablishment from './components/PostEstablishment/PostEstablishment';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import SiteCreate from "./components/SiteCreate/SiteCreate";

function App() {

  return (
    <React.Fragment>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/court" component={CourtCreate} />
        <Route exact path="/results" component={Results} />
        <Route exact path="/establishment" component={PostEstablishment} />
        <Route exact path="/site" component={SiteCreate} />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={Register} />
      </div>
    </React.Fragment>
  );
}

export default App;
