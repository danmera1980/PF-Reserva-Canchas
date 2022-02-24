import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSite } from "../../redux/actions/site";
import ReactMapGL, { Marker } from "react-map-gl";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Map from "../Map/Map";

function validate(input) {
  let errors = {};
  if (input.name !== "" && !/^[a-zA-ZÀ-ÿ0-9' '\ñ\Ñ\:.]+$/.test(input.name)) {
    errors.name = "No se permiten simbolos";
  }
  if (input.name.length > 30) {
    errors.name = "No se permiten más de 30 caracteres";
  }
  if (input.country !== "" && !/^[a-zA-ZÀ-ÿ' '\ñ\Ñ\:.]+$/.test(input.country)) {
    errors.country = "No se permiten simbolos ni números";
  }
  if (input.country.length > 30) {
    errors.country = "No se permiten más de 30 caracteres";
  }
  if (input.city !== "" && !/^[a-zA-ZÀ-ÿ' '\ñ\Ñ\:.]+$/.test(input.city)) {
    errors.city = "No colocar símbolos ni números";
  }
  if (input.city.length > 30) {
    errors.city = "No se permiten más de 30 caracteres";
  }
  if (
    input.street !== "" &&
    !/^[a-zA-ZÀ-ÿ0-9' '\ñ\Ñ\:.]+$/.test(input.street)
  ) {
    errors.street = "No colocar símbolos";
  }
  if (input.street.length > 30) {
    errors.street = "No se permiten más de 30 caracteres";
  }
  if (input.streetNumber !== "" && input.streetNumber < 0) {
    errors.streetNumber = "No se permite numero negativo";
  }
  return errors;
}

