import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import UserEdit from "../UserEdit/UserEdit";
import { SERVER_URL } from "../../redux/actions/actionNames";
import userImage from "../../assets/img/user.png";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Bookings from "../Bookings/Bookings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faFutbol,
  faMoneyCheckAlt,
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
      });
  }, [userToken]);

  const onButtonSelection = (option) => {
    setVisual(option);
  };

  return (
    <div className="dark:bg-darkPrimary dark:text-white">
      <Header />
      <div className="md:max-w-[1200px] md:h-screen m-auto">
        <div className="h-36 bg-[#498C8A] dark:bg-[#057276]"></div>
        <div className="md:grid md:grid-cols-2 xl:grid-cols-[30%,70%] h-3/4">
          <div>
            <img
              src={userDetails && userDetails.img ? userDetails.img : userImage}
              alt="logo_img"
              className="-mt-28 ml-16 md:ml-20 bg-cover rounded-full w-60 h-60 bg-green-900 relative"
            />

            <h1 className=" mb-5 text-center mt-5 text-2xl font-bold md:text-left md:ml-24 md:inline-block">
              {userDetails && userDetails.name
                ? userDetails.name + " " + userDetails.lastName
                : "Nombre de usuario no establecido"}
            </h1>

            <div className="md:grid md:grid-cols-2 md:w-max">
              <div className="grid grid-cols-2 gap-4 ml-5 md:ml-7 max-w-xs">
                <button
                  className="rounded-lg shadow-xl py-3 md:py-2 bg-white text-black active:scale-95 transition-all"
                  onClick={() => onButtonSelection("bookings")}
                >
                  <FontAwesomeIcon icon={faThLarge} size={"2x"} />
                  <p>Mis Reservas</p>
                </button>
                <button
                  className="rounded-lg shadow-xl py-3 md:py-2 bg-white text-black active:scale-95 transition-all"
                  onClick={() => onButtonSelection("transactions")}
                >
                  <FontAwesomeIcon icon={faMoneyCheckAlt} size={"2x"} />
                  <p>Transacciones</p>
                </button>
                {userDetails && userDetails.hasEstablishment ? (
                  <Link to={"/establishmentprofile"}>
                    <button
                      className="rounded-lg shadow-xl py-3 md:py-2 bg-white text-black active:scale-95 transition-all"
                      // onClick={() => onButtonSelection("establishments")}
                    >
                      <FontAwesomeIcon icon={faFutbol} size={"2x"} />
                      <p>Establecimiento</p>
                    </button>
                  </Link>
                ) : (
                  <Link to={"/establishment"}>
                    <button
                      className="rounded-lg shadow-xl py-3 md:py-2 bg-white text-black active:scale-95 transition-all"
                      // onClick={() => onButtonSelection("establishments")}
                    >
                      <FontAwesomeIcon icon={faFutbol} size={"2x"} />
                      <p>Crear Establecimiento</p>
                    </button>
                  </Link>
                )}
                <button
                  className="rounded-lg shadow-xl py-3 md:py-2 bg-white text-black active:scale-95 transition-all"
                  onClick={() => onButtonSelection("editProfile")}
                >
                  <FontAwesomeIcon icon={faCog} size={"2x"} />
                  <p>Editar perfil</p>
                </button>
              </div>
            </div>
          </div>
          <div className="pt-7 md:overflow-auto md:max-h-fit">
            {(() => {
              switch (visual) {
                case "bookings":
                  return <Bookings />;
                case "transactions":
                  return <div>Mis transacciones</div>;
                // case "establishments":
                //   return
                case "editProfile":
                  return <UserEdit />
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
