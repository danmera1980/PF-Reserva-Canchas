import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import { postCourt } from "../../redux/actions/court";
import { getEstablishmentByUser, getSitesById } from "../../redux/actions/forms";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import './CourtCreate.scss'




function validate(input) {
    let errors = {};
    if(!/^[a-zA-Z0-9_\-' ']{1,20}$/.test(input.name)) {
        errors.name = 'Completar nombre';
    }; 
    if(!/^[a-zA-Z0-9' ':]{0,20}$/.test(input.name)) {
        errors.name = 'No se permiten simbolos';
    }; 
    
    if(!/^[a-zA-Z0-9_\-' ',.]{1,40}$/.test(input.description)) {
        errors.description = 'Completar la descripcion';
    }; 
    if(!/^[a-zA-Z0-9_\-' ',.:]{0,100}$/.test(input.description)) {
        errors.description = 'No se permiten simbolos';
    }; 
    if(!input.sport) {
        errors.sport = 'Selecciona un deporte';
    }; 

    if(input.shiftLength!=='' && (input.shiftLength<15 || input.shiftLength>120)) {
        errors.shiftLength = 'La duracion del turno tiene que ser entre 15 y 120 mins';
    }; 
   
    if(input.price!==''&& input.price<10) {
        errors.price = 'El precio tiene que ser igual o mayor a 10';
    }; 
   
    
    return errors
}


