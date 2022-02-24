/* eslint import/no-webpack-loader-syntax: off */
import React, {useEffect, useState} from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import logo from "../../assets/img/logo.svg";
import ReactMapGL, { Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import MapboxWorker from "mapbox-gl/dist/mapbox-gl-csp-worker";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import {
  faBaseballBall,
  faFutbol,
  faTableTennis,
  faVolleyballBall,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "../Calendar/Calendar";
import axios from "axios";
import { SERVER_URL } from "../../redux/actions/actionNames";
import MercadoPago from "../MercadoPago/MercadoPago";
import Swal from "sweetalert2";

const MapStyle = "mapbox://styles/mapbox/streets-v11";
const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function BookingCourt() {
  const history = useHistory();
  const { courtId } = useParams();
  const [court, setCourt] = useState([]);
  const nowDateTime = new Date();
  const currentDateTime = {
    year: nowDateTime.getFullYear(),
    month: nowDateTime.getMonth() + 1,
    day: nowDateTime.getDate(),
    hour: nowDateTime.getHours(),
  };
  const [input, setInput] = useState({
    userId: null,
    courtId: null,
    courtName: "",
    price: null,
    startTime: "",
    endTime: "",
    status: "",
  });
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [viewport, setViewport] = useState({
    latitude: currentLocation.latitude,
    longitude: currentLocation.longitude,
    width: "600px",
    height: "400px",
    zoom: 12,
    pitch: 50,
  });
  const userToken = useSelector((state) => state.register.userToken);
  const isActive = useSelector((state) => state.register.isActive);
  const [userId, setUserId] = useState("");

  const selectedBooking = (data) => {
    if (userToken === null) {
      Swal.fire({
        title: "Ingresa a tu cuenta para que puedas reservar",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          return history.push("/login");
        }
      });
    } else if (!isActive) {
      Swal.fire({
        title: "Usuario inhabilitado, contactarse con el administrador",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          return history.push("/");
        }
      });
    }
    setInput({
      ...input,
      startTime: data.startTime.toString(),
      endTime: data.endTime.toString(),
      userId: userId.id,
    });
  };

  useEffect(
    () => [
      axios.get(`${SERVER_URL}/court/${courtId}`).then((res) => {
        setCourt(res.data);
        setInput({
          ...input,
          courtId: res.data.id,
          courtName: res.data.name,
          price: res.data.price,
        });

        setViewport({
          ...viewport,
          latitude: res.data.site.latitude,
          longitude: res.data.site.longitude,
        });
      }),
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          ...currentLocation,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      }),
    ],
    [courtId]
  );

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    axios
      .get(`${SERVER_URL}/users/profile`, { headers: headers })
      .then((res) => {
        setUserId(res.data);
      });
  }, [userToken]);

  let sportsIcon = null;
  switch (court.sport) {
    case "Futbol 5":
    case "Futbol 7":
    case "Futbol 11":
      sportsIcon = <FontAwesomeIcon icon={faFutbol} size="2x" />;
      break;
    case "Basquet":
      sportsIcon = <FontAwesomeIcon icon={faBaseballBall} size="2x" />;
      break;
    case "Tenis":
      sportsIcon = <FontAwesomeIcon icon={faTableTennis} size="2x" />;
      break;
    case "Handbol":
      sportsIcon = <FontAwesomeIcon icon={faVolleyballBall} size="2x" />;
      break;
    case "Squash":
      sportsIcon = <FontAwesomeIcon icon={faBaseballBall} size="2x" />;
      break;
    case "Padel":
      sportsIcon = <FontAwesomeIcon icon={faBaseballBall} size="2x" />;
      break;
    default:
      sportsIcon = <FontAwesomeIcon icon={faFutbol} size="2x" />;
  }

  return (
    <div>
      <Header />
      {court.name ? (
        <div className="grid place-content-center md:max-w-[1200px] m-auto">
          <div className="flex place-content-center items-center gap-5 my-2">
            <img
              src={
                court.site.establishment.logoImage
                  ? court.site.establishment.logoImage
                  : logo
              }
              alt="logo_establecimiento"
              className="rounded-lg w-32 h-32 object-contain"
            />

            <h1 className="dark:text-darkAccent text-7xl">
              {court?.site.establishment.name}
            </h1>
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-2">
            <div className="flex items-center w-[19.5rem] ml-36 lg:w-[500px] lg:max-h-[23rem] lg:rounded lg:grid lg:ml-0">
              <div className="flex flex-col items-center place-content-center font-bold py-2 text-lg dark:text-darkAccent text-center">
                <h1>{court?.site.name}</h1>
              </div>
              <div className="font-bold py-2 dark:text-darkAccent text-center">
                <p>🥅 {court?.name}</p>
              </div>
              <div className="font-bold py-2 dark:text-white text-center">
                <p>{sportsIcon}</p>
              </div>
              <div className="max-w-xl font-bold text-center py-2 dark:text-darkAccent">
                <h1>
                  <FontAwesomeIcon icon={faInfo} color={"white"} />
                  <span> {court?.description}</span>
                </h1>
              </div>
              <div className="font-bold py-2 dark:text-darkAccent text-center ">
                <p>
                  🕒 Horario de {court?.site.establishment.timeActiveFrom} a{" "}
                  {court?.site.establishment.timeActiveTo}
                </p>
              </div>
              <div className="font-bold py-2 text-xl dark:text-white text-center">
                <h1>
                  <FontAwesomeIcon icon={faMapMarkerAlt} color={"red"} />{" "}
                  <span>
                    Ubicación {court?.site.city}, {court?.site.street},{" "}
                    {court?.site.streetNumber}
                  </span>
                </h1>
              </div>
              <div className="font-bold py-2 text-xl dark:text-white text-center">
                <p>Precio $ {court.price}</p>
              </div>
            </div>

            <ReactMapGL
              {...viewport}
              onViewportChange={(newView) => setViewport(newView)}
              mapboxApiAccessToken={mapboxToken}
              mapStyle={MapStyle}
            >
              <Marker
                latitude={court?.site.latitude}
                longitude={court?.site.longitude}
              >
                <FontAwesomeIcon icon={faMapMarkerAlt} color="red" size="lg" />
              </Marker>
            </ReactMapGL>
          </div>

          <div className="grid place-content-center grid-flow-col gap-2 mb-[3rem] mt-2 transition-all">
            <Calendar
              selectedBooking={selectedBooking}
              currentDateTime={currentDateTime}
              courtId={input.courtId}
            />

            <div className="">
              {isActive &&
              userToken &&
              input.startTime.length &&
              input.endTime.length ? (
                <MercadoPago booking={input} />
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <Footer />
    </div>
  );
}
