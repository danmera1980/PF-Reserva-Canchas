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

const MapStyle = 'mapbox://styles/mapbox/streets-v11';
const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;


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
    
    console.log(establishment.sites[0].latitude)
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
                <h1 className="font-bold py-5 text-4xl dark:text-white ">{establishment.sites[0].name}</h1>
                <h1 className="font-bold py-5 text-3x1 dark:text-white ">{establishment.sites[0].courts[0].name}</h1>
                <h5 className="max-w-2xl place-content-center font-bold text-center py-5 text-2xl dark:text-white">{establishment.sites[0].courts[0].description}</h5>
                <div>
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