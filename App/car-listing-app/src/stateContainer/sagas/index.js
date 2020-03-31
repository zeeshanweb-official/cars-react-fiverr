import { takeLatest } from "redux-saga/effects"
import actionTypes from "../actions/action_types"
import { fetchVehicleSaga, fetchVehicleGuestSaga } from "./vehicleWatcher"
import { registerSaga, loginSaga } from "./authWatcher"

export default function* saga() {
    yield takeLatest(actionTypes.FETCH_VEHICLE_REQUEST, fetchVehicleSaga)
    yield takeLatest(actionTypes.FETCH_VEHICLE_GUEST_REQUEST, fetchVehicleGuestSaga)
    yield takeLatest(actionTypes.LOGIN_REQUEST, loginSaga)
    yield takeLatest(actionTypes.REGISTER_REQUEST, registerSaga)
}