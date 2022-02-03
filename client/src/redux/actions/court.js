const axios = require('axios');
const serverUrl = 'localhost';



export function postCourt(payload) {
    try {
      return async function (dispatch) {
        const response = await axios.post(
          `http://${serverUrl}:3001/court`,
          payload
        );
        return response;
      };
    } catch (e) {
      console.log(e.response.data);
    }
  }


