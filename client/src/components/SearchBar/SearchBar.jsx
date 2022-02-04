import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBasketballBall, faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './SearchBar.scss';

const location = 'Ubicación';
const sports = 'Deportes';
const establishment = 'Establecimiento';

function SearchBar() {
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
                <input id='establishment'placeholder={establishment}/>
                <Link to={"/results"}>
                <FontAwesomeIcon icon={faSearchLocation} className='faIcon'/>
                </Link>
            </div>
        </div>
    </div>
  );
}

export default SearchBar;
