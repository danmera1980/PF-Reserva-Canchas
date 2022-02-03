import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postSite } from "../../redux/actions/site";
import { getEstablishmentByUser} from "../../redux/actions/forms";

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
    const establishments = useSelector(state => state.forms.establishmentByUser)

    let userId = '35953287';

    useEffect(()=>{
        dispatch((getEstablishmentByUser(userId)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userId])


    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        establishmentId: "",
        name: "",
        country: "",
        city: "",
        street: "",
        streetNumber: "",
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
        establishmentId: "",
        name: "",
        country: "",
        city: "",
        street: "",
        streetNumber: "",
        })
        history.push("/site")
    }
    }
    return (
        <div>
            <div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label className="label" >Establecimiento:</label> 
                        <select className="inputForm" name='establishmentId' onChange={(e) => handleChange(e)} >
                                    
                        <option value=''> </option>
                            {establishments.map((c) => (
                                    <option value={c.id} key={c.id}>{c.name}</option>
                            ))}
                        </select>
                        {errors.establishment&& (
                            <p  className='error' >{errors.siteId}</p>
                        )}
                    </div>
                    <div>
                        <label>Nombre: </label>
                        <input placeholder="Nombre..." type="text" value={input.name} name="name" onChange={(e)=>handleChange(e)}></input>
                        {errors.name ?
                        <p className="error">{errors.name}</p> : null
                        }
                    </div>
                    <div>
                        <label>Pais: </label>
                        <input placeholder="pais..." type="text" value={input.country} name="country" onChange={(e)=>handleChange(e)}></input>
                        {errors.country ?
                        <p className="error">{errors.country}</p> : null
                        }
                    </div>
                    <div>
                        <label>Ciudad: </label>
                        <input placeholder="Ciudad..." type="text" value={input.city} name="city" onChange={(e)=>handleChange(e)}></input>
                        {errors.city ?
                        <p className="error">{errors.city}</p> : null
                        }
                    </div>
                    <div>
                        <label>Calle: </label>
                        <input placeholder="Calle..." type="text" value={input.street} name="street" onChange={(e)=>handleChange(e)}></input>
                        {errors.street ?
                        <p className="error">{errors.street}</p> : null
                        }
                    </div>
                    <div>
                        <label>Numero de calle: </label>
                        <input placeholder="Numero de calle..." type="number" value={input.streetNumber} name="streetNumber" onChange={(e)=>handleChange(e)}></input>
                        {errors.streetNumber ?
                        <p className="error">{errors.streetNumber}</p> : null
                        }
                    </div>
                    <button type="submit">Crear tu sede</button> 
                    <br/>
                    <Link to="/home">
                    <button>Volver</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}
