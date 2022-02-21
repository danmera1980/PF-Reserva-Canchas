import React, {useEffect, useState} from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import logo from "../../assets/img/logo.svg";
import ReactMapGL, { Marker } from 'react-map-gl';
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Calendar from '../Calendar/Calendar'
import axios from "axios";
import { SERVER_URL } from "../../redux/actions/actionNames";
import MercadoPago from '../MercadoPago/MercadoPago'
import Swal from "sweetalert2";

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
    const history = useHistory()
    const {courtId} = useParams()
    const [court, setCourt] = useState([])
    const nowDateTime = new Date()
    const currentDateTime = {
        year: nowDateTime.getFullYear(),
        month:nowDateTime.getMonth()+1,
        day: nowDateTime.getDate(),
        hour: nowDateTime.getHours()
    }
    const [disabledDates, setDisableDates] = useState([]);
    const [scheduledTime, setScheduledTime] = useState([]);
    const [input, setInput] = useState({
        userId: null,
        courtId : null,
        courtName: '', 
        price: null,
        startTime: "",
        endTime: "",
        status : ''
    })
    const [currentLocation, setCurrentLocation ] = useState({
        latitude: 0,
        longitude: 0
    })
    const [viewport, setViewport] = useState({
        latitude: currentLocation.latitude,
        longitude:  currentLocation.longitude,
        width: '600px',
        height: '400px',
        zoom: 12,
        pitch: 50
    });
    const userToken = useSelector((state) => state.register.userToken);
    const [userId, setUserId] = useState('')

    const selectedBooking = (data) => {
        if(userToken === null){
            Swal.fire({
                title: "Ingresa a tu cuenta para que puedas reservar",
                confirmButtonText: "Ok",
            }).then((result) => {
                if (result.isConfirmed) {
                  history.push("/login");
                }
              });
            }
        setInput({
            ...input,
            startTime: data.startTime.toString(),
            endTime: data.endTime.toString(),
            userId: userId.id
        })
    }

    useEffect(()=> [
        axios
            .get(`${SERVER_URL}/court/${courtId}`)
            .then(res => {
                setCourt(res.data)
                setInput({
                    ...input,
                    courtId : res.data.id,
                    courtName: res.data.name, 
                    price: res.data.price,
                })
                setViewport({
                    ...viewport,
                    latitude: res.data.site.latitude, 
                    longitude: res.data.site.longitude 
                })
            }),
        navigator.geolocation.getCurrentPosition(position => {
            setCurrentLocation({...currentLocation, latitude: position.coords.latitude, longitude: position.coords.longitude})
        }),
    ],[courtId])
    
    useEffect(() => {
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };
      axios
        .get(`${SERVER_URL}/users/profile`, { headers: headers })
        .then((res) => {
            setUserId(res.data)
        });
    }, [userToken])
    
    return(
        <div>
            <Header/>
            {court.name ? <div className="grid place-content-center  ">
                <div className="grid place-content-center ">
                    <img
                        src={court.site.establishment.logoImage ? court.site.establishment.logoImage : logo}
                        alt="logo_establecimiento"
                        className=" rounded-xl max-w-3xl place-content-center pb-5 "
                        /> 
                </div>
                <div className="bg-white dark:bg-slate-600 p-5 content-center">
                    <h1 className="font-bold text-center py-5 text-6xl dark:text-white ">{court?.site.establishment.name}</h1>              
                    <h1 className="font-bold py-5 text-5xl dark:text-white ">{court?.site.name}</h1>
                    <p className="font-bold py-5 text-2xl dark:text-white ">{court?.name}</p>
                    <p className="font-bold py-2  dark:text-white">Descripcion de cancha</p>
                    <p className="font-bold py-2  dark:text-white">Deporte:  {court?.sport}</p>
                    <p className="max-w-2xl place-content-center font-bold text-center py-3 dark:text-white">{court?.description}</p>
                    <p className="font-bold py-2  dark:text-white">Ubicación {court?.site.city}, {court?.site.street}, {court?.site.streetNumber}</p>
                    <p className="font-bold py-2  dark:text-white">Precio ${court.price}</p>
                    <p className="font-bold py-2  dark:text-white">Horario de {court?.site.establishment.timeActiveFrom} a {court?.site.establishment.timeActiveTo}</p>
                </div>
                <div>
                <Calendar 
                    disabledDates={disabledDates}
                    scheduledTime={scheduledTime}
                    selectedBooking={selectedBooking}
                    currentDateTime={currentDateTime}
                />
                {
                    input.startTime.length && input.endTime.length ?
                    <MercadoPago booking={input}/> :
                    null 
                }
                <ReactMapGL 
                    {...viewport}
                    onViewportChange={newView => setViewport(newView)}
                    mapboxApiAccessToken={mapboxToken}
                    mapStyle={MapStyle}
                    className="place-content-center"
                >                    
                            <Marker latitude={court?.site.latitude} longitude={court?.site.longitude}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} color='red' size='lg'/>
                            </Marker>                   
                </ReactMapGL>
                
                </div>
                </div> : null}
              
            <Footer/>
        </div>
    )
}