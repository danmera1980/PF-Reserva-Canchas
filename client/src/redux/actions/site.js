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