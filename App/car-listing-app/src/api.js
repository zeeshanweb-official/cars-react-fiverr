import axios from 'axios'
// export const DOMAIN_URL = "http://localhost:7000";
export const DOMAIN_URL = "https://car-listing-api.herokuapp.com";
export const authApi = (endPoint, params) => {
    return axios.request({
        method: 'POST',
        url: endPoint,
        data: params
    });
}

export const fetchDataApi = (endPoint, phone) => {
    return axios.request({
        method: 'GET',
        url: endPoint,
        params: {
            phone
        }
    });
}

export const fetchVehicleDataApi = (endPoint) => {
    return axios.request({
        method: 'GET',
        url: endPoint
    });
}