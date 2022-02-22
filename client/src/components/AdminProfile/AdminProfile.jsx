import { React, useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";
import { SERVER_URL } from "../../redux/actions/actionNames";
import UsersTable from "./UsersTable";
import { useSelector } from "react-redux";
import EstablihsmentTable from "./EstablishmentTable";

function AdminProfile() {
  const [users, setUsers] = useState(null);
  const [establishment, setEstablishment] = useState(null);
  const [visual, setVisual] = useState("");
  const userToken = useSelector((state) => state.register.userToken);

  const onButtonSelection = (option) => {
    setVisual(option);
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    axios.get(`${SERVER_URL}/users`, { headers: headers }).then((res) => {
      setUsers(res.data);
    });
  }, [userToken]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    axios
      .get(`${SERVER_URL}/establishment/admin`, { headers: headers })
      .then((res) => {
        setEstablishment(res.data);
      });
  }, [userToken]);
  console.log(establishment);
  return (
    <div>
      <Header />
      <h1 className="text-indigo-500 flex justify-center text-2xl mt-3">
        Perfil Administrador
      </h1>
      <div className="grid grid-cols-2 gap-4 max-w-xs mt-10 ml-10">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-[4.5rem]"
          onClick={() => onButtonSelection("users")}
        >
          Ver usuarios
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-[4.5rem]"
          onClick={() => onButtonSelection("establishments")}
        >
          Ver Establecimientos
        </button>
      </div>
      <div>
        {(() => {
          switch (visual) {
            case "users":
              return <UsersTable users={users} />;
            case "establishments":
              return <EstablihsmentTable establishment={establishment} />;
            default:
              return <div></div>;
          }
        })()}
      </div>
      <Footer />
    </div>
  );
}

export default AdminProfile;
