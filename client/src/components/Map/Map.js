/* eslint import/no-webpack-loader-syntax: off */
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl';
import './Map.css';

const MapStyle = 'mapbox://styles/mapbox/streets-v11';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
const Map = ({location, markers}) => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(-87.65);
  const [lat, setLat] = useState(41.84);
  const [zoom, setZoom] = useState(12);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: MapStyle,
      center: location,
      zoom: zoom,
    });

    // Create default markers
    markers.features.map((marker) =>
        {
            console.log(marker)
            new mapboxgl.Marker()
            .setLngLat(marker.geometry.coordinates)
            .setPopup(
                new mapboxgl.Popup({ offset: 25 })
                .setHTML(
                    `<h3>${marker.properties.title}</h3><p>${marker.properties.description}</p>`
                )
            )
            .addTo(map)
        }
    );

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="sidebarStyle">
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default Map;