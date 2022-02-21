import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postEstablishment } from "../../redux/actions/establishment.js";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";
import "./PostEstablishment.scss";
import Header from "../Header/Header.jsx";
import { useEffect } from "react";
import { SERVER_URL } from "../../redux/actions/actionNames.js";

export default function PostEstablishment() {
  function validate(input) {
    let errors = {};

    if (input.cuit !== "" && !/^[0-9']{2,20}$/.test(input.cuit)) {
      errors.cuit = "Ingrese sólo números";
    }
    if (input.cuit.length !== 11) {
      errors.cuit = "El cuit debe tener 11 dígitos";
    }
    if (cuitInDb) {
      errors.cuit = "Cuit ya ingresado en la base de datos";
    }
    if (input.name !== "" && !/^[a-zA-Z0-9_\-' ':]{1,40}$/.test(input.name)) {
      errors.name = "No se permiten símbolos";
    }
    if (
      input.timeActiveFrom !== "" &&
      (input.timeActiveFrom < 0 || input.timeActiveFrom > 24)
    ) {
      errors.timeActiveFrom = "Se requiere un horario entre 0 y 24";
    }
    if (
      input.timeActiveTo !== "" &&
      input.timeActiveTo < input.timeActiveFrom
    ) {
      errors.timeActiveTo = "No puede ser menor que el horario de apertura";
    }
    return errors;
  }

  const userToken = useSelector((state) => state.register.userToken);

  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    cuit: "",
    name: "",
    logoImage: "",
    timeActiveFrom: "",
    timeActiveTo: "",
  });
  const [uploadPercentage, setUploadPercentage] = useState({
    uploadPercentage: 0,
  });
  const [cuitInDb, setCuitInDb] = useState(null);

  useEffect(() => {
    if (input.cuit) {
      axios
        .get(`${SERVER_URL}/establishment/cuitInDb`, {
          params: { cuit: input.cuit },
        })
        .then((res) => {
          setCuitInDb(res.data);
        });
    }
  }, [input.cuit]);

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
      errors.hasOwnProperty("cuit") ||
      errors.hasOwnProperty("name") ||
      errors.hasOwnProperty("timeActiveFrom") ||
      errors.hasOwnProperty("timeActiveTo")
    ) {
      Swal.fire({
        icon: "error",
        text: "Faltan completar campos obligatorios",
      });
    } else {
      dispatch(postEstablishment(input, userToken));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Establecimiento creado con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
      setInput({
        cuit: "",
        name: "",
        logoImage: "",
        timeActiveFrom: "",
        timeActiveTo: "",
      });
      history.push("/establishmentprofile");
      window.location.reload();
    }
  }

  function fileChange() {
    let photos = document.getElementById("input_img");
    Array.from(photos.files).map(async (photo) => {
      const body = new FormData();
      body.set("key", "64fe53bca6f3b1fbb64af506992ef957");
      body.append("image", photo);

      const options = {
        onUploadProgress: (ProgressEvent) => {
          const { loaded, total } = ProgressEvent;
          let percent = Math.floor((loaded * 100) / total);
          if (percent < 100) {
            setUploadPercentage({
              ...uploadPercentage,
              uploadPercentage: percent,
            });
          }
        },
      };

      await axios
        .post("https://api.imgbb.com/1/upload", body, options)
        .then((response) => {
          setInput({
            ...input,
            logoImage: response.data.data.url,
          });
          setUploadPercentage({ uploadPercentage: 0 });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  return (
    <div>
      <Header />
      {!userToken ? (
        Swal.fire({
          title: "Debes iniciar sesión para crear un establecimiento",
          timer: 3000,
          text: "Serás redirigido al inicio de sesión",
          timerProgressBar: true,
          willClose: () => {
            history.push("/login");
            window.location.reload();
          },
        })
      ) : (
        <div className=" flex justify-center">
          <form
            className="w-4/5 lg:w-2/5 flex-col justify-center items-center mx-5 border-grey-400 border-2 mt-10 bg-white drop-shadow-md backdrop-blur-3xl rounded-md px-3 py-3 "
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex place-content-center">
              {input.logoImage ? (
                <img
                  className="w-36 h-36 bg-cover rounded-full"
                  src={input.logoImage}
                  alt="logo_usr"
                />
              ) : null}

              {uploadPercentage.uploadPercentage > 0 && (
                <ReactLoading
                  type={"spin"}
                  color={"#000000"}
                  height={"8.5rem"}
                  width={"8.5rem"}
                />
              )}
            </div>

            <div className="relative mt-5">
              <input
                id="cuit"
                className="w-full peer placeholder-transparent h-10 border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent"
                placeholder="Cuit..."
                type="text"
                value={input.cuit}
                name="cuit"
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
                htmlFor="cuit"
              >
                Cuit{" "}
              </label>

              {errors.cuit ? (
                <p className="text-red-500 text-xs italic">{errors.cuit}</p>
              ) : null}
            </div>

            <div className="relative mt-3">
              <input
                id="name"
                className="w-full peer placeholder-transparent h-10   border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent"
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
                Nombre:{" "}
              </label>

              {errors.name ? (
                <p className="text-red-500 text-xs italic">{errors.name}</p>
              ) : null}
            </div>

            <div className="mb-4 relative mt-3 bg-indigo-400 text-center hover:bg-indigo-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              <input
                className=" absolute top-0 right-0 left-0 bottom-0 w-full h-full opacity-0"
                type="file"
                accept="image/*"
                name="logoImage"
                id="input_img"
                onChange={fileChange}
              ></input>
              <label className="text-white" htmlFor="input_imp">
                {input.logoImage ? "Cambiar logo" : "Añadir logo"}
              </label>
            </div>

            <div className="relative mt-5">
              <input
                id="abrir"
                className="peer placeholder-transparent h-10 w-full  border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent"
                placeholder="Hora de apertura..."
                type="time"
                value={input.timeActiveFrom}
                name="timeActiveFrom"
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
                htmlFor="abrir"
              >
                Horario de apertura{" "}
              </label>

              {errors.timeActiveFrom ? (
                <p className="text-red-500 text-xs italic">
                  {errors.timeActiveFrom}
                </p>
              ) : null}
            </div>

            <div className="relative mt-5">
              <input
                id="cerrar"
                className="peer placeholder-transparent h-10 w-full  border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent"
                placeholder="Hora de cierre..."
                type="time"
                value={input.timeActiveTo}
                name="timeActiveTo"
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
                htmlFor="cerrar"
              >
                Horario de cierre{" "}
              </label>
            </div>

            {errors.timeActiveTo ? (
              <p className="text-red-500 text-xs italic">
                {errors.timeActiveTo}
              </p>
            ) : null}
            <button
              className="w-full bg-indigo-400 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Crear Establecimiento
            </button>
            <br />

            <br />
            <Link to={"/profile"}>
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full">
                Volver
              </button>
            </Link>
          </form>
        </div>
      )}
    </div>
  );
}
