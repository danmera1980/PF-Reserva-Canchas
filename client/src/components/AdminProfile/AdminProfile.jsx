import { React, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import UsersTable from "./UsersTable";
import EstablishmentTable from "./EstablishmentTable";
import { Link } from "react-router-dom";
import "../Bookings/Scrollbar.scss"

function AdminProfile() {
  const [visual, setVisual] = useState("");

  const onButtonSelection = (option) => {
    setVisual(option);
  };

  return (
    <div>
      <Header />
      <div className="md:max-w-[1200px] m-auto">
      <div className="flex place-content-center mt-5">
        <Link to="/profile">
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white text-sm w-24 font-bold border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-10"
            onClick={() => onButtonSelection("users")}
          >
            Volver
          </button>
          </Link>
      </div>
      
      <div className="flex w-full mt-3 gap-4 justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold w-40 border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-[3.6rem]"
          onClick={() => onButtonSelection("users")}
        >
          Ver usuarios
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white text-sm w-40 font-bold border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-[3.6rem]"
          onClick={() => onButtonSelection("establishments")}
        >
          Ver Establecimientos
        </button>
      </div>
      <div className="flex place-content-center md:overflow-auto md:max-h-fit scrollbar mt-4">
        {(() => {
          switch (visual) {
            case "users":
              return <UsersTable />;
            case "establishments":
              return <EstablishmentTable />;
            default:
              return <UsersTable />;
          }
        })()}
      </div>
    </div>
      <Footer />
    </div>
  );
}

export default AdminProfile;
