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


const MapStyle = 'mapbox://styles/mapbox/streets-v11';
const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;
//temp data
const markers = [
    {
        id: 1,
        name: "Cancha 1",
        latitude: -34.603722,
        longitude: -58.381592,
    },
    {
        id: 2,
        name: "Cancha 2",
        latitude: -34.550722,
        longitude: -58.481592,
    },
    {
        id: 3,
        name: "Cancha 3",
        latitude: -34.580722,
        longitude: -58.421592,
    },
    {
        id: 4,
        name: "Cancha 4",
        latitude: -34.590722,
        longitude: -58.471592,
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
                <Card/>
                <Card/>
                <Card/>
                <Card/>
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
                                {/* <Slider/> */}
                                <h2>{selectedCard.id} - {selectedCard.name}</h2>
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