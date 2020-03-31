import { combineReducers } from "redux"
import { fetchVehicles, fetchVehiclesGuest } from "./vehicle.reducer"
import { registerUser, loginUser, changeLocationOnSignIn } from './auth.reducer'
export const rootReducer = combineReducers({
    vehicles: fetchVehicles,
    vehiclesGuest: fetchVehiclesGuest,
    register: registerUser,
    login: loginUser,
    loginRedirect: changeLocationOnSignIn
})