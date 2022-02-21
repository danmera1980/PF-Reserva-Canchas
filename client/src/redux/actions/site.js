import axios from 'axios';
import { SERVER_URL } from './actionNames';

export const postSite = (payload, userToken) => {
    const headers = {
        Authorization: `Bearer ${userToken}`,
      };
    return async function() {
        var site = await axios.post(`${SERVER_URL}/site`, payload, { headers: headers })
        return site
    }
}

export function deleteSite(payload, userToken) {
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
  payload={siteId:payload}
    return async function (dispatch) {
      try {
        const response = await axios.put(`${SERVER_URL}/site/updateStatusSite`, payload, {
          headers: headers,
        });
        return"Se elimino el sitio" ;
      } catch (error) {
        console.log(error) ;
      }
    };
  }
