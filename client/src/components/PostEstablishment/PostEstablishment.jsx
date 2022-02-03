import React, {useState} from "react";
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postEstablishment } from "../../redux/actions/establishment.js";
import "./PostEstablishment.scss";

function validate(input) {
 
    let errors = {};
    if(input.id !=='' && !/^[0-9\']{2,20}$/.test(input.id)) {
        errors.cuit = "Ingrese sólo números"
    }
    if(input.name !=='' && !/^[a-zA-Z0-9_\-' ':]{0,20}$/.test(input.name)) {
        errors.name = "No se permiten simbolos"
    } 
    if(input.timeActiveFrom!=='' && input.timeActiveFrom<0 ||input.timeActiveFrom>24 ) {
        errors.timeActiveFrom = "Se requiere un horario entre 0 y 24"
    }
    if (input.timeActiveTo !=='' && input.timeActiveTo<input.timeActiveFrom){
        errors.timeActiveTo = "No puede ser menor que el horario de apertura"
    }
    return errors
}

export default function PostEstablishment() {

    const userId = '35953287' // acá falta ver cómo va a venir este dato (estado global, params)

    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        id: '',
        name: "",
        logoImage: '',
        rating: '',
        timeActiveFrom: '',
        timeActiveTo: '',
        responsableId: userId

    })
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    function handleSubmit(e) {
       // console.log('soy input',input)
        e.preventDefault()
        if(!input.id || !input.name || !input.timeActiveFrom || !input.timeActiveTo || !input.responsableId || 
            errors.hasOwnProperty("id") || errors.hasOwnProperty("name") || errors.hasOwnProperty("timeActiveFrom") || 
            errors.hasOwnProperty("timeActiveTo") || errors.hasOwnProperty("responsableId")) {
                alert("Error en uno o mas campos")
            } else {
                dispatch(postEstablishment(input))
                alert("Establecimiento creado con exito")
                setInput({
                    id: '',
                    name: "",
                    logoImage: '',
                    rating: '',
                    timeActiveFrom: '',
                    timeActiveTo: '',
                    responsableId: userId

                })
                history.push("/home")
            }
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
              setInput({
                ...input,
                logoImage: response.data.data.url,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }



    return (
        <div>
            <div className="container-crear">
                <form className="formularioCrear" onSubmit={(e) => handleSubmit(e)}>
                    <div>
                    <label className="label">Cuit: </label>
                    <input className="input" placeholder="Cuit..." type="text" value={input.id} name="id" onChange={(e)=>handleChange(e)} required></input>
                    {errors.cuit ?
                    <p className="error">{errors.cuit}</p> : null
                    }
                    </div>
                    <div>
                    <label className="label">Nombre: </label>
                    <input className="input" placeholder="Nombre..." type="text" value={input.name} name="name" onChange={(e)=>handleChange(e)}required></input>
                    {errors.name ?
                    <p className="error">{errors.name}</p> : null
                    }
                    </div>
                    <div>
                    <label className="label">Logo-Imagen: </label>
                    <input className="inputForm" type="file" accept="image/*" name="logoImage" id="input_img" onChange={fileChange}/>
                    </div>
                    {/* <div>
                    <label className="label">Rating: </label>
                    <input className="input" placeholder="Rating..." type="number" value={input.rating} name="rating" onChange={(e)=>handleChange(e)}></input>
                    </div> */}
                    <div>
                    <label className="label">Horario de apertura: </label>
                    <input className="input" placeholder="Hora de apertura..." type="time" value={input.timeActiveFrom}  name="timeActiveFrom" onChange={(e)=>handleChange(e)} required></input>
                    </div>
                    {errors.timeActiveFrom ?
                    <p className="error">{errors.timeActiveFrom}</p> : null
                    }
                    <div>
                    <label className="label">Horario de cierre: </label>
                    <input className="input" placeholder="Hora de cierre..." type='time' value={input.timeActiveTo}  name="timeActiveTo" onChange={(e)=>handleChange(e)} required></input>
                    </div>
                    {errors.timeActiveTo ?
                    <p className="error">{errors.timeActiveTo}</p> : null
                    }
                    <button type="submit">Crear Establecimiento</button> 
                    <br/>
                    <Link to="/home">
                    <button>Volver</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

