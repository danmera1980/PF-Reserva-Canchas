import React from "react";
// import { Link } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Popular from "../Popular/Popular.jsx";
import homeImage from '../../assets/img/homeImage.jpg';
import "./Home.scss";

function Home() {
  return (
    <div className="home">
      <Header />
      <div>
        <div>
          <img src={homeImage} alt="home here" className="homeImage"></img>
        </div>
        <SearchBar />
      </div>
      <Popular />
      <Footer />
    </div>
  );
}

export default Home;
