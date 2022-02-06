import axios from 'axios';
import { SERVER_URL } from './actionNames';

export const postSite = (payload) => {
    return async function() {
        var site = await axios.post(`${SERVER_URL}/site`, payload)
        return site
    }
}