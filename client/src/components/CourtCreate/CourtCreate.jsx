import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { postCourt } from "../../redux/actions/court";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";
import { SERVER_URL } from "../../redux/actions/actionNames";

function validate(input) {
  let errors = {};
  if (input.name !== "" && !/^[a-zA-ZÀ-ÿ0-9' 'ñÑ:.]+$/.test(input.name)) {
    errors.name = "No se permiten símbolos";
  }
  if (input.name.length>20) {
    errors.name = "No se permiten más de 20 caracteres";
  }

  if (input.description !== "" && !/^[a-zA-ZÀ-ÿ0-9' 'ñÑ,:.]+$/.test(input.description)) {
    errors.description = "No se permiten símbolos";
  }
  if (input.description.length>100) {
    errors.description = "No se permiten más de 100 caracteres";
  }
  if (input.sport !== "" && !input.sport) {
    errors.sport = "Selecciona un deporte";
  }

  if (input.price !== "" && input.price < 10) {
    errors.price = "El precio tiene que ser igual o mayor a 10";
  }

  return errors;
}

export default function CourtCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const userToken = useSelector((state) => state.register.userToken);
  const [establishmentDetail, setEstablishmentDetail] = useState(null);
  const [sites, setSites] = useState([]);

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

  const [input, setInput] = useState({
    name: "",
    description: "",
    shiftLength: "60",
    price: "",
    sport: "",
    image: [],
    siteId: "",
  });
  const [uploadPercentage, setUploadPercentage] = useState({
    uploadPercentage: 0,
  });

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
          setInput((prevInput) => ({
            ...input,
            image: [...prevInput.image, response.data.data.url],
          }));
          setUploadPercentage({ uploadPercentage: 0 });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  function handleSelectSport(e) {
    setInput({
      ...input,
      sport: e.target.value,
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
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

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

  function handleDeleteImage(e) {
    setInput({
      ...input,
      image: input.image.filter((image) => image !== e),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(
      validate({
        ...input,
      })
    );
    if (Object.keys(errors).length !== 0) {
      alert("completar los campos correctamente");
    } else {
      dispatch(postCourt(input, userToken));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cancha creada con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
      setInput({
        name: "",
        description: "",
        shiftLength: "60",
        price: "",
        sport: "",
        image: [],
        siteId: "",
      });
      history.push("/establishmentprofile");
      window.location.reload();
    }
  }

  return (
    <div>
      <div className="max-w-xs sm:max-w-none m-auto">
        <div className="flex justify-center text-black">
          <form
            className="w-full flex-col justify-center items-center border-grey-400 border-2 bg-white drop-shadow-md backdrop-blur-3xl rounded-md px-3 py-3"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex gap-2 overflow-x-auto overflow-y-hidden">
              {input.image.length
                ? input.image.map((e) => {
                    return (
                      <div key={e}>
                        <img
                          className="w-36 h-36 object-cover rounded-full"
                          src={e}
                          alt="not found"
                          key={e}
                        />
                        <button
                          onClick={() => handleDeleteImage(e)}
                          className="sticky cursor-pointer text-red-400 hover:text-red-600 hover:scale-150 transition-all ml-[8.5rem] bottom-40 scale-125"
                        >
                          X
                        </button>
                      </div>
                    );
                  })
                : null}
              {uploadPercentage.uploadPercentage > 0 && (
                <ReactLoading
                  type={"spin"}
                  color={"#000000"}
                  height={"8.5rem"}
                  width={"8.5rem"}
                />
              )}
            </div>

            <div className=" relative mt-10">
              <input
                className="w-full peer placeholder-transparent h-10   border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent"
                id="nombre"
                type="text"
                value={input.name}
                name="name"
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
                Nombre cancha:
              </label>
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name}</p>
              )}
            </div>
            <div className="relative mt-3">
              <input
                className="w-full peer placeholder-transparent h-10   border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent"
                type="text"
                value={input.description}
                name="description"
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
                Descripción:
              </label>

              {errors.description && (
                <p className="text-xs text-red-500">{errors.description}</p>
              )}
            </div>

            <div className="relative mt-3">
              <input
                className="w-full peer placeholder-transparent h-10   border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent"
                type="number"
                value={input.price}
                min={10}
                step={10}
                name="price"
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
                Precio (por turno):
              </label>

              {errors.price && (
                <p className="text-xs text-red-500">{errors.price}</p>
              )}
            </div>
            <div className="relative mt-3">
              <div className="relative">
                <select
                  className="w-full peer placeholder-transparent h-10   border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent"
                  name="sport"
                  onChange={(e) => handleSelectSport(e)}
                  required
                >
                  <option value="">Seleccioná un deporte</option>
                  <option value="Basquet">Basquet</option>
                  <option value="Futbol 11">Futbol 11</option>
                  <option value="Futbol 7">Futbol 7</option>
                  <option value="Futbol 5">Futbol 5</option>
                  <option value="Handbol">Handbol</option>
                  <option value="Padel">Padel</option>
                  <option value="Squash">Squash</option>
                  <option value="Tenis">Tenis</option>
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
              </div>

              {errors.sport && (
                <p className="text-xs text-red-500">{errors.sport}</p>
              )}
            </div>
            <div className="mb-4 relative mt-3 bg-indigo-400 text-center hover:bg-indigo-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              <input
                className="absolute top-0 right-0 left-0 bottom-0 w-full h-full opacity-0"
                type="file"
                accept="image/*"
                name="image"
                id="input_img"
                onChange={fileChange}
                multiple
              />
              <label className="text-white" htmlFor="input_img">
                Agregar Imágenes
              </label>
              {errors.image && (
                <p className="'text-xs text-red-500">{errors.image}</p>
              )}
            </div>
            <div className="relative mt-3">
              <select
                className="w-full peer placeholder-transparent h-10 border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent"
                name="sites"
                onChange={(e) => handleSelectSite(e)}
                required
              >
                <option value="">Seleccioná una sede</option>
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
            <br />
            <div>
              <button
                className="mt-5 w-full bg-indigo-400 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Crear Cancha
              </button>
              <br />
              <br />
            </div>
            <div className="relative">
              <h1 className="bg-transparent italic">
                La duración del turno es de 60 minutos
              </h1>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
