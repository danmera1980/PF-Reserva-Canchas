import React from "react";
import logo from "../../assets/img/logo.png";
import Header from "../Header/Header";
import Card from "../Card/Card";
import Footer from "../Footer/Footer";

function Profile() {
  return (
    <div>
      <Header />
      <div className="md:max-w-[1200px] m-auto">
        <div className=" h-36 bg-[#F4B30B]"></div>
        <div className="-mt-28 ml-16 md:ml-20">
          <img
            src={logo}
            alt="logo_img"
            className="bg-cover rounded-full w-60 h-60 bg-green-900 relative"
          />
        </div>
        <h1 className=" mb-5 text-center mt-5 text-2xl font-bold md:text-left md:ml-24 md:inline-block">
          Nombre de usuario
        </h1>

        <div className="md:grid md:grid-cols-2">
          <div className="grid grid-cols-2 gap-4 ml-5 md:ml-7 max-w-xs">
            <button className="rounded-lg shadow-xl py-3 md:py-2 bg-white text-black ">
              Mis Reservas
            </button>
            <button className="rounded-lg shadow-xl py-3 md:py-2 bg-white text-black ">
              Transacciones
            </button>
            <button className="rounded-lg shadow-xl py-3 md:py-2 bg-white text-black ">
              Establecimiento
            </button>
            <button className="rounded-lg shadow-xl py-3 md:py-2 bg-white text-black ">
              Editar perfil
            </button>
          </div>

          <div className="pt-7 md:pt-0">
            <Card />
          </div>
        </div>
      </div>
      <div className="md:absolute py-1 px-1 bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
