import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUserToEstablishment } from "../../redux/actions/establishment";
import Swal from 'sweetalert2';



function validate(input) {
 
    let errors = {};
    if(input.email !=='' && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(input.email)) {
        errors.email = "Por favor, ingresar un email válido"
    }
    return errors
}


export default function AddUserToEstablishment({establishmentId}){

    const userId = 1;

    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        establishmentId: establishmentId,
        email: '',
    })

    useEffect(()=>{
        setInput({
            ...input,
            establishmentId: establishmentId,
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[establishmentId])

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
        if(Object.keys(errors).length!==0) {
                Swal.fire({
                    icon: 'error',
                    text: 'Faltan completar campos obligatorios'
                  })
        } else {
        
            dispatch(addUserToEstablishment(input))
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Usuario agregado con exito',
                showConfirmButton: false,
                timer: 1500
            })
            setInput({
                establishmentId: establishmentId,
                email: '',
            })
            history.push("/")        
             
        }
        
    }
    return (
        <div>
            <div className="lg: flex justify-center">
                <form className=" mx-5 w-full max-w-lg " onSubmit={(e) => handleSubmit(e)}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2">Email: </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder="Nombre..." type="text" value={input.email} name="email" onChange={(e)=>handleChange(e)} required></input>
                            {errors.email ?
                            <p className="text-red-500 text-xs italic">{errors.name}</p> : null
                            }
                        </div>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded shadow-2xl shadow-indigo-600" type="submit">Agregar Usuario</button> 
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