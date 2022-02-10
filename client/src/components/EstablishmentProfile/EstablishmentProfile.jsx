import { React, useEffect, useState } from "react";
import Header from "../Header/Header";
import SiteCreate from "../SiteCreate/SiteCreate";
import CourtCreate from "../CourtCreate/CourtCreate";
import Footer from "../Footer/Footer";
import EstablishmentBookings from "../EstablishmentBookings/EstablishmentBookings";
import { useDispatch, useSelector } from "react-redux";
import {
  getEstablishmentByUser,
  getSitesById,
} from "../../redux/actions/forms.js";
import { getEstablishment } from "../../redux/actions/establishment.js";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Sites from "../Sites/Sites";

function EstablishmentProfile() {
  const [visual, setVisual] = useState("bookings");
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.register.userToken);
  const establishmentId = useSelector((state) => state.forms.establishmentId);
  const establishmentDetail = useSelector(
    (state) => state.establishment.establishmentDetail
  );

  useEffect(() => {
    dispatch(getEstablishmentByUser(userToken));
    if (establishmentId) {
      dispatch(getSitesById(establishmentId, userToken));
    }
    dispatch(getEstablishment(establishmentId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // axios.get(`${SERVER_URL}/establishment/`)
  }, [dispatch, establishmentId, userToken]);

  const onButtonSelection = (option) => {
    setVisual(option);
  };

  return (
    <div className="dark:bg-darkPrimary dark:text-white">
      <Header />
      <div className="md:max-w-[1200px] m-auto">
        <div className="h-36 bg-[#498C8A] dark:bg-[#057276]"></div>
        <div className="md:grid md:grid-cols-2 xl:grid-cols-[30%,70%] h-3/4">
          <div>
            <img
              src={establishmentDetail.logoImage}
              alt="logo_img"
              className="-mt-28 ml-16 md:ml-20 bg-cover rounded-full w-60 h-60 bg-green-900 relative"
            />

            <h1 className=" mb-5 text-center mt-5 text-2xl font-bold md:text-left md:ml-24 md:inline-block">
              {establishmentDetail.name}
            </h1>

            <div className="grid grid-cols-2 gap-4 ml-5 md:ml-7 max-w-xs">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all w-28 h-20"
                onClick={() => onButtonSelection("establishmentBookings")}
              >
                Mis Reservas
              </button>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all w-28 h-20"
                onClick={() => onButtonSelection("sites")}
              >
                Ver sedes
              </button>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all w-28 h-20"
                onClick={() => onButtonSelection("siteCreate")}
              >
                Crear sede
              </button>
              {establishmentDetail && establishmentDetail.sites.length ? (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all w-28 h-20"
                  onClick={() => onButtonSelection("courtCreate")}
                >
                  Crear cancha
                </button>
              ) : (
                <button
                  className="bg-slate-500 hover:bg-red-600 text-white font-bold border border-slate-500 rounded shadow-md shadow-red-600 active:scale-95 transition-all w-28 h-20"
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
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-20 col-span-2 w-[17.5rem]">
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
                  return <Sites/>
                case "courtCreate":
                  return <CourtCreate />;
                default:
                  return <EstablishmentBookings />;
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
