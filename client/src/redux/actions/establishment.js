import {
        CLEAR_GEOCODE,
        GET_GEOCODE, 
        SERVER_URL, 
        SEARCH_TEXT,
        ALL_ACTIVE_ESTAB } from "./actionNames";
import axios from 'axios';

const mapToken = process.env.REACT_APP_MAPBOX_TOKEN;

export function postEstablishment(payload, userToken){
    const headers = {
        Authorization: `Bearer ${userToken}`,
      };
    return async function() {
        var establishment = await axios.post(`${SERVER_URL}/establishment`, payload, { headers: headers })
        return establishment
    }
}

export function getAllActiveEstablishments(){
    return async(dispatch)=>{
        var allEstab = await axios.get(`${SERVER_URL}/establishment`)
        return dispatch({
            type: ALL_ACTIVE_ESTAB,
            payload: allEstab.data
        })
    }
    
}

export const addUserToEstablishment = (payload) => {
    return async function() {
        var info = await axios.post(`${SERVER_URL}/establishment/addUserToEstablishment`, payload)
        return info
    }
}

export const searchByText = (searchText) => {
    console.log(searchText)
    const {latitude, longitude, zoom, sport} = searchText
    return async(dispatch) =>{
        var results = await axios(`${SERVER_URL}/findlocation?latitude=${latitude}&longitude=${longitude}&zoom=${zoom}&sport=${sport}`)
        return dispatch({
            type: SEARCH_TEXT,
            payload: results.data
        })
    }
}

export const getGeocode = (searchText) => {
    return async(dispatch) => {
        if(searchText !== ''){
            var results = await axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?access_token=${mapToken}`);
        } else {
            var results = {data:''}
        }
        return dispatch({
            type: GET_GEOCODE,
            payload: results.data
        })
    }
}

export const clearGeocode = (searchText) => {
    return async(dispatch) => {
        return dispatch({
            type: CLEAR_GEOCODE,
            payload: ''
        })
    }
}