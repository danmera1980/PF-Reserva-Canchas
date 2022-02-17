import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSite } from "../../redux/actions/site";
import { getEstablishmentById } from "../../redux/actions/forms";
import ReactMapGL, { Marker } from 'react-map-gl';
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const MapStyle = 'mapbox://styles/mapbox/streets-v11';
const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;

function validate(input) {
  let errors = {};
  if (input.name !== "" && !/^[a-zA-Z0-9' ':.]{1,30}$/.test(input.name)) {
    errors.name = "No se permiten simbolos";
  }
  if (input.country !== "" && !/^[a-zA-Z0-9' ']{1,30}$/.test(input.country)) {
    errors.country = "No se permiten simbolos";
  }
  if (input.city !== "" && !/^[a-zA-Z0-9' ']{1,30}$/.test(input.city)) {
    errors.city = "Se requiere una ciudad";
  }
  if (input.street !== "" && !/^[a-zA-Z0-9' ':.]{1,30}$/.test(input.street)) {
    errors.street = "Se requiere un nombre de calle";
  }
  if (input.streetNumber !== "" && input.streetNumber < 0) {
    errors.streetNumber = "No se permite numero negativo";
  }
  return errors;
}

export default function ReportingForm({establishmentDetail}) {
  const dispatch = useDispatch();
  const establishmentId  = establishmentDetail.id;
  const sites = establishmentDetail.sites

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    establishmentId: establishmentId?establishmentId:"",
  });

  const [selectedSite, setSelectedSite] = useState(sites)
  const [courts, setCourts] = useState(determinateCourts(selectedSite))

  function determinateCourts(selectedSite){
    let allCourts = selectedSite.map(c => c.courts);
    let availableCourts=[];
    for(let i=0; i< allCourts.length; i++){
        for(let j=0; j<allCourts[i].length; j++){
            availableCourts = availableCourts.concat(allCourts[i][j])
        }   
    }
    return availableCourts;
  }
  
  useEffect(()=>{
    setCourts(determinateCourts(selectedSite))
  },[selectedSite])
     
  function handleSelectSite(e) {
    setInput({
      ...input,
      siteId: e.target.value,
      courtId:''
    });
    if(e.target.value===""){
        setSelectedSite(sites);
    }else{
        setSelectedSite(sites.filter(site => site.id===e.target.value))
    }
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectCourt(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      errors.hasOwnProperty("name") ||
      errors.hasOwnProperty("country") ||
      errors.hasOwnProperty("city") ||
      errors.hasOwnProperty("street") ||
      errors.hasOwnProperty("streetNumber")
    ) {
      Swal.fire({
        icon: "error",
        text: "Faltan completar campos obligatorios",
      });
    } else {
      console.log('input del sitecreate',input)
      
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Sede creada con exito",
        showConfirmButton: false,
        timer: 2000,
      });
      setInput({
        establishmentId: establishmentId,
        name: "",
        country: "",
        city: "",
        street: "",
        streetNumber: "",
      });
      window.location.reload();
    }
  }
  return (
    <div className="max-w-xs sm:max-w-none m-auto">
        <div className="flex flex-col justify-center text-black">
          
          <form
            className="w-full justify-center items-center border-grey-400 border-2 bg-white drop-shadow-md backdrop-blur-3xl rounded-md px-3 py-3"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="relative mt-3">
                <select
                    className="w-full peer placeholder-transparent h-10 border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent"
                    name="siteId"
                    onChange={(e) => handleSelectSite(e)}
                    required
                >
                    <option value="">Todas las sedes</option>
                    {sites === null
                        ? ""
                        : sites.map((c) => (
                            <option value={c.id} key={c.id}>
                            {c.name}
                            </option>
                    ))}
                </select>
                <label
                className="absolute left-0 -top-3.5 
                                                text-gray-600 text-sm 
                                                peer-placeholder-shown:text-base 
                                                peer-placeholder-shown:text-gray-400
                                                peer-placeholder-shown:top-2 transition-all 
                                                peer-focus:-top-3.5 peer-focus:text-gray-600
                                                peer-focus:text-sm
                                                cursor-text"
                >
                Sedes:
                </label>
                {errors.siteId && (
                <p className="text-red-500 text-xs italic">{errors.siteId}</p>
                )}
            </div>

            {input.siteId && input.siteId!==''?
                <div className="relative mt-3">
                <select
                    className="w-full peer placeholder-transparent h-10 border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent"
                    name="courtId"
                    onChange={(e) => handleSelectCourt(e)}
                    required
                >
                    <option value="">Todas las canchas</option>
                    {courts
                        ? courts.map((c) => (
                            <option value={c.id} key={c.id}>
                            {c.name}
                            </option>
                        ))
                        : ""
                    }
                </select>
                <label
                className="absolute left-0 -top-3.5 
                                                text-gray-600 text-sm 
                                                peer-placeholder-shown:text-base 
                                                peer-placeholder-shown:text-gray-400
                                                peer-placeholder-shown:top-2 transition-all 
                                                peer-focus:-top-3.5 peer-focus:text-gray-600
                                                peer-focus:text-sm
                                                cursor-text"
                >
                Canchas:
                </label>
                {errors.courtId && (
                <p className="text-red-500 text-xs italic">{errors.courtId}</p>
                )}
            </div>
            :<div></div>
            }
            <button
              className="mt-[3rem] w-full bg-indigo-400 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Ir al reporte
            </button>
            <br />
            <br />
            
          </form>
        </div>
          
          
    </div>
  );
}