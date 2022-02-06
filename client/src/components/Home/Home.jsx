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
      <div className="flex flex-col">
        <div className="mt-7 relative">
          <h1 className="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] text-2xl md:text-4xl lg:text-8xl text-white">Reserva tu turno!</h1>
          <img src={homeImage} alt="home here" className="homeImage h-72 w-[90%] md:w-[690px] md:h-[400px] xl:w-[1200px] xl:h-[460px]" />
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
