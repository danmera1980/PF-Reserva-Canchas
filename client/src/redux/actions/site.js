import axios from 'axios';
const serverUrl = 'localhost'

export const postSite = (payload) => {
    return async function() {
        var site = await axios.post(`http://${serverUrl}:3001/site`, payload)
        return site
    }
}