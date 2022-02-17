import "../src/index.css";
import { Route } from "react-router-dom";
import React from "react";
import Home from "./components/Home/Home";
import CourtCreate from "./components/CourtCreate/CourtCreate";
import Results from "./components/Results/Results";
import PostEstablishment from "./components/PostEstablishment/PostEstablishment";
import Register from "./components/Register/Register";
import SiteCreate from "./components/SiteCreate/SiteCreate";
import Profile from "./components/Profile/Profile";
import UserEdit from "./components/UserEdit/UserEdit";
import MercadoPago from "./components/MercadoPago/MercadoPago";
// import CreateOrder from "./components/MercadoPago/CreateOrder";
import EstablishmentProfile from "./components/EstablishmentProfile/EstablishmentProfile";
import AddUserToEstablishment from './components/AddUserToEstablishment/AddUserToEstablishment.jsx';
import BookingCourt from "./components/BookingCourt/BookingCourt";
import Calendario from "./components/Calendar/Calendar";
import Login from "./components/Login/Login";
import AdminProfile from "./components/AdminProfile/AdminProfile";

function App() {
  return (
    <React.Fragment>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/court" component={CourtCreate} />
        <Route exact path="/results" component={Results} />
        <Route exact path="/establishment" component={PostEstablishment} />
        <Route exact path="/site" component={SiteCreate} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/useredit" component={UserEdit} />
        <Route exact path="/establishmentprofile" component={EstablishmentProfile} />
        <Route exact path="/addUserToEstablishment" component={AddUserToEstablishment}/>
        <Route exact path="/establishment/:courtId" component={BookingCourt}/>
        <Route exact path="/payment" component={MercadoPago}/>
        <Route exact path="/calendar" component={Calendario} />
        <Route eaxct path="/admin" component={AdminProfile} />
      </div>
    </React.Fragment>
  );
}

export default App;
