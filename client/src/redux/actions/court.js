import { SERVER_URL } from './actionNames';

const axios = require('axios');



export function postCourt(payload) {
    try {
      return async function (dispatch) {
        const response = await axios.post(
          `${SERVER_URL}/court`,
          payload
        );
        return response;
      };
    } catch (e) {
      console.log(e.response.data);
    }
  }


