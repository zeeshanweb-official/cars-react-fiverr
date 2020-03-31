import axios from 'axios'
import firebase from './config/fire'
// export const DOMAIN_URL = "http://localhost:7000";
export const DOMAIN_URL = "https://car-listing-api.herokuapp.com";
export const authApi = (params) => {
   return firebase.auth().createUserWithEmailAndPassword(params.email, params.password)
}
export const LoginApi = (params) => {
   return firebase.auth().signInWithEmailAndPassword(params.email, params.password)
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