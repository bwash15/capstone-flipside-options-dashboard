/** Going to attach interceptors that are going to attach the JWT and 
 *  retry the JWT when we get a failure on the first try due to an expired token
 * 
 **/

import axios from 'axios';
const BASE_URL = 'http://localhost:3600';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});