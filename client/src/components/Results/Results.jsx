import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import Footer from '../Footer/Footer';
import apiKey from ''
import './Results.scss';

export default function Results() {

    // const {} = useLoadScript{()}
  return (
    <div>
        <Header />
        <div className='results'>
            <div className='leftResults'>
                <SearchBar />
            </div>
            <div className='rightResults'>
                map here
            </div>
        </div>
        <Footer />
    </div>
  );
}

