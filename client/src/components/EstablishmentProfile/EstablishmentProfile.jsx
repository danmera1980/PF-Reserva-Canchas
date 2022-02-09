import {React, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import logo from "../../assets/img/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { getEstablishmentByUser, getSitesById} from "../../redux/actions/forms.js";

function EstablishmentProfile() {

  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.register.userToken);
  const establishmentId = useSelector((state) => state.forms.establishmentId);

  useEffect(()=>{
    dispatch(getEstablishmentByUser(userToken))
    if(establishmentId){
      dispatch(getSitesById(establishmentId, userToken))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

    return (
        <div>
      <Header />
      <div className="md:max-w-[1200px] m-auto">
        <div className="h-36 bg-[#498C8A] dark:bg-[#057276]"></div>
        <div className="md:grid md:grid-cols-2 xl:grid-cols-[30%,70%] h-3/4">
          <div>
            <img
              src={logo}
              alt="logo_img"
              className="-mt-28 ml-16 md:ml-20 bg-cover rounded-full w-60 h-60 bg-green-900 relative"
            />
            <div className="flex justify-center items-center mt-5">
            <div>          
                    <Link to={"/site"}>
                        <button className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded shadow-2xl shadow-indigo-600">Crear sede</button>
                    </Link>
                </div>
                <div>
                    <Link to={"/court"}>
                        <button className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded shadow-2xl shadow-indigo-600">Crear cancha</button>
                    </Link>
                </div>
                </div>
          </div>
         
        </div>
      </div>
      <div className="mb-0 mt-80">
        <Footer />
      </div>
    </div>
    )
}

export default EstablishmentProfile

