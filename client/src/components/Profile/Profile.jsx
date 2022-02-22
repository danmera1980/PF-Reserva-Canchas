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
              <div className="grid gap-4 max-w-xs">
                <button
                  className="col-span-2 bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-14"
                  onClick={() => onButtonSelection("bookings")}
                >
                  <span className="flex place-content-center gap-2">
                    <FontAwesomeIcon icon={faThLarge} size={"2x"} />
                    <p className="pt-1">Mis Reservas</p>
                  </span>
                </button>

                {userDetails && userDetails.hasEstablishment ? (
                  <Link to={"/establishmentprofile"} className="col-span-2">
                    <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-14">
                      <span className="flex place-content-center gap-2">
                        <FontAwesomeIcon icon={faFutbol} size={"2x"} />
                        <p className="pt-1">Establecimiento</p>
                      </span>
                    </button>
                  </Link>
                ) : (
                  <Link to={"/establishment"} className="col-span-2">
                    <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-14">
                      <span className="flex place-content-center gap-2">
                        <FontAwesomeIcon icon={faFutbol} size={"2x"} />
                        <p className="pt-1">Crear Establecimiento</p>
                      </span>
                    </button>
                  </Link>
                )}
                <button
                  className="col-span-2 bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-14"
                  onClick={() => onButtonSelection("editProfile")}
                >
                  <span className="flex place-content-center gap-2">
                    <FontAwesomeIcon icon={faPencilAlt} size={"2x"} />
                    <p className="pt-1">Editar perfil</p>
                  </span>
                </button>
                {userDetails && userDetails.isAdmin ? (
                  <Link to={"/admin"} className="col-span-2">
                    {" "}
                    <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-14">
                      <span className="flex place-content-center gap-2">
                        {" "}
                        <FontAwesomeIcon icon={faCog} size={"2x"} />
                        <p className="pt-1">Panel Administrador</p>
                      </span>
                    </button>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
          <div className="pt-7 md:overflow-auto md:max-h-fit">
            {(() => {
              switch (visual) {
                case "bookings":
                  return <Bookings />;
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
