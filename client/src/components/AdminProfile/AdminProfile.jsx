import { React, useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";

import UsersTable from "./UsersTable";
import { useSelector } from "react-redux";
import EstablihsmentTable from "./EstablishmentTable";

function AdminProfile() {
  const [visual, setVisual] = useState("");

  const onButtonSelection = (option) => {
    setVisual(option);
  };

  return (
    <div>
      <Header />
      <h1 className="text-indigo-500 flex justify-center text-2xl mt-3">
        Perfil Administrador
      </h1>
      <div className="flex w-full mt-10 gap-4 justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white w-40 font-bold px-3 border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-[4.5rem]"
          onClick={() => onButtonSelection("users")}
        >
          Ver usuarios
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white w-40 font-bold px-3 border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-[4.5rem]"
          onClick={() => onButtonSelection("establishments")}
        >
          Ver Establecimientos
        </button>
      </div>
      <div>
        {(() => {
          switch (visual) {
            case "users":
              return <UsersTable />;
            case "establishments":
              return <EstablihsmentTable />;
            default:
              return <UsersTable />;
          }
        })()}
      </div>
      <Footer />
    </div>
  );
}

export default AdminProfile;
