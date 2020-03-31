import actionType from "./action_types"
export const registerRequest = (data) => {
    return {
        type: actionType.REGISTER_REQUEST,
        payload: data
    }
}

export const registerSuccess = (response) => ({
    type: actionType.REGISTER_SUCCESS,
    payload: response
})

export const registerError = (response) => ({
    type: actionType.REGISTER_ERROR,
    message: response.message
})

export const registerFailed = (response) => ({
    type: actionType.REGISTER_FAILED,
    message: response.message
})

//Login action creators

export const loginRequest = (data) => ({
    type: actionType.LOGIN_REQUEST,
    payload:data
})

export const loginSuccess = (response) => ({
    type: actionType.LOGIN_SUCCESS,
    payload: response
})

export const loginError = (response) => ({
    type: actionType.LOGIN_ERROR,
    message: response.message
})

export const loginFailed = (response) => ({
    type: actionType.LOGIN_FAILED,
    message: response.message
})

export const loginRedirect = (value) => ({
    type: actionType.LOGIN_REDIRECT,
    redirect: true
})