import React, { useState } from "react";
import logo from "../../assets/img/logo.svg";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faFutbol,
  faMoneyCheckAlt,
  faThLarge,
} from "@fortawesome/free-solid-svg-icons";

function Profile() {
  // const [visual, setVisual] = useState("bookings");

  // const switchVisual = (visual) => {
  //   switch (visual) {
  //     case "profile":
  //       return <Profile />;
  //     default:
  //       <Card />;
  //   }
  // };

  const Switch = (props) => {
    const { test, children } = props;
    // filter out only children with a matching prop
    return children.find((child) => {
      return children.find((child) => {
        return child.props.value === test;
      });
    });
  };

  const Sample = (props) => {
    const someTest = true;
    return (
      <Switch test={someTest}>
        <div value={"profile"}></div>
        <div value={"card"}></div>
      </Switch>
    );
  };

  return (
    <div className="dark:bg-darkPrimary dark:text-white">
      <Header />
      <div className="md:max-w-[1200px] md:h-screen m-auto">
        <div className="h-36 bg-[#498C8A] dark:bg-[#057276]"></div>
        <div className="md:grid md:grid-cols-2 xl:grid-cols-[30%,70%] h-3/4">
          <div>
            <img
              src={logo}
              alt="logo_img"
              className="-mt-28 ml-16 md:ml-20 bg-cover rounded-full w-60 h-60 bg-green-900 relative"
            />

            <h1 className=" mb-5 text-center mt-5 text-2xl font-bold md:text-left md:ml-24 md:inline-block">
              Nombre de usuario
            </h1>

            <div className="md:grid md:grid-cols-2 md:w-max">
              <div className="grid grid-cols-2 gap-4 ml-5 md:ml-7 max-w-xs">
                <button className="rounded-lg shadow-xl py-3 md:py-2 bg-white text-black active:scale-95 transition-all">
                  <FontAwesomeIcon icon={faThLarge} size={"2x"} />
                  <p>Mis Reservas</p>
                </button>
                <button className="rounded-lg shadow-xl py-3 md:py-2 bg-white text-black active:scale-95 transition-all">
                  <FontAwesomeIcon icon={faMoneyCheckAlt} size={"2x"} />
                  <p>Transacciones</p>
                </button>
                <Link to={"/establishmentprofile"}>
                  <button className="rounded-lg shadow-xl py-3 md:py-2 bg-white text-black active:scale-95 transition-all">
                    <FontAwesomeIcon icon={faFutbol} size={"2x"} />
                    <p>Establecimiento</p>
                  </button>
                </Link>
                <button className="rounded-lg shadow-xl py-3 md:py-2 bg-white text-black active:scale-95 transition-all">
                  <FontAwesomeIcon icon={faCog} size={"2x"} />
                  <p>Editar perfil</p>
                </button>
              </div>
            </div>
          </div>
          <div className="pt-7 md:overflow-auto md:max-h-fit">
            {/* <div>{switchVisual(visual)}</div> */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
