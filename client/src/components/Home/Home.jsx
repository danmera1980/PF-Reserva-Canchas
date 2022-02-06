import {React, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Popular from "../Popular/Popular.jsx";
import homeImage from '../../assets/img/homeImage.jpg';
import "./Home.scss";
import { getEstablishmentByUser } from "../../redux/actions/forms.js";

function Home() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.login.userId)

  useEffect(()=>{
      dispatch(getEstablishmentByUser(userId))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[userId])

  return (
    <div className="home">
      <Header />
      <div>
        <div>
          <img src={homeImage} alt="home here" className="homeImage"></img>
        </div>
        <div className='search'>
          <SearchBar />
        </div>
      </div>
      <Popular />
      <Footer />
    </div>
  );
}

export default Home;
