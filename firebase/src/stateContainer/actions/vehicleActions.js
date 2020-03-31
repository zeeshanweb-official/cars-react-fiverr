import actionType from "./action_types"
export const fetchVehicleRequest = (auth) => ({
    type: actionType.FETCH_VEHICLE_REQUEST,
    payload: auth
})

export const fetchVehicleGuestRequest = (auth) => ({
    type: actionType.FETCH_VEHICLE_GUEST_REQUEST
})

export const fetchVehicleSuccess = (response) => ({
    type: actionType.FETCH_VEHICLE_SUCCESS,
    payload: response
})

export const fetchVehicleError = (response) => ({
    type: actionType.FETCH_VEHICLE_ERROR,
    message: response.message
})

export const fetchVehicleFailed = (response) => ({
    type: actionType.FETCH_VEHICLE_ERROR,
    message: response.message
})

export const fetchVehicleLoading = () => ({
    type: actionType.FETCH_VEHICLE_LOADING,
})