export default function CourtCreate(){
    const dispatch = useDispatch();
    const history = useHistory()
    const [errors,setErrors] = useState({});
    const establishmentId = useSelector(state => state.forms.establishmentId)
    const sites = useSelector(state => state.forms.sitesByEstablishment)
    const userToken = useSelector((state) => state.register.userToken)

    const [input,setInput] = useState({
        name:'',
        description:'',
        shiftLength:'',
        price:'',
        sport:'',
        image:[],
        siteId:'',
    
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

    function handleSelectSite(e){
        setInput({
            ...input,
            siteId: e.target.value
        });
        setErrors(validate({
              ...input,
              [e.target.name]: e.target.value
          }))
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
        e.preventDefault();
        setErrors(validate({
            ...input
        }))
        if(Object.keys(errors).length !== 0){
            alert('completar los campos correctamente')
        } else{
            dispatch(postCourt(input, userToken));
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Cancha creada con exito',
                showConfirmButton: false,
                timer: 1500
              })
            setInput({
                name:'',
                description:'',
                shiftLength:'',
                price:'',
                sport:'',
                image:[],
                siteId:'',
            })
            history.push("/establishmentprofile");
            window.location.reload();
            }
    }    
       

    return(
        <div>
        {
            !sites.length>0 
            ? Swal.fire({
                title: 'Debes crear una sede antes de crear una cancha',
                timer: 3000,
                text: 'Serás redirigido al formulario',
                timerProgressBar:true,
                willClose: ()=>{history.push('/site'); window.location.reload()}
            })
            :
        
            <div className="containerCreateCourt">
                
                <h1 className="flex justify-center text-xl text-indigo-800">Crea una Cancha</h1>
                <div className="flex justify-center">

                    <form className="md:w-3/5 lg:w-2/5 flex-col justify-center items-center mx-5 border-grey-400 border-2 mt-10 bg-white drop-shadow-md backdrop-blur-3xl rounded-md px-3 py-3" onSubmit={(e) => handleSubmit(e)} >
                    {input.image? <img className="w-36 h-36 bg-cover rounded-sm" src={input.image} alt="not found"  /> : null}
                            <div className=" relative mt-5">
                                <input className="w-full peer placeholder-transparent h-10   border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent" id='nombre' type='text' value={input.name} name='name' onChange={(e) => handleChange(e)} required />
                                <label className="absolute left-0 -top-3.5 
                                                text-gray-600 text-sm 
                                                peer-placeholder-shown:text-base 
                                                peer-placeholder-shown:text-gray-400
                                                peer-placeholder-shown:top-2 transition-all 
                                                peer-focus:-top-3.5 peer-focus:text-gray-600
                                                peer-focus:text-sm
                                                cursor-text">Nombre cancha:</label>
                                {errors.name&& (
                                    <p  className='text-xs text-red-500' >{errors.name}</p>
                                )}
                            </div>
                            <div className="relative mt-3">
                                <input className="w-full peer placeholder-transparent h-10   border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent" type='text' value={input.description} name='description' onChange={(e) => handleChange(e)} required />
                                <label className="absolute left-0 -top-3.5 
                                                text-gray-600 text-sm 
                                                peer-placeholder-shown:text-base 
                                                peer-placeholder-shown:text-gray-400
                                                peer-placeholder-shown:top-2 transition-all 
                                                peer-focus:-top-3.5 peer-focus:text-gray-600
                                                peer-focus:text-sm
                                                cursor-text">Descripción:</label>

                            
                                {errors.description&& (
                                    <p  className='text-xs text-red-500' >{errors.description}</p>
                                )}
                            </div>
                    
                        
                            <div className="relative mt-3">
                                <input className="w-full peer placeholder-transparent h-10   border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent" type='number' value={input.shiftLength} name='shiftLength' onChange={(e) => handleChange(e)} required />
                                <label className="absolute left-0 -top-3.5 
                                                text-gray-600 text-sm 
                                                peer-placeholder-shown:text-base 
                                                peer-placeholder-shown:text-gray-400
                                                peer-placeholder-shown:top-2 transition-all 
                                                peer-focus:-top-3.5 peer-focus:text-gray-600
                                                peer-focus:text-sm
                                                cursor-text">Duración del turno (minutos):</label>
                                {errors.shiftLength&& (
                                    <p  className='text-xs text-red-500' >{errors.shiftLength}</p>
                                )}
                            </div>
                        
                        
                            <div className="relative mt-3">
                                <input className="w-full peer placeholder-transparent h-10   border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent" type='number' value={input.price} min={10} step={10} name='price' onChange={(e) => handleChange(e)} required />
                                <label className="absolute left-0 -top-3.5 
                                                text-gray-600 text-sm 
                                                peer-placeholder-shown:text-base 
                                                peer-placeholder-shown:text-gray-400
                                                peer-placeholder-shown:top-2 transition-all 
                                                peer-focus:-top-3.5 peer-focus:text-gray-600
                                                peer-focus:text-sm
                                                cursor-text">Precio (por turno):</label>

                            

                                {errors.price&& (
                                    <p  className='text-xs text-red-500' >{errors.price}</p>
                                )}
                            </div>
                            <div className="relative mt-3">
                                <div className="relative">
                                    <select className="w-full peer placeholder-transparent h-10   border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent" name='sport' onChange={(e) => handleSelectSport(e)} required >
                                        <option value=''>Seleccioná un deporte</option>
                                        <option value='Basquet'>Basquet</option>
                                        <option value='Futbol 11'>Futbol 11</option>
                                        <option value='Futbol 7'>Futbol 7</option>
                                        <option value='Futbol 5'>Futbol 5</option>
                                        <option value='Handbol'>Handbol</option>
                                        <option value='Padel'>Padel</option>
                                        <option value='Squash'>Squash</option>
                                        <option value='Tenis'>Tenis</option>
                                        
                                    </select>
                                <label className="absolute left-0 -top-3.5 
                                                text-gray-600 text-sm 
                                                peer-placeholder-shown:text-base 
                                                peer-placeholder-shown:text-gray-400
                                                peer-placeholder-shown:top-2 transition-all 
                                                peer-focus:-top-3.5 peer-focus:text-gray-600
                                                peer-focus:text-sm
                                                cursor-text">Deporte:</label>
                                </div>
                        
                            {errors.sport&& (
                                <p  className='text-xs text-red-500' >{errors.sport}</p>
                            )}
                        </div>
                        <div className="mb-4 relative mt-3 bg-indigo-400 text-center hover:bg-indigo-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline"> 
                            <input
                                className="absolute top-0 right-0 left-0 bottom-0 w-full h-full opacity-0"
                                type="file"
                                accept="image/*"
                                name="image"
                                id="input_img"
                                onChange={fileChange}
                                multiple
                            />
                            <label className="text-white" htmlFor="input_img">Imágenes</label>
                            {errors.image && <p className="'text-xs text-red-500">{errors.image}</p>}
                        </div>
                        <div className="relative mt-3">
                            <select className="w-full peer placeholder-transparent h-10   border-b-2 border-grey-300 focus:outline-none focus:border-indigo-600 bg-transparent" name='sites' onChange={(e) => handleSelectSite(e)} required >  
                                <option value='' >Seleccioná una sede</option>
                                    {sites.map((c) => (
                                        <option value={c.id} key={c.id}>{c.name}</option>
                                        ))}
                            </select>
                                        <label className="absolute left-0 -top-3.5 
                                                text-gray-600 text-sm 
                                                peer-placeholder-shown:text-base 
                                                peer-placeholder-shown:text-gray-400
                                                peer-placeholder-shown:top-2 transition-all 
                                                peer-focus:-top-3.5 peer-focus:text-gray-600
                                                peer-focus:text-sm
                                                cursor-text" >Site:</label> 
                            {errors.siteId&& (
                                <p  className='text-red-500 text-xs italic' >{errors.siteId}</p>
                            )}
                        </div>
                        <br/>
                        <div>
                            <button className='mt-5 w-full bg-indigo-400 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type="submit" >Crear Cancha</button>
                            <br/>
                            <br/>
                            <button className='w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' >Volver</button>
                        </div>
                    </form>
                </div>
            </div>
        }
      </div>

    )
}
