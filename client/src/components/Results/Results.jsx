import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import Footer from '../Footer/Footer';
import Card from '../Card/Card';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import mapboxgl from 'mapbox-gl';
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
    const [viewport, setViewport] = useState({
        latitude: -34.570722,
        longitude: -58.381592,
        width: '600px',
        height: '100vh',
        zoom: 10,
        pitch: 50
    });

    const [ selectedCard, setSelectedCard] = useState(null);

    const selectedCardClick = (event, card) => {
        setSelectedCard(card)
    }

  return (
    <div>
        <Header />
        <div className='results'>
            <div className='leftResults'>
                <SearchBar />
                {markers?.map(m => (
                    <Card 
                        key= {m.id}
                        id= {m.id}
                        name= {m.name}
                        images= {m.images}
                        establishment= {m.establishment}
                        site= {m.site}
                        address= {m.address}
                        price= {m.price}
                        sport= {m.sport}
                    />
                ))}
            </div>
            <div className='rightResults'>
                <ReactMapGL 
                    {...viewport}
                    onViewportChange={newView => setViewport(newView)}
                    mapboxApiAccessToken={mapboxToken}
                    mapStyle={MapStyle}
                >
                    {markers.map(m => (
                        <button key={m.id} onClick={e => selectedCardClick(e, m)}>
                            <Marker latitude={m.latitude} longitude={m.longitude}>
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
                                <h3>{selectedCard.price}</h3>
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