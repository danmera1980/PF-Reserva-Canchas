import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import logo from "../../assets/img/logo.svg";
import ReactMapGL, { Marker } from "react-map-gl";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
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

  return (
    <div>
      <Header />
      {court.name ? (
        <div className="grid place-content-center  ">
          <div className="grid place-content-center ">
            <img
              src={
                court.site.establishment.logoImage
                  ? court.site.establishment.logoImage
                  : logo
              }
              alt="logo_establecimiento"
              className=" rounded-xl max-w-3xl place-content-center pb-5 "
            />
          </div>
          <div className="lg:grid lg:grid-cols-2 lg:gap-1 lg:h-full lg:ml-0">
            <div className="flex items-center justify-center flex-col w-[19.5rem] ml-36 rounded bg-white dark:bg-slate-600 p-5 place-content-center lg:w-[500px] lg:rounded lg:grid lg:ml-0 lg:mr-2">
              <div className="flex flex-col items-center justify-center font-bold text-center py-2 text-xl dark:text-white ">
                <h1>{court?.site.establishment.name}</h1>
              </div>
              <div className="flex flex-col items-center justify-center font-bold py-2 text-lg dark:text-white text-center">
                <h1>{court?.site.name}</h1>
              </div>
              <div className="flex flex-col items-center justify-center font-bold py-2 text-m dark:text-white text-center">
                <p>{court?.name}</p>
              </div>
              <div className="flex flex-col items-center justify-center font-bold py-2  dark:text-white text-center">
                <p>Descripcion de cancha</p>
              </div>
              <div className="flex flex-col items-center justify-center font-bold py-2  dark:text-white text-center">
                <p>Deporte: {court?.sport}</p>
              </div>
              <div className="flex flex-col items-center justify-center max-w-xl text-s font-bold text-center py-2 dark:text-white">
                <p>{court?.description}</p>
              </div>
              <div className="flex flex-col items-center justify-center font-bold py-2  dark:text-white text-center">
                <p>
                  Ubicación {court?.site.city}, {court?.site.street},{" "}
                  {court?.site.streetNumber}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center font-bold py-2  dark:text-white text-center">
                <p>Precio ${court.price}</p>
              </div>
              <div className="flex flex-col items-center justify-center font-bold py-2  dark:text-white text-center ">
                <p>
                  Horario de {court?.site.establishment.timeActiveFrom} a{" "}
                  {court?.site.establishment.timeActiveTo}
                </p>
              </div>
            </div>

            <div className="flex justify-center items-center flex-col mt-3 lg:flex lg:ml-0 lg:items-start lg:mt-0">
              <div className="flex justify-center items-center flex-col">
                <Calendar
                  className="rounded flex flex-col"
                  selectedBooking={selectedBooking}
                  currentDateTime={currentDateTime}
                  courtId={input.courtId}
                />
              </div>
              <div className="flex justify-center items-center flex-col">
                {isActive &&
                userToken &&
                input.startTime.length &&
                input.endTime.length ? (
                  <MercadoPago booking={input} />
                ) : null}
              </div>
            </div>
            <div className="flex justify-center items-center flex-col mt-3 lg:grid lg:w-full">
              <ReactMapGL
                {...viewport}
                onViewportChange={(newView) => setViewport(newView)}
                mapboxApiAccessToken={mapboxToken}
                mapStyle={MapStyle}
                className="flex place-content-center"
              >
                <Marker
                  latitude={court?.site.latitude}
                  longitude={court?.site.longitude}
                >
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    color="red"
                    size="lg"
                  />
                </Marker>
              </ReactMapGL>
            </div>
          </div>
        </div>
      ) : null}

      <Footer />
    </div>
  );
}