export default function SiteCreate({ establishmentId }) {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.register.userToken);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    establishmentId: establishmentId,
    name: "",
    country: "",
    city: "",
    street: "",
    streetNumber: "",
    latitude: 0,
    longitude: 0,
  });

  const [viewport, setViewport] = useState({
    latitude: -64.19450712912459,
    longitude:-31.408336004083672,
    width: "100%",
    height: "20rem",
    zoom: 12,
    pitch: 50,
  });
  const [longLat, setLongLat] = useState([
    -31.408336004083672, -64.19450712912459
  ]);

  function handleDrag(getLngLat) {
    if(getLngLat.lngLat){
      setInput({
        ...input,
        longitude: getLngLat.lngLat[0],
        latitude: getLngLat.lngLat[1],
      });
      console.log(input)
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setViewport({
        ...viewport,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setLongLat([position.coords.longitude, position.coords.latitude]);
      setInput({
        ...input,
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input.establishmentId]);

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
  function handleSubmit(e) {
    e.preventDefault();
    if (
      !input.name ||
      !input.country ||
      !input.city ||
      !input.street ||
      !input.streetNumber ||
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
      console.log("input del sitecreate", input);
      dispatch(postSite(input, userToken));
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
  console.log(input, "input");
  return (
    <div className="max-w-xs sm:max-w-none m-auto">
      <div className="flex flex-col justify-center text-black">
        <form
          className="w-full justify-center items-center border-grey-400 border-2 bg-white drop-shadow-md backdrop-blur-3xl rounded-md px-3 py-3"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="relative">
            <input
              id="name"
              className="w-full peer placeholder-transparent h-10 border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent"
              placeholder="Nombre..."
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
              required
            ></input>
            <label
              className="absolute left-0 -top-3.5 
                                            text-gray-600 text-sm 
                                            peer-placeholder-shown:text-base 
                                            peer-placeholder-shown:text-gray-400
                                            peer-placeholder-shown:top-2 transition-all 
                                            peer-focus:-top-3.5 peer-focus:text-gray-600
                                            peer-focus:text-sm
                                            cursor-text"
              htmlFor="name"
            >
              Nombre{" "}
            </label>
            {errors.name ? (
              <p className="text-red-500 text-xs italic">{errors.name}</p>
            ) : null}
          </div>
          <div className="relative mt-3">
            <input
              id="pais"
              className="w-full peer placeholder-transparent h-10   border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent"
              placeholder="pais..."
              type="text"
              value={input.country}
              name="country"
              onChange={(e) => handleChange(e)}
              required
            ></input>
            <label
              className="absolute left-0 -top-3.5 
                                            text-gray-600 text-sm 
                                            peer-placeholder-shown:text-base 
                                            peer-placeholder-shown:text-gray-400
                                            peer-placeholder-shown:top-2 transition-all 
                                            peer-focus:-top-3.5 peer-focus:text-gray-600
                                            peer-focus:text-sm
                                            cursor-text"
              htmlFor="pais"
            >
              Pais{" "}
            </label>
            {errors.country ? (
              <p className="text-red-500 text-xs italic">{errors.country}</p>
            ) : null}
          </div>

          <div className="relative mt-3">
            <input
              id="city"
              className=" w-full peer placeholder-transparent h-10 border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent"
              placeholder="Ciudad..."
              type="text"
              value={input.city}
              name="city"
              onChange={(e) => handleChange(e)}
              required
            ></input>
            <label
              className="absolute left-0 -top-3.5 
                                            text-gray-600 text-sm 
                                            peer-placeholder-shown:text-base 
                                            peer-placeholder-shown:text-gray-400
                                            peer-placeholder-shown:top-2 transition-all 
                                            peer-focus:-top-3.5 peer-focus:text-gray-600
                                            peer-focus:text-sm
                                            cursor-text"
              htmlFor="city"
            >
              Ciudad{" "}
            </label>
            {errors.city ? (
              <p className="text-red-500 text-xs italic">{errors.city}</p>
            ) : null}
          </div>

          <div className="relative mt-3">
            <input
              id="calle"
              className="w-full peer placeholder-transparent h-10 border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent"
              placeholder="Calle..."
              type="text"
              value={input.street}
              name="street"
              onChange={(e) => handleChange(e)}
              required
            ></input>
            <label
              className="absolute left-0 -top-3.5 
                                            text-gray-600 text-sm 
                                            peer-placeholder-shown:text-base 
                                            peer-placeholder-shown:text-gray-400
                                            peer-placeholder-shown:top-2 transition-all 
                                            peer-focus:-top-3.5 peer-focus:text-gray-600
                                            peer-focus:text-sm
                                            cursor-text"
              htmlFor="calle"
            >
              Calle{" "}
            </label>

            {errors.street ? (
              <p className="text-red-500 text-xs italic">{errors.street}</p>
            ) : null}
          </div>
          <div className="relative mt-3">
            <input
              className="w-full peer placeholder-transparent h-10 border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent"
              placeholder="Numero de calle..."
              type="number"
              value={input.streetNumber}
              name="streetNumber"
              id="numC"
              onChange={(e) => handleChange(e)}
              required
            ></input>
            <label
              className="absolute left-0 -top-3.5 
                                            text-gray-600 text-sm 
                                            peer-placeholder-shown:text-base 
                                            peer-placeholder-shown:text-gray-400
                                            peer-placeholder-shown:top-2 transition-all 
                                            peer-focus:-top-3.5 peer-focus:text-gray-600
                                            peer-focus:text-sm
                                            cursor-text"
              htmlFor="numC"
            >
              Numero de calle{" "}
            </label>

            {errors.streetNumber ? (
              <p className="text-red-500 text-xs italic">
                {errors.streetNumber}
              </p>
            ) : null}
          </div>

          <button
            className="mt-[3rem] w-full bg-indigo-400 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Crear tu sede
          </button>
          <br />
          <br />
          <div className="">
            <h1 className="dark:text-white border-2 border-cyan-200 text-center dark:bg-darkSecondary py-2 mb-3">
              Selecciona la ubicación de la sede en el mapa
            </h1>
            <Map
              location={[-64.19450712912459, -31.408336004083672]}
              draggable={true}
              handleDrag={handleDrag}
              markers={{
                features: [
                  {
                    type: "Feature",
                    properties: {
                      establishment: "",
                      site: "",
                      court: "",
                      address: "",
                      sport: "deporte",
                      price: "",
                    },
                    geometry: {
                      coordinates:[-64.19450712912459, -31.408336004083672],
                      type: "Point",
                    },
                  },
                ],
              }}

            />
            {/* <ReactMapGL
              {...viewport}
              onViewportChange={newView => setViewport(newView)}
              mapboxApiAccessToken={mapboxToken}
              mapStyle={MapStyle}
            >
              <Marker draggable={true} onDragEnd={getLngLat => handleDrag(getLngLat)} latitude={input.latitude} longitude={input.longitude}>
                <FontAwesomeIcon icon={faMapMarkerAlt} color='red' size='2x'/>
              </Marker>
            </ReactMapGL> */}
          </div>
        </form>
      </div>
    </div>
  );
}
