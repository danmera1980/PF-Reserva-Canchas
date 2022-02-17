import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";


function isDate(texto) {

  let partes = (texto || '').split('-').map(e => parseInt(e));
  let fecha = new Date(partes[0], --partes[1], partes[2]);
  console.log('fecha', fecha)
  let hoy = new Date (Date.now());
  
  if (partes.length === 3 && fecha
   && partes[2] === fecha.getDate()
   && partes[1] === fecha.getMonth()
   && partes[0] === fecha.getFullYear()
   && fecha.getFullYear()>=1970){
      if(fecha<=hoy){
          return 'OK'
      } return 'future';
  }
  
  return 'not_date';
}


function validate(input) {
  let errors = {};
  if(input.dateFrom!==""){
    switch(isDate(input.dateFrom)){
        case 'future':
            errors.dateFrom='La fecha no puede estar en el futuro';
            break;
        case 'not_date':
          errors.dateFrom='Inserte un formato del fecha válido. AAAA-MM-DD';
            break;
        default:
          break;
    }
  }
  if(input.dateTo!==""){
    switch(isDate(input.dateTo)){
        case 'future':
            errors.dateTo='La fecha no puede estar en el futuro';
            break;
        case 'not_date':
          errors.dateTo='Inserte un formato del fecha válido. AAAA-MM-DD';
            break;
        default:
          break;
    }
  }
  return errors;
}

export default function ReportingForm({establishmentDetail}) {
  const establishmentId  = establishmentDetail.id;
  const sites = establishmentDetail.sites

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    establishmentId: establishmentId?establishmentId:"",
  });

  const [selectedSite, setSelectedSite] = useState(sites)
  const [sports, setSports] = useState(determinateSports(selectedSite))

  function determinateSports(selectedSite){
    let allCourts = selectedSite.map(c => c.courts);
    let availableCourts=[];
    for(let i=0; i< allCourts.length; i++){
        for(let j=0; j<allCourts[i].length; j++){
            availableCourts = availableCourts.concat(allCourts[i][j])
        }   
    }
    let sports =  availableCourts.map(c => c.sport);
    let uniqueSports = [...new Set(sports)];
    return uniqueSports
  }
  
  useEffect(()=>{
    setSports(determinateSports(selectedSite))
  },[selectedSite])

  function handleChange(e) {
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
            <h3>Complete los filtros que desee</h3>
            <div className=" relative mt-8">
              <input
                className="w-full peer placeholder-transparent h-10   border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent"
                id="nombre"
                type="text"
                value={input.name}
                name="dateFrom"
                onChange={(e) => handleChange(e)}
                required
              />
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
                Desde *AAAA-MM-DD:
              </label>
              {errors.dateFrom && (
                <p className="text-xs text-red-500">{errors.dateFrom}</p>
              )}
            </div>
            <div className=" relative mt-8">
              <input
                className="w-full peer placeholder-transparent h-10   border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent"
                id="nombre"
                type="text"
                value={input.name}
                name="dateFrom"
                onChange={(e) => handleChange(e)}
                required
              />
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
                Hasta *AAAA-MM-DD:
              </label>
              {errors.dateTo && (
                <p className="text-red-500 text-xs italic">{errors.dateTo}</p>
                )}
            </div>

            <div className=" relative mt-8">
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

            <div className=" relative mt-8">
              <select
                  className="w-full peer placeholder-transparent h-10 border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent"
                  name="courtId"
                  onChange={(e) => handleSelectCourt(e)}
                  required
              >
                  <option value="">Todos los deportes</option>
                  {sports
                      ? sports.map((c) => (
                          <option value={c} key={c}>
                          {c}
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
              Deporte:
              </label>
              {errors.sport && (
              <p className="text-red-500 text-xs italic">{errors.sport}</p>
              )}
            </div>
            
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