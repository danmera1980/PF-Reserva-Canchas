import { React, useEffect, useState } from "react";
import Header from "../Header/Header";
import SiteCreate from "../SiteCreate/SiteCreate"
import CourtCreate from "../CourtCreate/CourtCreate"
import Footer from "../Footer/Footer";
import EstablishmentBookings from "../EstablishmentBookings/EstablishmentBookings";
import { useDispatch, useSelector } from "react-redux";
import {
  getEstablishmentByUser,
  getSitesById,
} from "../../redux/actions/forms.js";
import { getEstablishment } from "../../redux/actions/establishment.js";

function EstablishmentProfile() {
  const [visual, setVisual] = useState("bookings");
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.register.userToken);
  const establishmentId = useSelector((state) => state.forms.establishmentId);
  const establishmentDetail = useSelector((state) => state.establishment.establishmentDetail)

  useEffect(() => {
    dispatch(getEstablishmentByUser(userToken));
    if (establishmentId) {
      dispatch(getSitesById(establishmentId, userToken));
    }
    dispatch(getEstablishment(establishmentId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

            <div className="flex justify-center items-center mt-5">
            <div>
                <button
                  className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded shadow-2xl shadow-indigo-600"
                  onClick={() => onButtonSelection("establishmentBookings")}
                >
                  Mis Reservas
                </button>
              </div>
              <div>
                <button
                  className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded shadow-2xl shadow-indigo-600"
                  onClick={() => onButtonSelection("siteCreate")}
                >
                  Crear sede
                </button>
              </div>
              <div>
                <button
                  className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded shadow-2xl shadow-indigo-600"
                  onClick={() => onButtonSelection("courtCreate")}
                >
                  Crear cancha
                </button>
              </div>
            </div>
          </div>
          <div className="pt-7 md:overflow-auto md:max-h-fit">
            {(() => {
              switch (visual) {
                case "siteCreate":
                  return <SiteCreate />;
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
