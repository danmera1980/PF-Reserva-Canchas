import React, {useEffect, useState} from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import logo from "../../assets/img/logo.svg";
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEstablishment } from "../../redux/actions/establishment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Calendar from '../Calendar/Calendar'

const MapStyle = 'mapbox://styles/mapbox/streets-v11';
const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;
const disabledDates = [
    {
      year: 2022,
      month: 2,
      day: 23
    },
    {
      year: 2022,
      month: 6,
      day: 16
    },
    {
      year: 2022,
      month: 2,
      day: 12
    }
  ]
  const scheduledTime = [
    {
      year: 2022,
      month: 2,
      day: 18,
      times: [
        10,
        13,
        14,
        17,
        18
      ]
    },
    {
      year: 2022,
      month: 2,
      day: 19,
      times:[
        9,
        10,
        12,
        13,
        18,
        19,
        20
      ]
    }
  ]


export default function BookingCourt(){
    const {id, courtId} = useParams()
    const dispatch = useDispatch()
    const establishment = useSelector(state => state.establishment.establishmentDetail)
    const [currentLocation, setCurrentLocation ] = useState({
        latitude: 0,
        longitude: 0
    })
    const [viewport, setViewport] = useState({
        latitude: establishment?establishment.sites.latitude: currentLocation.latitude,
        longitude: establishment?establishment.sites.longitude: currentLocation.longitude,
        width: '600px',
        height: '85vh',
        zoom: 12,
        pitch: 50
    });

    useEffect(()=> [
        dispatch(getEstablishment(id,courtId)),
        navigator.geolocation.getCurrentPosition(position => {
            setCurrentLocation({...currentLocation, latitude: position.coords.latitude, longitude: position.coords.longitude})
            setViewport({
                ...viewport,
                latitude: establishment.sites[0].latitude, 
                longitude: establishment.sites[0].longitude 
            })
            console.log('My location', currentLocation)
        })
    ],[])
    
    useEffect(()=>{

        setViewport({
            ...viewport,
            latitude: establishment.sites[0].latitude, 
            longitude: establishment.sites[0].longitude 
        })
    },[])
    
    console.log(establishment)
    return(
        <div>
            <Header/>
            <div className="grid place-content-center  ">
                <div className="grid place-content-center ">
                    <img
                        src={establishment.logoImage?establishment.logoImage:logo}
                        alt="logo_establecimiento"
                        className=" rounded-xl max-w-3xl place-content-center "
                        /> 
                    <h1 className="font-bold text-center py-5 text-6xl dark:text-white ">{establishment.name}</h1>              
                </div>
                <h1 className="font-bold py-5 text-5xl dark:text-white ">{establishment.sites[0].name}</h1>
                <p className="font-bold py-5 text-2xl dark:text-white ">{establishment.sites[0].courts[0].name}</p>
                <p className="font-bold py-2  dark:text-white">Descripcion de cancha</p>
                <p className="font-bold py-2  dark:text-white">Deporte {establishment.sites[0].courts[0].sport}</p>
                <p className="max-w-2xl place-content-center font-bold text-center py-3 dark:text-white">{establishment.sites[0].courts[0].description}</p>
                <p className="font-bold py-2  dark:text-white">Ubicación {establishment.sites[0].city}, {establishment.sites[0].street}, {establishment.sites[0].streetNumber}</p>
                <p className="font-bold py-2  dark:text-white">Precio ${establishment.sites[0].courts[0].price}</p>
                <p className="font-bold py-2  dark:text-white">Horario de {establishment.timeActiveFrom} a {establishment.timeActiveTo}</p>
                <div>
                <Calendar 
                    disabledDates={disabledDates}
                    scheduledTime={scheduledTime}/>
                <ReactMapGL 
                    {...viewport}
                    onViewportChange={newView => setViewport(newView)}
                    mapboxApiAccessToken={mapboxToken}
                    mapStyle={MapStyle}
                    className="place-content-center"
                >
                    
                        <button key={establishment.sites[0].id}>
                            <Marker latitude={establishment.sites[0].latitude} longitude={establishment.sites[0].longitude}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} color='red' size='lg'/>
                            </Marker>
                        </button>
                   
                </ReactMapGL>
                </div>
                </div>
              
            <Footer/>
        </div>
    )
}