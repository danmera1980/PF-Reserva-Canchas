import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postEstablishment } from "../../redux/actions/establishment.js";
import "./PostEstablishment.scss";

function validate(input) {
 
    let errors = {};
    if(input.id === '') {
        errors.id = "Se requiere un cuit"
    }
    if(input.name === '') {
        errors.name = "Se requiere un nombre de establecimiento"
    } 
    if(input.timeActiveFrom === null) {
        errors.timeActiveFrom = "Se requiere un horario de apertura"
    }
    if (input.timeActiveTo === null){
        errors.timeActiveTo = "Se requiere un horario de cierre"
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
        e.preventDefault()
        if(!input.id || !input.name || !input.timeActiveFrom || !input.timeActiveTo || !input.responsableId || 
            errors.hasOwnProperty("id") || errors.hasOwnProperty("name") || errors.hasOwnProperty("timeActiveFrom") || 
            errors.hasOwnProperty("timeActiveTo") || errors.hasOwnProperty("responsableId")) {
                alert("Faltan completar campos obligatorios")
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
    return (
        <div>
            <div className="container-crear">
                <form className="formularioCrear" onSubmit={(e) => handleSubmit(e)}>
                    <div>
                    <label className="label">Cuit: </label>
                    <input className="input" placeholder="Cuit..." type="text" value={input.id} name="id" onChange={(e)=>handleChange(e)}></input>
                    {errors.cuit ?
                    <p className="error">{errors.cuit}</p> : null
                    }
                    </div>
                    <div>
                    <label className="label">Nombre: </label>
                    <input className="input" placeholder="Nombre..." type="text" value={input.name} name="name" onChange={(e)=>handleChange(e)}></input>
                    {errors.name ?
                    <p className="error">{errors.name}</p> : null
                    }
                    </div>
                    <div>
                    <label className="label">Logo-Imagen: </label>
                    <input className="input" placeholder="Logo..." type="text" value={input.logoImage} name="logoImage" onChange={(e)=>handleChange(e)}></input>
                    </div>
                    <div>
                    <label className="label">Rating: </label>
                    <input className="input" placeholder="Rating..." type="number" value={input.rating} name="rating" onChange={(e)=>handleChange(e)}></input>
                    </div>
                    <div>
                    <label className="label">Horario de apertura: </label>
                    <input className="input" placeholder="Hora de apertura..." type="number" value={input.timeActiveFrom} name="timeActiveFrom" onChange={(e)=>handleChange(e)}></input>
                    </div>
                    {errors.timeActiveFrom ?
                    <p className="error">{errors.timeActiveFrom}</p> : null
                    }
                    <div>
                    <label className="label">Horario de cierre: </label>
                    <input className="input" placeholder="Hora de cierre..." type="number" value={input.timeActiveTo} name="timeActiveTo" onChange={(e)=>handleChange(e)}></input>
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

