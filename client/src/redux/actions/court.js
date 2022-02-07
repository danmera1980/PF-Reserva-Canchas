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


