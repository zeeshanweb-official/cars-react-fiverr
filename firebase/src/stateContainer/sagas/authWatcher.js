import { call, put } from 'redux-saga/effects'
import * as authActions from '../actions/authActions'
import {authApi, DOMAIN_URL, LoginApi} from '../../api'
import history from '../../routes/history'
export function* registerSaga({payload}) {
    try {
        const data = yield call(authApi, payload)
        let response = data
        if (response) {
            yield put(authActions.registerSuccess(response))
            history.push("/admin/login")
        } else {
            yield put(authActions.registerError({ statusCode: 404, message: 'Registration Failed' }))
        }
    } catch (error) {
        console.log(error)
        yield put(authActions.registerFailed({ statusCode: 500, message: 'Server Error' }))
    }
}

export function* loginSaga({payload}) {
    try {
        const data  = yield call(LoginApi, payload)
        let response = data
        if (response) {
            yield put(authActions.loginSuccess(response))
            if(response.user.email){
                localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, email: response.user.email })) 
            }
        } else {
            yield put(authActions.loginError({ vehicles: [], statusCode: 404, message: 'Not Found' }))
        }
        history.push("/admin/sellMyCar")
    } catch (error) {
        yield put(authActions.loginFailed({ vehicles: [], statusCode: 500, message: 'Server Error' }))
    }
}