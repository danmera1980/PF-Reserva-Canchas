import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import { editUser } from "../../redux/actions/users";
import { useDispatch, useSelector } from "react-redux";
import Header from '../Header/Header';
import axios from "axios";
import './UserEdit.scss'
import Swal from 'sweetalert2'
import Login from "../Login/Login";



function validate(input) {
    let errors = {};
    console.log(errors)
    if(!/^[a-zA-Z0-9_\-' ']{2,20}$/.test(input.name)) {
        errors.name = 'Se requieren entre 2 y 20 caracteres, no se permiten simbolos';
    }; 
    
    if(!input.lastName) {
        errors.lastName = 'Se requiere un Apellido';
    }; 
    if(!input.phone) {
        errors.phone = 'Se requiere un numero de contacto';
    }; 
   
    
    return errors
}


export default function UserEdit(){
    const dispatch = useDispatch();
    const history = useHistory()
    const [errors,setErrors] = useState({});
    const userToken = useSelector((state) => state.register.userToken)


    const [input,setInput] = useState({
        name:'',
        lastName: '',
        img:"",
        phone:'',
    })
      
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
                img: response.data.data.url,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }

    function  handleChange(e){
       setInput({
            ...input,
            [e.target.name] :   e.target.value
        });
      setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSubmit(e){  
       console.log(input)
            e.preventDefault();
            console.log('input del submit',input)
            dispatch(editUser(input, userToken));

            Swal.fire({
                title: `Usuario modificado`,
              });            
            setInput({
                name:'',
                lastName: '',
                img:"",
                phone:'',
                hasEstablishment: false
            })
             history.push('/profile')
    }    
       

    return(
        userToken ?
        <div className="">
            <Header />
            <div className="flex justify-center">
                <form className="md:mx-56 lg:w-full lg:mx-[500px] flex-col justify-center items-center mx-5 border-grey-400 border-2 mt-10 bg-white drop-shadow-md backdrop-blur-3xl rounded-md px-3 py-3" onSubmit={handleSubmit} >
                {input.img? <img className="w-36 h-36 bg-cover rounded-full" src={input.img}   /> : null}
                    <input type='hidden' value={userToken}/>
                    <div className="relative mt-10">
                        <input 
                            className="w-full peer placeholder-transparent h-10   border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent" 
                            autoComplete="off"
                            id='nombre' 
                            type='text' 
                            value={input.name} 
                            name='name' 
                            placeholder="Nombre de usuario "
                            onChange={(e) => handleChange(e)} 
                        />
                        
                            <label className="  absolute left-0 -top-3.5 
                                            text-gray-600 text-sm 
                                            peer-placeholder-shown:text-base 
                                            peer-placeholder-shown:text-gray-400
                                            peer-placeholder-shown:top-2 transition-all 
                                            peer-focus:-top-3.5 peer-focus:text-gray-600
                                            peer-focus:text-sm
                                            cursor-text" htmlFor="nombre"
                                            >
                                                Nombre de Usuario
                             </label>
                        {errors.name&& (
                            <p  className=' text-xs text-red-500' >{errors.name}</p>
                        )}
                    </div>
                    <div className="mb-4 relative mt-3" >
                        <input 
                            className="peer placeholder-transparent h-10 w-full  border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent"
                            autoComplete="off" 
                            type='text' value={input.lastName} 
                            name='lastName' 
                            placeholder=" "
                            onChange={(e) => handleChange(e)}
                        />
                        <label className="absolute left-0 -top-3.5 
                                            text-gray-600 text-sm 
                                            peer-placeholder-shown:text-base 
                                            peer-placeholder-shown:text-gray-400
                                            peer-placeholder-shown:top-2 transition-all 
                                            peer-focus:-top-3.5 peer-focus:text-gray-600
                                            peer-focus:text-sm
                                            cursor-text" htmlFor="lastName">Apellido</label>
                        {errors.lastName&& (
                            <p  className='text-xs text-red-500' >{errors.lastName}</p>
                        )}
                    </div>
                    <div className="mb-4 relative mt-3">
                        <input 
                            className="peer placeholder-transparent h-10 w-full  border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent" 
                            placeholder=" "
                            autoComplete="off"
                            type='text' value={input.phone} 
                            name='phone' 
                            id="telefono"
                            onChange={(e) => handleChange(e)}
                        /> 
                            <label className="absolute left-0 -top-3.5 
                                            text-gray-600 text-sm 
                                            peer-placeholder-shown:text-base 
                                            peer-placeholder-shown:text-gray-400
                                            peer-placeholder-shown:top-2 transition-all 
                                            peer-focus:-top-3.5 peer-focus:text-gray-600
                                            peer-focus:text-sm
                                            cursor-text" htmlFor="telefono">Telefono de contacto</label>
                        {errors.phone&& (
                            <p  className='text-xs text-red-500' >{errors.phone}</p>
                        )}
                    </div>
                    <div className="mb-4 relative mt-3 bg-indigo-400 text-center hover:bg-indigo-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        
                        <input className="absolute top-0 right-0 left-0 bottom-0 w-full h-full opacity-0" autoComplete="off" placeholder=" " type="file" accept="image/*" name="logoImage" id="input_img" onChange={fileChange}/>
                        <label className="text-white " htmlFor="input_img">Añadir Imagen</label>
        
                    </div>
                   
                    <div className="flex items-center justify-between">
                        <button className='w-full bg-indigo-400 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type="submit" >Guardar cambios</button>
                    </div>
                    
                </form>

            </div>
            
        </div> 
        :
        <div>
        <Login/>
        </div>
        
    )
}
