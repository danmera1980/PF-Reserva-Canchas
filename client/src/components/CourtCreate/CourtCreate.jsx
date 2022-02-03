import React, {useState, useEffect} from "react";
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import { postCourt } from "../../redux/actions/court";
import { getEstablishmentByUser, getSitesByEstablishmentId } from "../../redux/actions/forms";
import { useDispatch, useSelector } from "react-redux";
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
            alert('Cancha Creada!!')
            setInput({
                name:'',
                description:'',
                shiftLength:'',
                price:'',
                sport:'',
                image:[],
                siteId:'',
            })
             history.push('./home')
            }
    }    
       

    return(
        <div className="containerCreateCourt">
            <Link to='/home' ><button className='btnBack' >Volver</button>  </Link>
            <h1 className="title">Crea una Cancha</h1>
            <div className="create">
            
                <form className="form" onSubmit={(e) => handleSubmit(e)} >
                    <div>
                        <label className="label">Nombre cancha:</label>
                        <input className="inputForm" id='nombre' type='text' value={input.name} name='name' onChange={(e) => handleChange(e)} required/>
                        
                        {errors.name&& (
                            <p  className='error' >{errors.name}</p>
                        )}
                    </div>
                    <div>
                        <label className="label">Descripción:</label>
                        <input className="inputForm" type='text' value={input.description} name='description' onChange={(e) => handleChange(e)} required />
                        {errors.description&& (
                            <p  className='error' >{errors.description}</p>
                        )}
                    </div>
                    <div>
                        <label className="label">Duración del turno (minutos):</label>
                        <input className="inputForm" type='number' value={input.shiftLength} min={15} max={120} step={15} name='shiftLength' onChange={(e) => handleChange(e)}required />
                        {errors.shiftLength&& (
                            <p  className='error' >{errors.shiftLength}</p>
                        )}
                    </div>
                    <div>
                        <label className="label">Precio (por turno):</label>
                        <input className="inputForm" type='number' value={input.price} min={10} step={10} name='price' onChange={(e) => handleChange(e)} required/>
                        {errors.price&& (
                            <p  className='error' >{errors.price}</p>
                        )}
                    </div>
                    <div>
                        <label className="label">Deporte:</label>
                        <select className="inputForm" name='sport' onChange={(e) => handleSelectSport(e)} required>
                            <option value=''  >Seleccioná un deporte</option>
                            <option value='Basquet'>Basquet</option>
                            <option value='Futbol 11'>Futbol 11</option>
                            <option value='Futbol 7'>Futbol 7</option>
                            <option value='Futbol 5'>Futbol 5</option>
                            <option value='Handbol'>Handbol</option>
                            <option value='Padel'>Padel</option>
                            <option value='Squash'>Squash</option>
                            <option value='Tenis'>Tenis</option>
                            
                        </select>
                        {errors.sport&& (
                            <p  className='error' >{errors.sport}</p>
                        )}
                    </div> 
                    <label className="text-black">Imágenes:</label>
                            <input
                                className="inputForm"
                                type="file"
                                accept="image/*"
                                name="image"
                                id="input_img"
                                onChange={fileChange}
                                multiple
                            />
                            {errors.image && <p className="error">{errors.image}</p>}
                    <div>
                        <label className="label" >Establecimiento:</label> 
                        <select className="inputForm" name='establishments' onChange={(e) => handleSelectEstablishment(e)} required >
                                    
                        <option value=''>Seleccioná un establecimiento</option>
                            {establishments.map((c) => (
                                    <option value={c.id} key={c.id}>{c.name}</option>
                            ))}
                        </select>
                        {errors.establishment&& (
                            <p  className='error' >{errors.siteId}</p>
                        )}
                    </div>
                    <div>
                        <label className="label" >Site:</label> 
                        <select className="inputForm" name='sites' onChange={(e) => handleSelectSite(e)} required >
                                    
                        <option value='' >Seleccioná una sede</option>
                            {sites.map((c) => (
                                    <option value={c.id} key={c.id}>{c.name}</option>
                            ))}
                        </select>
                        {errors.siteId&& (
                            <p  className='error' >{errors.siteId}</p>
                        )}
                    </div>
                    <div>
                        <button className='buttonCreateCourt' type="submit" >Crear Cancha</button>
                    </div>
                </form>

            </div>
        </div>

    )
}
