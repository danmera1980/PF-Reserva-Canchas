import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postSite } from "../../redux/actions/site";

function validate(input) {
 
    let errors = {};
    if(input.name === '') {
        errors.name = "Se requiere un nombre"
    }
    if(input.country === '') {
        errors.country = "Se requiere un pais"
    } 
    if(input.city === '') {
        errors.city = "Se requiere una ciudad"
    }
    if (input.street === ''){
        errors.street = "Se requiere un nombre de calle"
    }
    if(input.streetNumber === '') {
        errors.streetNumber = "Se requiere el numero de la calle"
    }
    return errors
}

export default function SiteCreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        country: "",
        city: "",
        street: "",
        streetNumber: null,
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
        if(!input.name || !input.country || !input.city || !input.street || !input.streetNumber ||
            errors.hasOwnProperty("name") || errors.hasOwnProperty("country") || 
            errors.hasOwnProperty("city") || errors.hasOwnProperty("street") || errors.hasOwnProperty("streetNumber")) {
                alert("Faltan completar campos obligatorios")
            } else {
        dispatch(postSite(input))
        alert("Sede creada con exito")
        setInput({
        name: "",
        country: "",
        city: "",
        street: "",
        streetNumber: null,
        })
        history.push("/site")
    }
    }
    return (
        <div>
            <div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label>Nombre: </label>
                        <input placeholder="Nombre..." type="text" value={input.name} name="name" onChange={(e)=>handleChange(e)}></input>
                    </div>
                    <div>
                        <label>Pais: </label>
                        <input placeholder="pais..." type="text" value={input.country} name="country" onChange={(e)=>handleChange(e)}></input>
                    </div>
                    <div>
                        <label>Ciudad: </label>
                        <input placeholder="Ciudad..." type="text" value={input.city} name="city" onChange={(e)=>handleChange(e)}></input>
                    </div>
                    <div>
                        <label>Calle: </label>
                        <input placeholder="Calle..." type="text" value={input.street} name="street" onChange={(e)=>handleChange(e)}></input>
                    </div>
                    <div>
                        <label>Numero de calle: </label>
                        <input placeholder="Numero de calle..." type="text" value={input.streetNumber} name="streetNumber" onChange={(e)=>handleChange(e)}></input>
                    </div>
                    <button type="submit">Crear tu sede</button> 
                    <br/>
                    <Link to="/home">
                    <button>Cargaste todas?</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}