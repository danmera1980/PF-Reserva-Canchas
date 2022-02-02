import './App.css';
import '../src/styles/index.scss';
import { Route } from 'react-router-dom';
import React from 'react';
import Home from './components/Home/Home';
import { useEffect, useState } from 'react';
import CourtCreate from './components/CourtCreate/CourtCreate';
import Results from './components/Results/Results';
import PostEstablishment from './components/PostEstablishment/PostEstablishment';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import SiteCreate from "./components/SiteCreate/SiteCreate";

function App() {

  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = () => {
      fetch('http://localhost:5000/auth/login/success', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      })
        .then(response => {
          if (response.status === 200) return response.json();
          throw new Error('authentication has been failed!');
        })
        .then(resObject => {
          setUser(resObject.user);
        })
        .catch(err => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  
  return (
    <React.Fragment>
      <div className="App">
        <Navbar user={user} />
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
