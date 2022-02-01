import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBasketballBall, faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.scss';

const location = 'Ubicación';
const sports = 'Deportes';
const establishment = 'Establecimiento';

function SearchBar() {
  return (
    <div>
        <div className='searchBar'>
            <div className='select'>
                <select>
                    <option value=''>{location}</option>
                </select>
                <FontAwesomeIcon icon={faMapMarkerAlt} className='faIcon'/>
            </div>
            <div className='select'>
                <select id='sport'>
                    <option value=''>{sports}</option>
                    <option value='football'>Fútbol</option>
                </select>
                <FontAwesomeIcon icon={faBasketballBall} className='faIcon'/>
            </div>
            <div className='input' >
                <input id='establishment'placeholder={establishment}/>
                <FontAwesomeIcon icon={faSearchLocation} className='faIcon'/>
            </div>
        </div>
    </div>
  );
}

export default SearchBar;
