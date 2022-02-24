import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import Footer from "../Footer/Footer";
import Card from "../Card/Card";
import Map from '../Map/Map'
import "./Results.scss";

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
        <Header />
        <div className='fixed top-20 mt-5 w-full'>
            <SearchBar getViewPort={getViewPort}/>
        </div> 
        <div className='grid place-content-center md:flex md:flex-row gap-10 mt-[10vh] md:max-w-[1200px] m-auto'>
                {data.length ?
                <div className='h-[27rem] md:h-[68vh] snap-y snap-mandatory cardScrollbar overflow-x-hidden mt-32 md:mt-0'>
                     {data.map(m => m.sites.map(site => site.courts.map( court => (
                         <div className="pb-4 snap-start" key={court.id}>
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
                        </div>
                    ))))}
                </div>
                : <div className="flex place-content-center my-1 text-2xl w-full dark:text-white">No hay resultados para tu búsqueda</div>}
                
                <div className='lg:h-[68vh] overflow-hidden hidden md:block'>
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
