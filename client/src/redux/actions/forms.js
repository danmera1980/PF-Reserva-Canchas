import {GET_ESTABLISHMENT_BY_ID, GET_SITES_BY_ESTAB_ID, SERVER_URL} from './actionNames';
const axios = require('axios');

export function getEstablishmentByUser(userId){
    return async function(dispatch){
        try {
            let user = await axios.get(`${SERVER_URL}/establishment/${userId}`)
            return dispatch({
                type: GET_ESTABLISHMENT_BY_ID,
                payload: user.data.establishmentId 
            })    
        } catch (error) {
            console.log(error);
            return dispatch({
                type: GET_ESTABLISHMENT_BY_ID,
                payload: 'No Results'
            }) 

        }
    }
}

export function getSitesByEstablishmentId(estabId){
    return async function(dispatch){
        try {
            let info = await axios.get(`${SERVER_URL}/site/${estabId}`)
            return dispatch({
                type: GET_SITES_BY_ESTAB_ID,
                payload: info.data 
            })    
        } catch (error) {
            console.log(error);
            return dispatch({
                type: GET_SITES_BY_ESTAB_ID,
                payload: [{
                    id : '',
                    name: 'No Results',  
                }]
            }) 

        }
    }
}

