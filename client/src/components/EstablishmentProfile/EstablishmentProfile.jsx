import { React, useEffect, useState } from "react";
import Header from "../Header/Header";
import SiteCreate from "../SiteCreate/SiteCreate";
import CourtCreate from "../CourtCreate/CourtCreate";
import ReportingForm from "../Reporting/ReportingForm";
import Footer from "../Footer/Footer";
import axios from "axios";
import { SERVER_URL } from "../../redux/actions/actionNames";
import EstablishmentBookings from "../EstablishmentBookings/EstablishmentBookings";
import { useSelector,useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Sites from "../Sites/Sites";
import defaultEstablishmentLogo from "../../assets/img/defaultEstablishmentLogo.jpg";
import {getAllActiveEstablishments} from "../../redux/actions/establishment.js"

function EstablishmentProfile() {
  
  const location = useLocation()
  const dispatch = useDispatch();

  const visualInit = location.state && location.state.visualInit ? location.state.visualInit : 'bookings'
  const estabDetailInit = location.state && location.state.estabDetailInit ? location.state.estabDetailInit : null
 
  const [visual, setVisual] = useState(visualInit);
  const userToken = useSelector((state) => state.register.userToken);
  const [establishmentDetail, setEstablishmentDetail] = useState(estabDetailInit);
  
  useEffect(()=>{
    dispatch(getAllActiveEstablishments())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    setVisual(visualInit)
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    axios
      .get(`${SERVER_URL}/establishment/idUser`, { headers: headers })
      .then((res) => {
        setEstablishmentDetail(res.data);
        setVisual(visualInit);
      });
  }, [userToken, visualInit]);

  const onButtonSelection = (option) => {
    setVisual(option);
  };
  // console.log('soyestablishmentdetail',establishmentDetail)

  return (
    <div className="dark:bg-darkPrimary dark:text-white">
      <Header />
      <div className="md:max-w-[1200px] m-auto">
        <div className="grid place-content-center md:grid-cols-2 xl:grid-cols-[30%,70%]">
          <div>
            <div className="flex flex-col items-center max-w-xs">
            <img
              src={
                establishmentDetail && establishmentDetail.logoImage
                  ? establishmentDetail.logoImage
                  : defaultEstablishmentLogo
              }
              alt="logo_img"
              className="mt-8 object-cover rounded-full w-60 h-60 bg-green-900"
            />

            <h1 className="mb-5 text-center mt-5 text-2xl font-bold">
              {establishmentDetail && establishmentDetail.name
                ? establishmentDetail.name
                : "Sin nombre de establecimiento"}
            </h1>
            <h1 className=" mb-5 text-center">
              {establishmentDetail && establishmentDetail.isActive ? "" : "Su usuario ha sido deshabilitado comuníquese con el administrador"}
            </h1>
            </div>

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
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-[4.5rem]"
                onClick={() => onButtonSelection("reporting")}
              >
                Reportes
              </button>
              <Link to={"/profile"}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700 rounded shadow-2xl shadow-indigo-600 active:scale-95 transition-all h-[4.5rem] w-[9.5rem]">
                  Volver al perfil
                </button>
              </Link>
            </div>
          </div>
          <div className="pt-7 md:overflow-auto md:max-h-fit">
            {(() => {
              switch (visual) {
                case "siteCreate":
                  return <SiteCreate establishmentId={establishmentDetail.id}/>;
                case "sites":
                  return <Sites/>;
                case "courtCreate":
                  return <CourtCreate/>;
                case "reporting":
                  return <ReportingForm establishmentDetail={establishmentDetail}/>;
                default:
                  return <div className="w-[20rem] md:w-full">
                    <EstablishmentBookings establishmentDetail={establishmentDetail}/>
                  </div>;
              }
            })()}
          </div>
        </div>
      </div>
      <div className="mb-0 mt-20">
        <Footer />
      </div>
    </div>
  );
}

export default EstablishmentProfile;
