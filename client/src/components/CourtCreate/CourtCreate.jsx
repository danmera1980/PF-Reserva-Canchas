import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { postCourt } from "../../redux/actions/users";
import { useDispatch, useSelector } from "react-redux";
import "./CourtCreate.scss";

function validate(input) {
  let errors = {};
  if (!/^[a-zA-Z0-9_\-' ']{2,20}$/.test(input.name)) {
    errors.name =
      "Se requieren entre 2 y 20 caracteres, no se permiten símbolos";
  }

  if (!input.description) {
    errors.description = "Se requiere una descripción";
  }
  if (!input.sport) {
    errors.sport = "Selecciona un deporte";
  }

  return errors;
}

export default function CourtCreate() {
  const dispatch = useDispatch();
  //  const sedes = useSelector ((state) => state.sedes)
  const history = useHistory();
  const [errors, setErrors] = useState({});

    const [input,setInput] = useState({
        name:'',
        description:'',
        shiftLength:'',
        price:'',
        sport:'',
        image:[],
        sede:'',
    
    })
    
    function handleSelectSport(e){
        setInput({
            ...input,
            sport: e.target.value
        });
        setErrors(validate({
              ...input,
              [e.target.name]: e.target.value
          }))
    }
    function handleSelectSede(e){
        setInput({
            ...input,
            sede: e.target.value
        });
        setErrors(validate({
              ...input,
              [e.target.name]: e.target.value
          }))
    }

  function fileChange() {
    let photos = document.getElementById("input_img");
    Array.from(photos.files).map(async (photo) => {
      const body = new FormData();
      body.set("key", "64fe53bca6f3b1fbb64af506992ef957");
      body.append("image", photo);

      await axios({
        method: "post",
        url: "https://api.imgbb.com/1/upload",
        data: body,
      })
        .then((response) => {
          setInput((prevInput) => ({
            ...input,
            image: [...prevInput.image, response.data.data.url],
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    });
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

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postCourt(input));
    alert("Cancha Creada!!");
    setInput({
      name: "",
      description: "",
      shiftLength: "",
      price: "",
      sport: "",
      image: [],
      sede: "",
    });
    history.push("./home");
  }

  // useEffect(() => {
  //     dispatch(getSedes());
  // },[])
  return (
    <div className="containerCreateCourt box-border">
      <Link to="/home">
        <button className="btnBack">Volver</button>{" "}
      </Link>
      <h1 className="title">Crea una Cancha</h1>
      <div className="create">
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label className="text-black">Nombre cancha:</label>
            <input
              className="inputForm"
              id="nombre"
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />

            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div>
            <label className="text-black">Descripción:</label>
            <input
              className="inputForm"
              type="text"
              value={input.description}
              name="description"
              onChange={(e) => handleChange(e)}
            />
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
          </div>
          <div>
            <label className="text-black">Duración del turno (minutos):</label>
            <input
              className="inputForm"
              type="text"
              value={input.shiftLength}
              name="shiftLength"
              onChange={(e) => handleChange(e)}
            />
            {errors.shiftLength && (
              <p className="error">{errors.shiftLength}</p>
            )}
          </div>
          <div>
            <label className="text-black">Precio (por turno):</label>
            <input
              className="inputForm"
              type="number"
              value={input.price}
              name="price"
              onChange={(e) => handleChange(e)}
            />
            {errors.price && <p className="error">{errors.price}</p>}
          </div>
          <div>
            <label className="text-black">Deporte:</label>
            <select
              className="inputForm"
              name="sport"
              onChange={(e) => handleSelectSport(e)}
            >
              <option value=""></option>
              <option value="Basquet">Basquet</option>
              <option value="Futbol 11">Futbol 11</option>
              <option value="Futbol 7">Futbol 7</option>
              <option value="Futbol 5">Futbol 5</option>
              <option value="Handbol">Handbol</option>
              <option value="Padel">Padel</option>
              <option value="Squash">Squash</option>
              <option value="Tenis">Tenis</option>
            </select>
            {errors.sport && <p className="error">{errors.sport}</p>}
          </div>
          <label className="text-black">Imágenes:</label>

          <input
            className="inputForm"
            type="file"
            accept="image/*"
            name="image"
            id="input_img"
            onChange={fileChange}
            multiple
          />
          {errors.image && <p className="error">{errors.image}</p>}
          <div>
            <label className="text-black">Sede:</label>
            <select
              className="inputForm"
              name="countries"
              onChange={(e) => handleSelectSede(e)}
            >
              <option value="caballito">caballito</option>
              {/* {establecimiento.sede.map((c) => (
                            <option value={c.name}>{c.name}</option>
                    ))} */}
            </select>
            {errors.sede && <p className="error">{errors.sede}</p>}
          </div>
          <div>
            <button className="buttonCreateCourt" type="submit">
              Crear Cancha
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
