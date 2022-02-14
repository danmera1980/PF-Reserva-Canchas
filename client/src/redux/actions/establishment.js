import {
        CLEAR_GEOCODE,
        GET_GEOCODE, 
        ALL_ESTABLISHMENTS, 
        FILTER_BY_LOCATION, 
        FILTER_BY_SPORT, 
        GET_ESTABLISHMENT, 
        SERVER_URL, 
        SORT_BY_AVAILABILITY, 
        SORT_BY_PRICE, 
        SEARCH_TEXT } from "./actionNames";
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

export const addUserToEstablishment = (payload) => {
    return async function() {
        var info = await axios.post(`${SERVER_URL}/establishment/addUserToEstablishment`, payload)
        return info
    }
}

export const getEstablishment = (id,courtId) => {
    return async (dispatch) => {
        var result = await axios.get(`${SERVER_URL}/establishment/${id}/${courtId}`);
        return dispatch({
            type: GET_ESTABLISHMENT,
            payload: result.data
        })
    }
}

export const allEstablishments = () => {
    return async (dispatch) => {
        var results = await axios(`${SERVER_URL}/cards`)
        return dispatch({
            type: ALL_ESTABLISHMENTS,
            payload: results.data
        })
    }
}

export const filterBySport = (sport) => {
    return async(dispatch) =>{
        var results = await axios(`${SERVER_URL}/findsport?sport=${sport}`)
        return dispatch({
            type: FILTER_BY_SPORT,
            payload: results.data
        })
    }
}

export const filterByLocation = (location) => {
    return async(dispatch) =>{
        var results = await axios(`${SERVER_URL}/findlocation?location=${location}`)
        return dispatch({
            type: FILTER_BY_LOCATION,
            payload: results.data
        })
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

export const sortByprice = () => {
    return async(dispatch) =>{
        var results = await axios(`${SERVER_URL}`)
        return dispatch({
            type: SORT_BY_PRICE,
            payload: results.data
        })
    }
}

export const sortByAvailability = () => {
    return async(dispatch) =>{
        var results = await axios(`${SERVER_URL}`)
        return dispatch({
            type: SORT_BY_AVAILABILITY,
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