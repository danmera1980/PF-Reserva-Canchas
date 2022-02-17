import { SERVER_URL } from './actionNames';

const axios = require('axios');



export const postCourt = (payload, userToken)=>{
  const headers = {
    Authorization: `Bearer ${userToken}`,
  };
  return async function () {
    const response = await axios.post(`${SERVER_URL}/court`, payload, { headers: headers });
    return response;
  };
  
}

export function deleteCourt(payload, userToken) {
  const headers = {
    Authorization: `Bearer ${userToken}`,
  };
payload={courtId:payload}
  return async function (dispatch) {
    try {
      const response = await axios.put(`${SERVER_URL}/court/updateStatusCourt`, payload, {
        headers: headers,
      });
      return"Se elimino el sitio" ;
    } catch (error) {
      console.log(error) ;
    }
  };
}


