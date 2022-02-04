import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postEstablishment } from "../../redux/actions/establishment.js";
import Swal from 'sweetalert2';
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
                Swal.fire({
                    icon: 'error',
                    text: 'Faltan completar campos obligatorios'
                  })
            } else {
        dispatch(postEstablishment(input))
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Establecimiento creado con exito',
            showConfirmButton: false,
            timer: 1500
          })
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
            <div className="lg: flex justify-center">
                <form className=" mx-5 w-full max-w-lg " onSubmit={(e) => handleSubmit(e)}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="tracking-wide text-gray-700 text-xs font-bold mb-2">Cuit: </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder="Cuit..." type="text" value={input.id} name="id" onChange={(e)=>handleChange(e)}></input>
                    {errors.cuit ?
                    <p className="text-red-500 text-xs italic">{errors.cuit}</p> : null
                    }
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                    <label className="tracking-wide text-gray-700 text-xs font-bold mb-2">Nombre: </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" placeholder="Nombre..." type="text" value={input.name} name="name" onChange={(e)=>handleChange(e)}></input>
                    {errors.name ?
                    <p className="text-red-500 text-xs italic">{errors.name}</p> : null
                    }
                    </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                    <label className="tracking-wide text-gray-700 text-xs font-bold mb-2">Logo-Imagen: </label>
                    <input className=" appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Logo..." type="text" value={input.logoImage} name="logoImage" onChange={(e)=>handleChange(e)}></input>
                    </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="tracking-wide text-gray-700 text-xs font-bold mb-2">Rating: </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Rating..." type="number" value={input.rating} name="rating" onChange={(e)=>handleChange(e)}></input>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="tracking-wide text-gray-700 text-xs font-bold mb-2">Horario de apertura: </label>
                    <div className="relative">
                    <input className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Hora de apertura..." type="number" value={input.timeActiveFrom} name="timeActiveFrom" onChange={(e)=>handleChange(e)}></input>
                    </div>
                    </div>
                    {errors.timeActiveFrom ?
                    <p className="text-red-500 text-xs italic">{errors.timeActiveFrom}</p> : null
                    }
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="tracking-wide text-gray-700 text-xs font-bold mb-2">Horario de cierre: </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Hora de cierre..." type="number" value={input.timeActiveTo} name="timeActiveTo" onChange={(e)=>handleChange(e)}></input>
                    </div>
                    </div>
                    {errors.timeActiveTo ?
                    <p className="text-red-500 text-xs italic">{errors.timeActiveTo}</p> : null
                    }
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded shadow-2xl shadow-indigo-600" type="submit">Crear Establecimiento</button> 
                    <br/>
                    <br/>
                    <Link to="/">
                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Volver</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

