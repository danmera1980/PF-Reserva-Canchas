import { React, useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';
import { useDispatch } from "react-redux";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Popular from "../Popular/Popular.jsx";
import homeImage from "../../assets/img/homeImage.jpg";
import { getAllActiveEstablishments } from "../../redux/actions/establishment.js";
import "./Home.scss";
import Swal from "sweetalert2";

function Home() {
  const {search} = useLocation()
  if(search.includes('status=approved')){
    Swal.fire({
      title: `Se acredito su pago`,
    });
  }else if(search.includes('status=rejected')|| search){
    Swal.fire({
      title: `Su pago no se acredito, el turno no sera reservado`,
    });

  }
  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState({
    latitude: -32.88641481914277,
    longitude: -68.84519635165792,
    zoom: 10,
    sport: "",
  });

  useEffect(() => {
    dispatch(getAllActiveEstablishments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 10,
        sport: "",
      });
    });
  }, []);

  const getViewPort = (viewport) => {
    // console.log(viewport)
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col">
        <div className="mt-7">
          <div className="relative">
            <h1 className="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] text-2xl md:text-4xl lg:text-8xl text-white">
              Reserva tu turno!
            </h1>
            <img
              src={homeImage}
              alt="home here"
              className="homeImage h-72 w-[90%] md:w-[690px] md:h-[400px] xl:w-[1200px] xl:h-[460px]"
            />
          </div>
          <div className="search">
            <SearchBar getViewPort={getViewPort} />
          </div>
          <h2 className="text-2xl font-semibold text-lightSecondary dark:text-darkAccent text-center">
            Canchas populares
          </h2>
          <div className="overflow-x-auto md:h-[19rem] mb-16 md:mb-0">
            <Popular currentLocation={currentLocation} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
