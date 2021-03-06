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
    const [establishment, setEstablishment] = useState('Ubicación');
    const [currentLocation, setCurrentLocation ] = useState({
        latitude: 0,
        longitude: 0
    })

    const history = useHistory();
    
    const dispatch= useDispatch();
    const [searchText, setSearchText] = useState({
        latitude:0,
        longitude:0,
        sport: '',
        text: '',
        zoom: 10
    });

    const [sportType, setSportType] = useState('');

    useEffect(()=> [
        navigator.geolocation.getCurrentPosition(position => {
            setCurrentLocation({...currentLocation, latitude: position.coords.latitude, longitude: position.coords.longitude})
            setSearchText({
                ...searchText,
                latitude: position.coords.latitude, 
                longitude: position.coords.longitude 
            })
            console.log('My location', currentLocation)
        })
    ],[])

    useEffect(() => {
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
        
        getViewPort({
            latitude: searchText.latitude,
            longitude: searchText.longitude
        })
        dispatch(searchByText(searchText));
        setSearchText({
            latitude:'',
            longitude:'',
            sport: '',
            text: '',
            zoom: 10
        })
        history.push({pathname: '/results', state:{latitude:searchText.latitude, longitude:searchText.longitude}})
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
                        autoComplete = "off"
                    /> 
                    <Link to={"/results"}>
                        <FontAwesomeIcon onClick={(e) => handleSearch(e)} icon={faSearchLocation} className='faIcon'/>
                    </Link>
                </div>
                { geoCode !== undefined && geoCode !== '' ?
                    <div className='autoContainer transition-all overflow-y-auto max-h-48 sScrollbar rounded-md' hidden={geoCode?false:true}>
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
