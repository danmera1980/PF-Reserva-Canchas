import React from "react";
import logo from "../../assets/img/logo.png";
import Header from "../Header/Header";

function Profile() {
  return (
    <div>
      <Header />
      <div className="w-full pb-32 bg-[#F4B30B]"></div>
      <div className="">
        <img
          src={logo}
          alt="logo_img"
          className="bg-cover rounded-full w-60 h-60 bg-green-900  z-10 -mt-20 ml-32"
        />
      </div>

      <div>
        <h1 className="text-center mt-5 text-2xl font-bold">
          Establishment Name
        </h1>
        <button className="pt-2">Edit photo</button>
      </div>

      <div className="mt-10">
        <h1 className="text-xl font-bold">Mis Reservas</h1>
        <ol className="mt-5 grid grid-cols-3 underline">
          <li className="cursor-pointer">Actuales</li>
          <li className="cursor-pointer">Pasadas</li>
          <li className="cursor-pointer">Canceladas</li>
        </ol>
        <div className="grid row-span-full"></div>
      </div>
    </div>
  );
}

export default Profile;
