import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postEstablishment } from "../../redux/actions";

export default function PostEstablishment() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [input, setInput] = useState({
        cuit: null,
        name: "",
        descripcion: "",
        logoImage: "",
        rating: null,
        timeActiveFrom: null,
        timeActiveTo: null,
        responsable_id: ""
    })
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }
    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postEstablishment(input))
        alert("Establecimiento creado con exito")
        setInput({
        cuit: null,
        name: "",
        descripcion: "",
        logoImage: "",
        rating: null,
        timeActiveFrom: null,
        timeActiveTo: null,
        responsable_id: ""
        })
        history.push("/home")
    }
    return (
        <div>
            <div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                    <label>Cuit: </label>
                    <input placeholder="Cuit..." type="text" value={input.cuit} name="cuit" onChange={(e)=>handleChange(e)}></input>
                    </div>
                    <div>
                    <label>Nombre: </label>
                    <input placeholder="Nombre..." type="text" value={input.name} name="name" onChange={(e)=>handleChange(e)}></input>
                    </div>
                    <div>
                    <label>Descripcion: </label>
                    <input placeholder="Descripcion..." type="text" value={input.descripcion} name="descripcion" onChange={(e)=>handleChange(e)}></input>
                    </div>
                    <div>
                    <label>Logo-Imagen: </label>
                    <input placeholder="Logo..." type="text" value={input.logoImage} name="logoImage" onChange={(e)=>handleChange(e)}></input>
                    </div>
                    <div>
                    <label>Rating: </label>
                    <input placeholder="Rating..." type="text" value={input.rating} name="rating" onChange={(e)=>handleChange(e)}></input>
                    </div>
                    <div>
                    <label>Horario de apertura: </label>
                    <input placeholder="Hora de apertura..." type="text" value={input.timeActiveFrom} name="timeActiveFrom" onChange={(e)=>handleChange(e)}></input>
                    </div>
                    <div>
                    <label>Horario de cierre: </label>
                    <input placeholder="Hora de cierre..." type="text" value={input.timeActiveTo} name="timeActiveTo" onChange={(e)=>handleChange(e)}></input>
                    </div>
                    <div>
                    <label>Numero de usuario responsable: </label>
                    <input placeholder="Numero(id) del usuario responsable..." type="text" value={input.responsable_id} name="responsable_id" onChange={(e)=>handleChange(e)}></input>
                    </div>
                    <button type="submit">Crear Establecimiento</button> 
                    <br/>
                    <Link to="/home">
                    <button>Volver</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

