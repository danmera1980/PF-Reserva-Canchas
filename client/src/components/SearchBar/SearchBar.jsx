import React,{useState} from 'react';
import {useDispatch} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBasketballBall, faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory} from 'react-router-dom';
import './SearchBar.scss';
import { searchByText, filterBySport } from '../../redux/actions/establishment';

const sports = 'Deportes';
const establishment = 'Establecimiento';

function SearchBar() {

    const history = useHistory();
    
    const dispatch= useDispatch();
    const [searchText, setSearchText] = useState({
        latitude:-32.88641481914277,
        longitude:-68.84519635165792,
        sport: ''
    });
    const [sportType, setSportType] = useState('')

    function handleInput(e){
        e.preventDefault();
        // setSearchText(e.target.value);
    }

    let handleSearch = (e)=>{
        e.preventDefault()
        
        console.log(searchText)
        dispatch(searchByText(searchText));
        setSearchText({
            latitude:-32.88641481914277,
            longitude:-68.84519635165792,
            sport: ''
        })
        history.push('/results')
    }

    function handleFilterBySport(e){
        // setSportType(e.target.value)
        setSearchText({
            ...searchText,
            sport: e.target.value
        })
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
                    value=''
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
