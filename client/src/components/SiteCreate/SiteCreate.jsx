import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postSite } from "../../redux/actions/site";

import Swal from 'sweetalert2';

import { getEstablishmentByUser} from "../../redux/actions/forms";


function validate(input) {
 
    let errors = {};
    if(input.name !=='' && !/^[a-zA-Z0-9' ':.]{1,30}$/.test(input.name)) {
        errors.name = "No se permiten simbolos"
    }
    if(input.country !=='' && !/^[a-zA-Z0-9' ']{1,30}$/.test(input.country)) {
        errors.country = "No se permiten simbolos"
    } 
    if(input.city !=='' && !/^[a-zA-Z0-9' ']{1,30}$/.test(input.city)) {
        errors.city = "Se requiere una ciudad"
    }
    if (input.street !=='' && !/^[a-zA-Z0-9' ':.]{1,30}$/.test(input.street)){
        errors.street = "Se requiere un nombre de calle"
    }
    if(input.streetNumber !=='' && input.streetNumber<0) {
        errors.streetNumber = "No se permite numero negativo"
    }
    return errors
}

export default function SiteCreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const establishmentId = useSelector(state => state.forms.establishmentId)
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        establishmentId: '',
        name: "",
        country: "",
        city: "",
        street: "",
        streetNumber: "",
    })

    let userId = 1;

    useEffect(()=>{
        setInput({
            ...input,
            establishmentId: establishmentId,
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[establishmentId])

    useEffect(()=>{
        dispatch((getEstablishmentByUser(userId)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userId])


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
                Swal.fire({
                    icon: 'error',
                    text: 'Faltan completar campos obligatorios'
                  })
            } else {
        dispatch(postSite(input))
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Sede creada con exito',
            showConfirmButton: false,
            timer: 1500
          })
        setInput({
        establishmentId: establishmentId,
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
            <div className="lg: flex justify-center">
                <form className=" mx-5 w-full max-w-lg " onSubmit={(e) => handleSubmit(e)}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2">Nombre: </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder="Nombre..." type="text" value={input.name} name="name" onChange={(e)=>handleChange(e)} required></input>
                            {errors.name ?
                            <p className="text-red-500 text-xs italic">{errors.name}</p> : null
                            }
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="tracking-wide text-gray-700 text-xs font-bold mb-2">Pais: </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="pais..." type="text" value={input.country} name="country" onChange={(e)=>handleChange(e)} required></input>
                        {errors.country ?
                        <p className="text-red-500 text-xs italic">{errors.country}</p> : null
                        }
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                            <label  className="tracking-wide text-gray-700 text-xs font-bold mb-2">Ciudad: </label>
                            <input className=" appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Ciudad..." type="text" value={input.city} name="city" onChange={(e)=>handleChange(e)} required></input>
                            {errors.city ?
                            <p className="text-red-500 text-xs italic">{errors.city}</p> : null
                            }
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2">Calle: </label>
                            <input className="md:w-full block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Calle..." type="text" value={input.street} name="street" onChange={(e)=>handleChange(e)} required></input>

                    
                            {errors.street ?
                            <p className="text-red-500 text-xs italic">{errors.street}</p> : null
                            }
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2">Numero de calle: </label>
                            
                            <input className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Numero de calle..." type="text" value={input.streetNumber} name="streetNumber" onChange={(e)=>handleChange(e)} required></input>

                    
                            {errors.streetNumber ?
                            <p className="text-red-500 text-xs italic">{errors.streetNumber}</p> : null
                            }
                        </div>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded shadow-2xl shadow-indigo-600" type="submit">Crear tu sede</button> 
                    <br/>
                    <br/>
                    <Link to="/home">
                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Volver</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}
