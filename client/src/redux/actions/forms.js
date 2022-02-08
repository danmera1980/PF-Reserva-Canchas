import {GET_ESTABLISHMENT_BY_ID, GET_SITES_BY_ESTAB_ID, SERVER_URL} from './actionNames';
const axios = require('axios');

export function getEstablishmentByUser(userToken){
    const headers = {
        Authorization: `Bearer ${userToken}`,
      };
    return async function(dispatch){
        try {
            let user = await axios.get(`${SERVER_URL}/establishment/userId`, { headers: headers })
            return dispatch({
                type: GET_ESTABLISHMENT_BY_ID,
                payload: user.data.establishmentId 
            })    
        } catch (error) {
            console.log(error);
            return dispatch({
                type: GET_ESTABLISHMENT_BY_ID,
                payload: ''
            }) 

        }
    }
}

export function getSitesById(userToken){
    const headers = {
        Authorization: `Bearer ${userToken}`,
      };
    return async function(dispatch){
        try {
            let info = await axios.get(`${SERVER_URL}/site/userId`, { headers: headers })
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
                    name: '',  
                }]
            }) 

        }
    }
}

export function postEstablishment(payload, userToken){
    const headers = {
        Authorization: `Bearer ${userToken}`,
      };
    return async function() {
        var establishment = await axios.post(`${SERVER_URL}/establishment`, payload, { headers: headers })
        return establishment
    }
}