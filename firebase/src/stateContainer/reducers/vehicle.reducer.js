import actions from "../actions/action_types"

const initial = {
    isFetching: false,
    vehicles: [],
}

export const fetchVehiclesGuest = (state = initial, action) => {
    switch (action.type) {
        case actions.FETCH_VEHICLE_GUEST_REQUEST:
            return { ...state, isFetching: true }

        case actions.FETCH_VEHICLE_SUCCESS:
            return { ...state, isFetching: false, vehicles: [...action.payload] }

        case actions.FETCH_VEHICLE_ERROR:
            return { ...state, response: action.payload }

        default:
            return state
    }
}

export const fetchVehicles = (state = initial, action) => {
    switch (action.type) {
        case actions.FETCH_VEHICLE_REQUEST:
            return { ...state, isFetching: true }

        case actions.FETCH_VEHICLE_SUCCESS:
            return { ...state, isFetching: false, vehicles: [...action.payload] }

        case actions.FETCH_VEHICLE_ERROR:
            return { ...state, response: action.payload }

        default:
            return state
    }
}