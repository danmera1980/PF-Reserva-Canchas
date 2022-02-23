import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { SERVER_URL } from "../../redux/actions/actionNames";
import axios from "axios";


export default function ReportingForm() {
  const history = useHistory();
  const userToken = useSelector((state) => state.register.userToken);
  const [establishmentDetail, setEstablishmentDetail] = useState(null);
  const [sites, setSites] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    establishmentId: establishmentDetail?establishmentDetail.id:"",
    dateFrom:"",
    dateTo:"",
    siteId:"",
    sport:"",
  });

  const [selectedSite, setSelectedSite] = useState(sites)
  const [sports, setSports] = useState(determinateSports(selectedSite))


  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    axios
      .get(`${SERVER_URL}/establishment/idUser`, { headers: headers })
      .then((res) => {
        setEstablishmentDetail(res.data);
      })
  }, [userToken]);

  useEffect(()=>{
    if(establishmentDetail){
      setSites(establishmentDetail.sites.filter((e) => e.isActive === true))
    }
  },[establishmentDetail])



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
  }
     
  function handleSelectSite(e) {
    setInput({
      ...input,
      siteId: e.target.value,
    });
    if(e.target.value===""){
        setSelectedSite(sites);
    }else{
        setSelectedSite(sites.filter(site => site.id===e.target.value))
    }
  }

  function handleSelectCourt(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      errors.hasOwnProperty("dateFrom") ||
      errors.hasOwnProperty("dateTo")
    ) {
      Swal.fire({
        icon: "error",
        text: "No se pueden ingresar fechas futuras",
      });
    } else {
      axios.get(`${SERVER_URL}/booking/byEstab/${input.establishmentId}?dateFrom=${input.dateFrom}&dateTo=${input.dateTo}&siteId=${input.siteId}&sport=${input.sport}`)
        .then(response => history.push(
          {
            pathname: '/reportingResults',
            state: {data: response.data, establishmentDetail:establishmentDetail}
          }
        ))
        
      
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
            <div className="relative mt-8">
              <input
                className="w-full peer placeholder-transparent h-10 border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent"
                id="nombre"
                type="date"
                value={input.name}
                name="dateFrom"
                onChange={(e) => handleChange(e)}
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
                Desde:
              </label>
              {errors.dateFrom && (
                <p className="text-xs text-red-500">{errors.dateFrom}</p>
              )}
            </div>
            <div className=" relative mt-8">
              <input
                className="w-full peer placeholder-transparent h-10   border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent"
                id="nombre"
                type="date"
                value={input.name}
                name="dateTo"
                onChange={(e) => handleChange(e)}
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
                Hasta:
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
                >
                    <option value="">Todas las sedes</option>
                    {sites === null
                        ? ""
                        : sites.map((c) => (c.isActive===false?null:
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
                  name="sport"
                  onChange={(e) => handleSelectCourt(e)}
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
            <div>
                <button
                className="mt-[3rem] w-full bg-indigo-400 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                >
                  Ir al reporte
                </button>
            </div>
            <br />
            <br />
            
          </form>
        </div>
          
          
    </div>
  );
}