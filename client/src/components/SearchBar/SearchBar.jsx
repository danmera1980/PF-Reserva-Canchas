import React,{useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBasketballBall, faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory} from 'react-router-dom';
import './SearchBar.scss';
import { searchByText, filterBySport, getGeocode, clearGeocode } from '../../redux/actions/establishment';
import axios from 'axios';

const sports = 'Deportes';
const mapToken = process.env.REACT_APP_MAPBOX_TOKEN;

function SearchBar({getViewPort}) {
    const [ geoCode, setGeoCode] = useState('')
    const [establishment, setEstablishment] = useState('Establecimiento');

    const history = useHistory();
    
    const dispatch= useDispatch();
    const [searchText, setSearchText] = useState({
        latitude:-32.88641481914277,
        longitude:-68.84519635165792,
        sport: '',
        text: '',
        zoom: 10
    });

    const [sportType, setSportType] = useState('');

    useEffect(() => {
        // dispatch(getGeocode(searchText.text));
        if(searchText.text !== ''){
            axios
                .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText.text}.json?access_token=${mapToken}`)
                .then(res => {
                    setGeoCode(res.data)
                })
        } else {
            setGeoCode('')
        }
    }, [searchText])

    function handleInput(e){
        e.preventDefault();
        setSearchText({
            ...searchText,
            text: e.target.value
        });
    }

    let handleSearch = (e)=>{
        e.preventDefault()
        
        console.log(searchText)
        getViewPort({
            latitude: searchText.latitude,
            longitude: searchText.longitude,
            width: '600px',
            height: '85vh',
            zoom: 12,
            pitch: 50
        })
        dispatch(searchByText(searchText));
        setSearchText({
            latitude:-32.88641481914277,
            longitude:-68.84519635165792,
            sport: '',
            text: ''
        })
        history.push('/results')
    }

    function handleFilterBySport(e){
        setSearchText({
            ...searchText,
            sport: e.target.value
        })
    }

    const suggestionHandler = (r)=>{
        setSearchText({...searchText, latitude: r.center[1], longitude: r.center[0], text: ''}); 
        setEstablishment(r.place_name)
        setGeoCode('')
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
            <div className='searchContainer'>
                <div className='searchInput' >
                    <input 
                        type= 'text'
                        onChange={(e) => handleInput(e)}
                        value={searchText.text}
                        id='establishment'
                        placeholder={establishment}
                    /> 
                    <Link to={"/results"}>
                        <FontAwesomeIcon onClick={(e) => handleSearch(e)} icon={faSearchLocation} className='faIcon'/>
                    </Link>
                </div>
                {/* {console.log(geoCode.features)} */}
                { geoCode !== undefined && geoCode !== '' ?
                    <div className='autoContainer' hidden={geoCode?false:true}>
                        {geoCode && geoCode.features.map(r => (
                            <div className='optionContainer' key={r.id} onClick={() => suggestionHandler(r)}>
                                <span>{r.place_name}</span>
                            </div>
                        ))}
                    </div>
                : null
                }
            </div>
        </div>
    </div>
  );
}

export default SearchBar;
