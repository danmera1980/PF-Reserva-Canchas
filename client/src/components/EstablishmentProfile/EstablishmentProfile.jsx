import { React, useEffect, useState } from "react";
import Header from "../Header/Header";
import SiteCreate from "../SiteCreate/SiteCreate";
import CourtCreate from "../CourtCreate/CourtCreate";
import Footer from "../Footer/Footer";
import axios from "axios";
import { SERVER_URL } from "../../redux/actions/actionNames";
import EstablishmentBookings from "../EstablishmentBookings/EstablishmentBookings";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Sites from "../Sites/Sites";
import defaultEstablishmentLogo from "../../assets/img/defaultEstablishmentLogo.jpg";

function EstablishmentProfile() {
  const [visual, setVisual] = useState("bookings");
  const userToken = useSelector((state) => state.register.userToken);
  const [establishmentDetail, setEstablishmentDetail] = useState(null);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    axios
      .get(`${SERVER_URL}/establishment/idUser`, { headers: headers })
      .then((res) => {
        setEstablishmentDetail(res.data);
      });
  }, [userToken]);

  const onButtonSelection = (option) => {
    setVisual(option);
  };

  return (
    <div className="dark:bg-darkPrimary dark:text-white">
      <Header />
      <div className="md:max-w-[1200px] m-auto">
        <div className="h-36 bg-[#498C8A] dark:bg-[#057276]"></div>
        <div className="grid place-content-center md:grid-cols-2 xl:grid-cols-[30%,70%]">
          <div>
            <img
              src={
                establishmentDetail && establishmentDetail.logoImage
                  ? establishmentDetail.logoImage
                  : defaultEstablishmentLogo
              }
              alt="logo_img"
              className="-mt-28 ml-[2.8rem] md:ml-[3.5rem] object-cover rounded-full w-60 h-60 bg-green-900"
            />

            <h1 className="mb-5 text-center mt-5 text-2xl font-bold">
              {establishmentDetail && establishmentDetail.name
                ? establishmentDetail.name
                : "Sin nombre de establecimiento"}
            </h1>

            <div className="grid grid-cols-2 gap-4 max-w-xs">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-[4.5rem]"
                onClick={() => onButtonSelection("establishmentBookings")}
              >
                Mis Reservas
              </button>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-[4.5rem]"
                onClick={() => onButtonSelection("sites")}
              >
                Ver sedes
              </button>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-[4.5rem]"
                onClick={() => onButtonSelection("siteCreate")}
              >
                Crear sede
              </button>
              {establishmentDetail && establishmentDetail.sites.length ? (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-[4.5rem]"
                  onClick={() => onButtonSelection("courtCreate")}
                >
                  Crear cancha
                </button>
              ) : (
                <button
                  className="bg-slate-500 hover:bg-red-600 text-white font-bold border border-slate-500 rounded shadow-md shadow-red-600 active:scale-95 transition-all h-[4.5rem]"
                  onClick={() =>
                    Swal.fire({
                      position: "top",
                      icon: "error",
                      title:
                        "Necesitas tener al menos una sede antes de crear una cancha",
                      showConfirmButton: true,
                      timer: 2000,
                    }) && onButtonSelection("siteCreate")
                  }
                >
                  Crear cancha
                </button>
              )}

              <Link to={"/profile"}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-[4.5rem] w-[20.1rem]">
                  Volver al perfil
                </button>
              </Link>
            </div>
          </div>
          <div className="pt-7 md:overflow-auto md:max-h-fit">
            {(() => {
              switch (visual) {
                case "siteCreate":
                  return <SiteCreate />;
                case "sites":
                  return <Sites establishmentDetail={establishmentDetail.sites}/>;
                case "courtCreate":
                  return <CourtCreate sites={establishmentDetail.sites}/>;
                default:
                  return <EstablishmentBookings establishmentDetail={establishmentDetail}/>;
              }
            })()}
          </div>
        </div>
      </div>
      <div className="mb-0 mt-80">
        <Footer />
      </div>
    </div>
  );
}

export default EstablishmentProfile;
