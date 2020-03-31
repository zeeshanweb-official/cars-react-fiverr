import { call, put } from 'redux-saga/effects'
import { fetchDataApi, fetchVehicleDataApi, DOMAIN_URL} from '../../api'

import * as vehicleActions from '../actions/vehicleActions'

export function* fetchVehicleSaga({payload_}) {
    let phone = null
    let payload = JSON.parse(localStorage.getItem('auth'));
    if(payload){
        phone = payload.phone
    }
    try {
        const vehicleData = yield call(fetchDataApi, `${DOMAIN_URL}/vehicles`, phone)
        let response = vehicleData.data
        if (response) {
            yield put(vehicleActions.fetchVehicleSuccess(response))
        } else {
            yield put(vehicleActions.fetchVehicleError({ vehicles: [], statusCode: 404, message: 'Not Found' }))
        }
    } catch (error) {
        yield put(vehicleActions.fetchVehicleFailed({ vehicles: [], statusCode: 500, message: 'Server Error' }))
    }
}

export function* fetchVehicleGuestSaga() {
    try {
        const vehicleData = yield call(fetchVehicleDataApi, `${DOMAIN_URL}/vehicles`)
        let response = vehicleData.data
        if (response) {
            yield put(vehicleActions.fetchVehicleSuccess(response))
        } else {
            yield put(vehicleActions.fetchVehicleError({ vehicles: [], statusCode: 404, message: 'Not Found' }))
        }
    } catch (error) {
        yield put(vehicleActions.fetchVehicleFailed({ vehicles: [], statusCode: 500, message: 'Server Error' }))
    }
}