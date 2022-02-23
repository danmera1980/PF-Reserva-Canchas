/* eslint import/no-webpack-loader-syntax: off */

import React from "react";
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import mapboxgl from '!mapbox-gl/dist/mapbox-gl.js';
import './Map.css';

const  PK_TOKEN_MAP  = process.env.REACT_APP_MAPBOX_TOKEN;
const MapStyle = 'mapbox://styles/mapbox/streets-v11';

mapboxgl.accessToken = PK_TOKEN_MAP;



export default function Map({ address }) {

    // paso el token
    const mapboxClient = mbxGeocoding({ accessToken: mapboxgl.accessToken });
    mapboxClient
        .forwardGeocode({
            // direccion
            query: address,
            autocomplete: false,
            limit: 1
        })
        .send()
        .then((response) => {
            if (
                !response ||
                !response.body ||
                !response.body.features ||
                !response.body.features.length
            ) {
                console.error('Invalid response:');
                console.error(response);
                return;
            }
            const feature = response.body.features[0];

            const map = new mapboxgl.Map({
                container: 'map',
                style: MapStyle,
                center: feature.center,
                //Zoom de la ubicacion
                zoom: 15
            });

            // crea un marker y lo agrega al mapa.
            new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
        });

    return <div id='map'></div>
}