import React,{useState} from 'react';
import {useDispatch} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBasketballBall, faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.scss';
import { filterByLocation, filterByName, filterBySport } from '../../redux/actions/establishment';

const sports = 'Deportes';
const establishment = 'Establecimiento';

function SearchBar() {
    
    const dispatch= useDispatch();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('')

    function handleInput(e){
        e.preventDefault();
        setName(e.target.value);
    }
    function handleLocation(e){
        e.preventDefault();
        setLocation(e.target.value);
    }

    let handleClickName = (e)=>{
        e.preventDefault()
        if(!name) return alert('Ingrese nombre para la busqueda')
        dispatch(filterByName(name));
        setName("")
    }

    let handleClickLocation = (e)=>{
        e.preventDefault()
        if(!location) return alert('Ingrese nombre para la busqueda')
        dispatch(filterByLocation(location));
        setLocation("")
    }

    function handleFilterBySport(e){
        dispatch(filterBySport(e.target.value))
    }

  return (
    <div>
        <div className='searchBar'>
            <div className='searchSelect'>
                <input 
                    type= 'text'
                    onChange={(e) => handleLocation(e)}
                    value={location}
                    id='establishment'
                    placeholder='Ubicación'
                />
                <FontAwesomeIcon onClick={(e) => handleClickLocation(e)} icon={faMapMarkerAlt} className='faIcon'/>
            </div>
            <div className='searchSelect'>
                <select id='sport'onChange={(e) => handleFilterBySport(e)}>
                    <option value=''>{sports}</option>
                    <option value='Basquet'>Basquet</option>
                    <option value='Futbol 11'>Futbol 11</option>
                    <option value='Futbol 7'>Futbol 7</option>
                    <option value='Futbol 5'>Futbol 5</option>
                    <option value='Handbol'>Handbol</option>
                    <option value='Padel'>Padel</option>
                    <option value='Squash'>Squash</option>
                    <option value='Tenis'>Tenis</option>               
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
                <FontAwesomeIcon onClick={(e) => handleClickName(e)} icon={faSearchLocation} className='faIcon'/>
            </div>
        </div>
    </div>
  );
}

export default SearchBar;
