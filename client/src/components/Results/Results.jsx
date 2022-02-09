import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import Footer from '../Footer/Footer';
import Card from '../Card/Card';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import './Results.scss';
import Slider from '../Slider/Slider';
import { counter } from '@fortawesome/fontawesome-svg-core';


const MapStyle = 'mapbox://styles/mapbox/streets-v11';
const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;

// Data needed pulled from back:
        // court.id
        // court.images,
        // court.name,
        // court.price,
        // court,sport,
        // site.name,
        // site.address,
        // site.latitude,
        // site.longitude,
        // establishment.name


//temp data

const markers = [
    {
        id: 1,
        name: "Cancha 1",
        latitude: -34.603722,
        longitude: -58.381592,
        images: [],
        establishment: "Est 1",
        site: "Site 1",
        address: "home 1",
        price: 20,
        sport: "Futbol 11"
    },
    {
        id: 2,
        name: "Cancha 2",
        latitude: -34.550722,
        longitude: -58.481592,
        images: [],
        establishment: "Est 1",
        site: "Site 2",
        address: "home 1",
        price: 45,
        sport: "Futbol 11"
    },
    {
        id: 3,
        name: "Cancha 1",
        latitude: -34.580722,
        longitude: -58.421592,
        images: [],
        establishment: "Est 2",
        site: "Site 1",
        address: "home 2",
        price: 60,
        sport: "Futbol 11"
    },
    {
        id: 4,
        name: "Cancha 1",
        latitude: -34.590722,
        longitude: -58.471592,
        images: [],
        establishment: "Est 3",
        site: "Site 1",
        address: "home 11",
        price: 70,
        sport: "Futbol 11"
    }
];


function Results() {
    const [ selectedCard, setSelectedCard] = useState(null);
    const resultsData = useSelector(state => state.establishment.establishments);
    console.log(resultsData)
    const [currentLocation, setCurrentLocation ] = useState({
        latitude: 0,
        longitude: 0
    })
    
    useEffect(()=> [
        navigator.geolocation.getCurrentPosition(position => {
            setCurrentLocation({...currentLocation, latitude: position.coords.latitude, longitude: position.coords.longitude})
            console.log('My location', currentLocation)
        })
    ],[navigator])

    const [viewport, setViewport] = useState({
        latitude: resultsData.length?resultsData[0].sites[0].latitude: currentLocation.latitude,
        longitude: resultsData.length?resultsData[0].sites[0].longitude: currentLocation.longitude,
        width: '600px',
        height: '85vh',
        zoom: 10,
        pitch: 50
    });


    const selectedCardClick = (event, card) => {
        setSelectedCard(card)
    }

  return (
    <div>
        <Header />
        <div className='results'>
            <div className='leftResults'>
                <SearchBar />
                {resultsData?.map(m => (
                    <Card 
                        key= {m.id}
                        id= {m.id}
                        name= {m.sites[0].courts[0].name}
                        images= {m.sites[0].courts[0].images}
                        establishment= {m.name}
                        site= {m.sites[0].name}
                        address= {m.sites[0].street}
                        price= {m.sites[0].courts[0].price}
                        sport= {m.sites[0].courts[0].sport}
                    />
                ))}
            </div>
            <div className='rightResults'>
                <ReactMapGL 
                    {...viewport}
                    onViewportChange={newView => {setViewport(newView); console.log(newView)}}
                    mapboxApiAccessToken={mapboxToken}
                    mapStyle={MapStyle}
                >
                    {resultsData.map(m => (
                        <button key={m.id} 
                        onClick={e => selectedCardClick(e, {establishment: m.name, 
                                                            site: m.sites[0].name,
                                                            name: m.sites[0].courts[0].name, 
                                                            address: m.sites[0].street, 
                                                            sport: m.sites[0].courts[0].sport,
                                                            price: m.sites[0].courts[0].price,
                                                            latitude: m.sites[0].latitude,
                                                            longitude: m.sites[0].longitude})}>
                            <Marker latitude={m.sites[0].latitude} longitude={m.sites[0].longitude}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} color='red' size='lg'/>
                            </Marker>
                        </button>
                    ))}
                    {selectedCard ? (
                        <Popup latitude={selectedCard.latitude} longitude={selectedCard.longitude} onClose={() => setSelectedCard(null)}>
                        <div>
                            <Slider/>
                            <h2>{selectedCard.establishment}</h2>
                            <h3>{selectedCard.site} - {selectedCard.name}</h3>
                            <h4>{selectedCard.address} <span>City</span></h4>
                            <h4>{selectedCard.sport}</h4>
                            <h3>${selectedCard.price}</h3>
                        </div>
                        </Popup>
                    ):null}
                </ReactMapGL>
            </div>
        </div>
        <Footer />
    </div>
  );
}

export default Results;