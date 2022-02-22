import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import UserEdit from "../UserEdit/UserEdit";
import { SERVER_URL } from "../../redux/actions/actionNames";
import defaultUserImage from "../../assets/img/user.png";
import ReactLoading from "react-loading";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Bookings from "../Bookings/Bookings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faFutbol,
  faMoneyCheckAlt,
  faPencilAlt,
  faThLarge,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Profile() {
  const [visual, setVisual] = useState("bookings");
  const userToken = useSelector((state) => state.register.userToken);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    axios
      .get(`${SERVER_URL}/users/profile`, { headers: headers })
      .then((res) => {
        setUserDetails(res.data);
        console.log(userDetails);
      });
  }, [userToken]);

  const onButtonSelection = (option) => {
    setVisual(option);
  };

  return (
    <div className="dark:bg-darkPrimary dark:text-white">
      <Header userDetails={userDetails} />
      <div className="md:max-w-[1200px] m-auto">
        <div className="h-36 bg-[#498C8A] dark:bg-[#057276]"></div>
        <div className="grid place-content-center md:grid-cols-2 xl:grid-cols-[30%,70%]">
          <div>
            <img
              src={
                userDetails && userDetails.img
                  ? userDetails.img
                  : defaultUserImage
              }
              alt="logo_img"
              className="-mt-28 ml-[2.8rem] md:ml-[3.5rem] object-cover rounded-full w-60 h-60 bg-green-900"
            />

            <h1 className="mb-5 text-center mt-5 text-2xl font-bold">
              {userDetails && userDetails.name
                ? userDetails.name + " " + userDetails.lastName
                : "Nombre de usuario no establecido"}
            </h1>
            <h1 className="mb-5 text-center mt-5">
              {userDetails && userDetails.isActive
                ? ""
                : "Su usuario ha sido deshabilitado comuníquese con el administrador"}
            </h1>

            <div className="">
              <div className="grid grid-cols-2 gap-4 max-w-xs">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-[4.5rem]"
                  onClick={() => onButtonSelection("bookings")}
                >
                  <FontAwesomeIcon icon={faThLarge} size={"2x"} />
                  <p>Mis Reservas</p>
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-[4.5rem]"
                  onClick={() => onButtonSelection("transactions")}
                >
                  <FontAwesomeIcon icon={faMoneyCheckAlt} size={"2x"} />
                  <p>Transacciones</p>
                </button>
                {userDetails && userDetails.hasEstablishment ? (
                  <Link to={"/establishmentprofile"}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-[4.5rem]">
                      <FontAwesomeIcon icon={faFutbol} size={"2x"} />
                      <p>Establecimiento</p>
                    </button>
                  </Link>
                ) : (
                  <Link to={"/establishment"}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-[4.5rem]">
                      <FontAwesomeIcon icon={faFutbol} size={"2x"} />
                      <p>Crear Establecimiento</p>
                    </button>
                  </Link>
                )}
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-[4.5rem]"
                  onClick={() => onButtonSelection("editProfile")}
                >
                  <FontAwesomeIcon icon={faPencilAlt} size={"2x"} />
                  <p>Editar perfil</p>
                </button>
              </div>
            </div>
            {userDetails && userDetails.isAdmin ? (
              <div className="mt-[1rem] flex place-content-center">
                <Link to={"/admin"}>
                  {" "}
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-[4.8rem] sm:mr-[2.5rem] border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-[4.5rem]">
                    <FontAwesomeIcon icon={faCog} size={"2x"} />
                    <p>Panel Administrador</p>
                  </button>
                </Link>{" "}
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="pt-7 md:overflow-auto md:max-h-fit">
            {(() => {
              switch (visual) {
                case "bookings":
                  return <Bookings />;
                case "transactions":
                  return <div>Transacciones</div>;
                case "editProfile":
                  return <UserEdit userDetails={userDetails} />;
                default:
                  return <Bookings />;
              }
            })()}
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
