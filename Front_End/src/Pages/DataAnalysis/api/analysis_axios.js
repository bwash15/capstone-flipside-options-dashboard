/** Going to attach interceptors that are going to attach the JWT and 
 *  retry the JWT when we get a failure on the first try due to an expired token
 * 
 const APP_BASE_URL = process.env.REACT_APP_API || 'http://localhost:';
 **/

import axios from 'axios';
const BASE_URL = 'http://localhost:';

export const filtersApi = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 1000,
    responseType: 'json',
    withCredentials: true
});
export const dayApi = axios.create({
    baseURL: BASE_URL + "3600",
    headers: { 'Content-Type': 'application/json' },
    timeout: 1000,
    responseType: 'json',
    withCredentials: true
});
export const detailsApi = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 1000,
    responseType: 'json',
    withCredentials: true
});
export const greeksApi = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 1000,
    responseType: 'json',
    withCredentials: true
});
export const last_quoteApi = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 1000,
    responseType: 'json',
    withCredentials: true
});
export const underlying_assetApi = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 1000,
    responseType: 'json',
    withCredentials: true
});
export const snapShotsApi = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 1000,
    responseType: 'json',
    withCredentials: true
});
export const aggregatesApi = axios.create({
    baseURL: BASE_URL + '3200',
    headers: { 'Content-Type': 'application/json' },
    timeout: 1000,
    responseType: 'json',
    withCredentials: true
});
export const postsApi = axios.create({
    baseURL: BASE_URL + '3300',
    headers: { 'Content-Type': 'application/json' },
    timeout: 1000,
    responseType: 'json',
    withCredentials: true
});
export const usersApi = axios.create({
    baseURL: BASE_URL + '5000',
    headers: { 'Content-Type': 'application/json' },
    timeout: 1000,
    responseType: 'json',
    withCredentials: true
});
export const userReqApi = axios.create({
    baseURL: BASE_URL + '5100',
    headers: { 'Content-Type': 'application/json' },
    timeout: 1000,
    responseType: 'json',
    withCredentials: true
});