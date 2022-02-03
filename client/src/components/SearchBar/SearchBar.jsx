import React,{useState} from 'react';
import {useDispatch} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBasketballBall, faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.scss';
import { filterByName } from '../../redux/actions/establishment';

const location = 'Ubicación';
const sports = 'Deportes';
const establishment = 'Establecimiento';

function SearchBar() {
    
    const dispatch= useDispatch();
    const [name, setName] = useState('');

    function handleInput(e){
        e.preventDefault();
        setName(e.target.value);
        console.log(name)
    }

    let handleSubmit = (e)=>{
        e.preventDefault()
        if(!name) return alert('Ingrese nombre para la busqueda')
        dispatch(filterByName(name));
        setName("")
    }
  return (
    <div>
        <div className='searchBar'>
            <div className='searchSelect'>
                <select>
                    <option value=''>{location}</option>
                </select>
                <FontAwesomeIcon icon={faMapMarkerAlt} className='faIcon'/>
            </div>
            <div className='searchSelect'>
                <select id='sport'>
                    <option value=''>{sports}</option>
                    <option value='football'>Fútbol</option>
                </select>
                <FontAwesomeIcon icon={faBasketballBall} className='faIcon'/>
            </div>
            <div className='searchInput' >
                <input 
                    type= 'text'
                    onChange={(e) => handleInput(e)}
                    value={name}
                    id='establishment'
                    placeholder={establishment}
                />
                <FontAwesomeIcon onClick={(e) => handleSubmit(e)} icon={faSearchLocation} className='faIcon'/>
            </div>
        </div>
    </div>
  );
}

export default SearchBar;
