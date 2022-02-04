import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import { postCourt } from "../../redux/actions/court";
import { getEstablishmentByUser, getSitesByEstablishmentId } from "../../redux/actions/forms";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import './CourtCreate.scss'
import swal from 'sweetalert2';



function validate(input) {
    let errors = {};
    // if(!/^[a-zA-Z0-9_\-' ']{1,20}$/.test(input.name)) {
    //     errors.name = 'Completar nombre';
    // }; 
    if(!/^[a-zA-Z0-9\' ':]{0,20}$/.test(input.name)) {
        errors.name = 'No se permiten simbolos';
    }; 
    
    // if(!/^[a-zA-Z0-9_\-' ',.]{1,40}$/.test(input.description)) {
    //     errors.description = 'Completar la descripcion';
    // }; 
    if(!/^[a-zA-Z0-9_\-' ',.:]{0,100}$/.test(input.description)) {
        errors.description = 'No se permiten simbolos';
    }; 
    // if(!input.sport) {
    //     errors.sport = 'Selecciona un deporte';
    // }; 

    if(input.shiftLength!=='' && input.shiftLength<15 ||input.shiftLength>120  ) {
        errors.shiftLength = 'La duracion del turno tiene que ser entre 15 y 120 mins';
    }; 
   
    if(input.price!==''&& input.price<10) {
        errors.price = 'El precio tiene que ser igual o mayor a 10';
    }; 
   
    
    return errors
}


export default function CourtCreate(){
    const dispatch = useDispatch();
  //  const sites = useSelector ((state) => state.sites)
    const history = useHistory()
    const [errors,setErrors] = useState({});
    const establishments = useSelector(state => state.forms.establishmentByUser)
    const sites = useSelector(state => state.forms.sitesByEstablishment)

    let userId = '35953287';

    useEffect(()=>{
        dispatch((getEstablishmentByUser(userId)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userId])



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
    
    function handleSelectEstablishment(e){
        dispatch(getSitesByEstablishmentId(e.target.value));
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
        if(errors.name || errors.description ||input.name.trim().length===0
        ||input.description.trim().length===0 || input.shiftLength || input.price){
            alert('completar los campos correctamente')
        } else{

        

            e.preventDefault();
            dispatch(postCourt(input));
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
             history.push('/')
            }
    }    
       

    return(
        <div className="containerCreateCourt">
            <Link to='/' ><button className='btnBack' >Volver</button>  </Link>
            <h1 className="title">Crea una Cancha</h1>
             <div className="lg: flex justify-center">

                <form className="mx-5 w-full max-w-lg" onSubmit={(e) => handleSubmit(e)} >
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2">Nombre cancha:</label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id='nombre' type='text' value={input.name} name='name' onChange={(e) => handleChange(e)} required />
                            {errors.name&& (
                                <p  className='text-red-500 text-xs italic' >{errors.name}</p>
                            )}
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2">Descripción:</label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type='text' value={input.description} name='description' onChange={(e) => handleChange(e)} required />

                        
                            {errors.description&& (
                                <p  className='text-red-500 text-xs italic' >{errors.description}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2">Duración del turno (minutos):</label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type='number' value={input.shiftLength} name='shiftLength' onChange={(e) => handleChange(e)} required />
                            {errors.shiftLength&& (
                                <p  className='text-red-500 text-xs italic' >{errors.shiftLength}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2">Precio (por turno):</label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type='number' value={input.price} min={10} step={10} name='price' onChange={(e) => handleChange(e)} required />

                        

                            {errors.price&& (
                                <p  className='text-red-500 text-xs italic' >{errors.price}</p>
                            )}
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="tracking-wide text-gray-700 text-xs font-bold mb-2">Deporte:</label>
                            <div className="relative">
                                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='sport' onChange={(e) => handleSelectSport(e)} required >
                                    <option value=''>Seleccioná un deport</option>
                                    <option value='Basquet'>Basquet</option>
                                    <option value='Futbol 11'>Futbol 11</option>
                                    <option value='Futbol 7'>Futbol 7</option>
                                    <option value='Futbol 5'>Futbol 5</option>
                                    <option value='Handbol'>Handbol</option>
                                    <option value='Padel'>Padel</option>
                                    <option value='Squash'>Squash</option>
                                    <option value='Tenis'>Tenis</option>
                                    
                                </select>
                            </div>
                        </div>
                        {errors.sport&& (
                            <p  className='text-red-500 text-xs italic' >{errors.sport}</p>
                        )}
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0"> 
                        <label className="tracking-wide text-gray-700 text-xs font-bold mb-2">Imágenes:</label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="file"
                            accept="image/*"
                            name="image"
                            id="input_img"
                            onChange={fileChange}
                            multiple
                        />
                        {errors.image && <p className="error">{errors.image}</p>}
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" >Establecimiento:</label> 
                        <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='establishments' onChange={(e) => handleSelectEstablishment(e)} required>
     
                           <option value=''>Seleccioná un establecimiento</option>
                            {establishments.map((c) => (
                                    <option value={c.id} key={c.id}>{c.name}</option>
                            ))}
                        </select>
                        {errors.establishment&& (
                            <p  className='text-red-500 text-xs italic' >{errors.siteId}</p>
                        )}
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="tracking-wide text-gray-700 text-xs font-bold mb-2" >Site:</label> 
                        <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='sites' onChange={(e) => handleSelectSite(e)} required >  
                            <option value='' >Seleccioná una sede</option>
                                {sites.map((c) => (
                                        <option value={c.id} key={c.id}>{c.name}</option>
                                ))}
                        </select>
                        {errors.siteId&& (
                            <p  className='text-red-500 text-xs italic' >{errors.siteId}</p>
                        )}
                    </div>
                    <br/>
                    <div>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded shadow-2xl shadow-indigo-600' type="submit" >Crear Cancha</button>
                        <br/>
                        <br/>
                        <Link to='/home' ><button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' >Volver</button>  </Link>
                    </div>
                </form>
            </div>
      </div>

    )
}