import {GET_ESTABLISHMENT_BY_ID, GET_SITES_BY_ESTAB_ID, SERVER_URL} from './actionNames';
const axios = require('axios');

export function getEstablishmentById(userToken){
    const headers = {
        Authorization: `Bearer ${userToken}`,
      };
    return async function(dispatch){
        try {
            let user = await axios.get(`${SERVER_URL}/establishment/idUser`, { headers: headers })
            return dispatch({
                type: GET_ESTABLISHMENT_BY_ID,
                payload: user.data.cuit
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

export function getSitesById(establishmentId, userToken){
    const headers = {
        Authorization: `Bearer ${userToken}`,
      };
    return async function(dispatch){
        try {
            let info = await axios.get(`${SERVER_URL}/site/${establishmentId}`, { headers: headers })
            
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

