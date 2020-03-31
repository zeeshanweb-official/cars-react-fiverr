import actions from "../actions/action_types"

const initial = {
    loading: false,
    user: {},
}

export const registerUser = (state = initial, action) => {
    switch (action.type) {
        case actions.REGISTER_REQUEST:
            return { ...state, loading: true }

        case actions.REGISTER_SUCCESS:
            return { ...state, loading: false, user: action.payload }

        case actions.REGISTER_ERROR:
            return { ...state, response: action.payload }

        default:
            return state
    }
}

export const loginUser = (state = initial, action) => {
    switch (action.type) {
        case actions.LOGIN_REQUEST:
            return { ...state, loading: true }

        case actions.LOGIN_SUCCESS:
            return { ...state, loading: false, user: action.payload }

        case actions.LOGIN_ERROR:
            return { ...state, response: action.payload }

        default:
            return state
    }
}

export const changeLocationOnSignIn = (state = initial, action) => {
    switch (action.type) {
        case actions.LOGIN_REDIRECT:
            return { ...state, loading: false, redirect: action.redirect }
        default:
            return state
    }
}