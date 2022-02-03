import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import { postCourt } from "../../redux/actions/court";
import { getEstablishmentByUser, getSitesByEstablishmentId } from "../../redux/actions/forms";
import { useDispatch, useSelector } from "react-redux";
import './CourtCreate.scss'



function validate(input) {
    let errors = {};
    console.log(errors)
    if(!/^[a-zA-Z0-9_\-' ']{2,20}$/.test(input.name)) {
        errors.name = 'Se requieren entre 2 y 20 caracteres, no se permiten simbolos';
    }; 
    
    if(!input.description) {
        errors.description = 'Se requiere una descripción';
    }; 
    if(!input.sport) {
        errors.sport = 'Selecciona un deporte';
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
        establishment:'',
        site:'',
    
    })
    
    function handlePutImage(e){  
   setInput({
            ...input,
            image:[...input.image,   e.target.value]
            
        });
        setErrors(validate({
              ...input,
              [e.target.name]: e.target.value
          }))
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
        setInput({
            ...input,
            establishment: e.target.value
        });
        dispatch(getSitesByEstablishmentId(e.target.value));
        setErrors(validate({
              ...input,
              [e.target.name]: e.target.value
          }))
    }

    function handleSelectSite(e){
        setInput({
            ...input,
            site: e.target.value
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
      //  console.log(input)
    }

    function handleSubmit(e){  
       console.log(input)
            e.preventDefault();
           // console.log(input)
            dispatch(postCourt(input));
            alert('Cancha Creada!!')
            setInput({
                name:'',
                description:'',
                shiftLength:'',
                price:'',
                sport:'',
                image:[],
                site:'',
            })
             history.push('./home')
        
    }    
       

    // useEffect(() => {
    //     dispatch(getSites());
    // },[])
    return(
        <div className="containerCreateCourt">
            <Link to='/home' ><button className='btnBack' >Volver</button>  </Link>
            <h1 className="title">Crea una Cancha</h1>
            <div className="create">
            
                <form className="form" onSubmit={(e) => handleSubmit(e)} >
                    <div>
                        <label className="label" for='nombre'>Nombre cancha:</label>
                        <input className="inputForm" id='nombre' type='text' value={input.name} name='name' onChange={(e) => handleChange(e)} />
                        
                        {errors.name&& (
                            <p  className='error' >{errors.name}</p>
                        )}
                    </div>
                    <div>
                        <label className="label">Descripción:</label>
                        <input className="inputForm" type='text' value={input.description} name='description' onChange={(e) => handleChange(e)} />
                        {errors.description&& (
                            <p  className='error' >{errors.description}</p>
                        )}
                    </div>
                    <div>
                        <label className="label">Duración del turno (minutos):</label>
                        <input className="inputForm" type='number' value={input.shiftLength} name='shiftLength' onChange={(e) => handleChange(e)} />
                        {errors.shiftLength&& (
                            <p  className='error' >{errors.shiftLength}</p>
                        )}
                    </div>
                    <div>
                        <label className="label">Precio (por turno):</label>
                        <input className="inputForm" type='number' value={input.price} name='price' onChange={(e) => handleChange(e)} />
                        {errors.price&& (
                            <p  className='error' >{errors.price}</p>
                        )}
                    </div>
                    <div>
                        <label className="label">Deporte:</label>
                        <select className="inputForm" name='sport' onChange={(e) => handleSelectSport(e)} >
                            <option value=''></option>
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
                    <label className="label" >Imagenes:</label> 
                        {/* <select className="inputForm" name='image' onChange={(e) => handlePutImage(e)} >
                                    
                        </select> */}
                        <input className="inputForm" type='text' value={input.image} name='price' onChange={(e) => handlePutImage(e)} />
                        {errors.image&& (
                            <p  className='error' >{errors.image}</p>
                        )}

                    <div>
                        <label className="label" >Establecimiento:</label> 
                        <select className="inputForm" name='establishments' onChange={(e) => handleSelectEstablishment(e)} >
                                    
                        <option value=''> </option>
                            {establishments.map((c) => (
                                    <option value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        {errors.establishment&& (
                            <p  className='error' >{errors.site}</p>
                        )}
                    </div>
                    <div>
                        <label className="label" >Site:</label> 
                        <select className="inputForm" name='sites' onChange={(e) => handleSelectSite(e)} >
                                    
                        <option value=''> </option>
                            {sites.map((c) => (
                                    <option value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        {errors.site&& (
                            <p  className='error' >{errors.site}</p>
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