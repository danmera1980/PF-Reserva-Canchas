import React from "react";
import { useEffect } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Popular from "../Popular/Popular.jsx";
import homeImage from '../../assets/img/homeImage.jpg';
import "./Home.scss";
import CardCourt from "../CardCourt.js/CardCourt.jsx";
import { allEstablishments } from "../../redux/actions/establishment.js";

function Home() {
  const dispatch = useDispatch()
  const cards = useSelector(state => state.establishment.establishments)
  console.log(cards)
  useEffect(()=>{
    dispatch(allEstablishments())
  },[dispatch])

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
