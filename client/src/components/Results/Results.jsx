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
import { useLocation } from 'react-router-dom';


const MapStyle = 'mapbox://styles/mapbox/streets-v11';
const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;

function Results() {
    const location = useLocation();
    const [ selectedCard, setSelectedCard] = useState(null);
    const [width, setWidth] = useState(window.innerWidth)
    const resultsData = useSelector(state => state.establishment.establishments);
    const [currentLocation, setCurrentLocation ] = useState({
        latitude: Number(location.state.latitude),
        longitude: Number(location.state.longitude)
    })
    
    // NO SE USA MÁS PORQUE SE SETEA DESDE EL SEARCHBAR
    // useEffect(()=> [
    //     navigator.geolocation.getCurrentPosition(position => {
    //         setCurrentLocation({...currentLocation, latitude: position.coords.latitude, longitude: position.coords.longitude})
    //         setViewport({
    //             ...viewport,
    //             latitude: position.coords.latitude, 
    //             longitude: position.coords.longitude 
    //         })
    //         console.log('My location', currentLocation)
    //     })
    // ],[])

    const [viewport, setViewport] = useState({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        width: width<1200?'400px':'600px',
        height: '85vh',
        zoom: 12,
        pitch: 50
    });


    const selectedCardClick = (event, card) => {
        setSelectedCard(card)
    }

    const getViewPort = (viewport) => {
        setViewport(viewport)
    }

  return (
    <div>
        <div className='fixed w-full z-50'>
            <Header />
        </div>
        
        {/* CORREGIR ESTILOS PARA QUE SE VEA EL SEARCHBAR */}
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div>
        <SearchBar getViewPort={getViewPort}/>
        </div>
        
        <div className='results'>
            <div className='leftResults'>
                {resultsData && resultsData?.map(m => m.sites.map(site => site.courts.map( court => (
                    <Card 
                        key= {court.id}
                        id= {m.cuit}
                        name= {site.name}
                        images= {court.image}
                        establishment= {m.name}
                        cuit={m.cuit}
                        court= {court.name}
                        courtId={court.id}
                        address= {site.street}
                        price= {court.price}
                        sport= {court.sport}
                        button={true}
                    />
                ))))}
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