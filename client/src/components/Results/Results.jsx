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


const MapStyle = 'mapbox://styles/mapbox/streets-v11';
const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;

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
        <div className='fixed z-10'>
        <Header />
        </div>
        <div className='results'>
            <div className='leftResults'>
                <SearchBar />
                {resultsData && resultsData?.map(m => (
                    <Card 
                        key= {m.cuit}
                        id= {m.cuit}
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
                    onViewportChange={newView => setViewport(newView)}
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