import React,{useState} from 'react';
import {useDispatch} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBasketballBall, faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './SearchBar.scss';
import { searchByText, filterBySport } from '../../redux/actions/establishment';

const sports = 'Deportes';
const establishment = 'Establecimiento';

function SearchBar() {
    
    const dispatch= useDispatch();
    const [searchText, setSearchText] = useState('');
    const [location, setLocation] = useState('')

    function handleInput(e){
        e.preventDefault();
        setSearchText(e.target.value);
    }

    let handleSearch = (e)=>{
        e.preventDefault()
        if(!searchText) return alert('Ingrese nombre para la busqueda')
        dispatch(searchByText(searchText));
        setSearchText("")
    }

    function handleFilterBySport(e){
        dispatch(filterBySport(e.target.value))
    }

  return (
    <div>
        <div className='searchBar'>
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
                    value={searchText}
                    id='establishment'
                    placeholder={establishment}
                /> 
                <Link to={"/results"}>
                    <FontAwesomeIcon onClick={(e) => handleSearch(e)} icon={faSearchLocation} className='faIcon'/>
                </Link>
            </div>
        </div>
    </div>
  );
}

export default SearchBar;
