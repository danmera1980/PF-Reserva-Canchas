import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postEstablishment } from "../../redux/actions/establishment.js";
import "./PostEstablishment.scss";

function validate(input) {
 
    let errors = {};
    if(input.cuit === '') {
        errors.cuit = "Se requiere un cuit"
    }
    if(input.name === '') {
        errors.name = "Se requiere un nombre de establecimiento"
    } 
    if(input.timeActiveFrom === '') {
        errors.timeActiveFrom = "Se requiere un horario de apertura"
    }
    if (input.timeActiveTo === ''){
        errors.timeActiveTo = "Se requiere un horario de cierre"
    }
    if(input.responsable_id === '') {
        errors.responsable_id = "Se requiere un id del usuario responsable"
    }
    return errors
}

export default function PostEstablishment() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        cuit: null,
        name: "",
        descripcion: "",
        logoImage: "",
        rating: null,
        timeActiveFrom: null,
        timeActiveTo: null,
        responsable_id: ""
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
        e.preventDefault()
        if(!input.cuit || !input.name || !input.timeActiveFrom || !input.timeActiveTo || !input.responsable_id || 
            errors.hasOwnProperty("cuit") || errors.hasOwnProperty("name") || errors.hasOwnProperty("timeActiveFrom") || 
            errors.hasOwnProperty("timeActiveTo") || errors.hasOwnProperty("responsable_id")) {
                alert("Faltan completar campos obligatorios")
            } else {
        dispatch(postEstablishment(input))
        alert("Establecimiento creado con exito")
        setInput({
        cuit: null,
        name: "",
        descripcion: "",
        logoImage: "",
        rating: null,
        timeActiveFrom: null,
        timeActiveTo: null,
        responsable_id: ""
        })
        history.push("/home")
    }
    }
    return (
        <div>
            <div className="container-crear">
                <form className="formularioCrear" onSubmit={(e) => handleSubmit(e)}>
                    <div>
                    <label>Cuit: </label>
                    <input className="input" placeholder="Cuit..." type="text" value={input.cuit} name="cuit" onChange={(e)=>handleChange(e)}></input>
                    {errors.cuit ?
                    <p className="error">{errors.cuit}</p> : null
                    }
                    </div>
                    <div>
                    <label>Nombre: </label>
                    <input className="input" placeholder="Nombre..." type="text" value={input.name} name="name" onChange={(e)=>handleChange(e)}></input>
                    {errors.name ?
                    <p className="error">{errors.name}</p> : null
                    }
                    </div>
                    <div>
                    <label>Descripcion: </label>
                    <input className="input" placeholder="Descripcion..." type="text" value={input.descripcion} name="descripcion" onChange={(e)=>handleChange(e)}></input>
                    </div>
                    <div>
                    <label>Logo-Imagen: </label>
                    <input className="input" placeholder="Logo..." type="text" value={input.logoImage} name="logoImage" onChange={(e)=>handleChange(e)}></input>
                    </div>
                    <div>
                    <label>Rating: </label>
                    <input className="input" placeholder="Rating..." type="text" value={input.rating} name="rating" onChange={(e)=>handleChange(e)}></input>
                    </div>
                    <div>
                    <label>Horario de apertura: </label>
                    <input className="input" placeholder="Hora de apertura..." type="text" value={input.timeActiveFrom} name="timeActiveFrom" onChange={(e)=>handleChange(e)}></input>
                    </div>
                    {errors.timeActiveFrom ?
                    <p className="error">{errors.timeActiveFrom}</p> : null
                    }
                    <div>
                    <label>Horario de cierre: </label>
                    <input className="input" placeholder="Hora de cierre..." type="text" value={input.timeActiveTo} name="timeActiveTo" onChange={(e)=>handleChange(e)}></input>
                    </div>
                    {errors.timeActiveTo ?
                    <p className="error">{errors.timeActiveTo}</p> : null
                    }
                    <div>
                    <label>Numero de usuario responsable: </label>
                    <input className="input" placeholder="Numero(id) del usuario responsable..." type="text" value={input.responsable_id} name="responsable_id" onChange={(e)=>handleChange(e)}></input>
                    {errors.responsable_id ?
                    <p className="error">{errors.responsable_id}</p> : null
                    }
                    </div>
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

