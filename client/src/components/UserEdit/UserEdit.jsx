import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import { editUser } from "../../redux/actions/users";
import { getEstablishmentByUser, getSitesByEstablishmentId } from "../../redux/actions/forms";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import './UserEdit.scss'



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
  //  const sites = useSelector ((state) => state.sites)
    const history = useHistory()
    const [errors,setErrors] = useState({});
    const userToken = useSelector((state) => state.register.userToken)

    let userId = '35953287';

    useEffect(()=>{
        dispatch((getEstablishmentByUser(userId)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userId])

    const [input,setInput] = useState({
        name:'',
        lastName: '',
        img:"",
        phone:'',
        hasEstablishment: undefined,
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
      //  console.log(input)
    }

    function handleSubmit(e){  
       console.log(input)
            e.preventDefault();
            dispatch(UserEdit(input));
            console.log(input)
            alert('Cancha Creada!!')
            setInput({
                name:'',
                lastName: '',
                img:"",
                phone:'',
                hasEstablishment: undefined
            })
             history.push('/')
    }    

    let handleCheck = (e)=>{
        if(e.target.checked){
            setInput({
                ...input,
                hasEstablishment: true
            })
        }else{
            setInput({
                ...input,
                hasEstablishment: false
            })
        }
    }
       

    return(
        <div className="containerCreateCourt">
            <Link to='/' ><button className='btnBack' >Volver</button>  </Link>
            <h1 className="title">Crea una Cancha</h1>
            <div className="create">
            
                <form className="form" onSubmit={(e) => handleSubmit(e)} >
                    <input type='hidden' value={userToken}/>
                    <div>
                        <label className="label">Nombre de Usuario:</label>
                        <input 
                            className="inputForm" 
                            id='nombre' 
                            type='text' 
                            value={input.name} 
                            name='name' 
                            onChange={(e) => handleChange(e)} 
                        />
                        
                        {errors.name&& (
                            <p  className='error' >{errors.name}</p>
                        )}
                    </div>
                    <div>
                        <label className="label">Apellido:</label>
                        <input 
                            className="inputForm" 
                            type='text' value={input.lastName} 
                            name='lastName' 
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.lastName&& (
                            <p  className='error' >{errors.lastName}</p>
                        )}
                    </div>
                    <div>
                        <label className="label">Telefono de contacto:</label>
                        <input 
                            className="inputForm" 
                            type='text' value={input.phone} 
                            name='phone' 
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.phone&& (
                            <p  className='error' >{errors.phone}</p>
                        )}
                    </div>

                    
                        <label className="label">Imagen:</label>
                         <input className="inputForm" type="file" accept="image/*" name="logoImage" id="input_img" onChange={fileChange}/>
        
                    
                    <div>
                        <label><input 
                        onChange={e => handleCheck(e)} 
                        type='checkbox' 
                        name='hasEstablishment' 
                        value={input.hasEstablishment}
                         ></input>Tiene establecimiento ?</label>
                    </div>
                    <div>
                        <button className='buttonCreateCourt' type="submit" >Guardar cambios</button>
                    </div>
                </form>

            </div>
        </div>

    )
}
