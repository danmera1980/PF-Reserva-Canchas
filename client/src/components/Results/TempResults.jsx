import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import Footer from '../Footer/Footer';
import Card from '../Card/Card';
import Map from '../Map/Map';
import Slider from '../Slider/Slider';
// import { useLocation } from 'react-router-dom';


const MapStyle = 'mapbox://styles/mapbox/streets-v11';
const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;

function Results() {
    // const location = useLocation();
    const [ selectedCard, setSelectedCard] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [width, setWidth] = useState(window.innerWidth)
    const data = useSelector(state => state.establishment.establishments);
    const resultsData = {
      features: data?.map(d => {
        return {
          type: "Feature",
          properties: {
            establishment: d.name,
            site: d.sites[0].name,
            court: d.sites[0].courts[0].name,
            address: d.sites[0].street,
            sport: d.sites[0].courts[0].sport,
            price: d.sites[0].courts[0].price
          },
          geometry: {
            coordinates: [d.sites[0].longitude, d.sites[0].latitude],
            type: "Point"
          }
        }
    })}
    console.log(resultsData)
    // eslint-disable-next-line no-unused-vars
    const [currentLocation, setCurrentLocation ] = useState([0,0])
   
    
    
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

    const getViewPort = (viewport) => {
        setCurrentLocation([viewport.longitude, viewport.latitude])
    }

  return (
    <div>
        <div className='fixed top-0 w-full z-1'>
            <Header />
            <SearchBar getViewPort={getViewPort}/>
        </div> 
        <div className='flex flex-row ml-20 gap-10 mt-[23vh] w-90 p-2 z-10 h-70'>
                {data.length ?
                <div className='basis-1/2 h-[68vh] sm:h-[68vh] overflow-y-auto scrollbar snap-y snap-mandatory overflow-x-hidden'>
                     {data.map(m => m.sites.map(site => site.courts.map( court => (
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
                : <div className="flex place-content-center my-1 text-2xl w-full dark:text-white">No hay resultados para tu búsqueda</div>}
                
                <div className='basis-1/2 h-[68vh] sm:h-[68vh] overflow-y-hidden relative'>
                  <Map
                    location= {currentLocation}
                    markers={resultsData}
                  />
                </div> 
        </div>
        <Footer />
    </div>
  );
}

export default Results;
