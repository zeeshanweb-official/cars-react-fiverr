import { call, put } from 'redux-saga/effects'
import * as authActions from '../actions/authActions'
import {authApi, DOMAIN_URL} from '../../api'
import history from '../../routes/history'
export function* registerSaga({payload}) {
    try {
        const { data } = yield call(authApi, `${DOMAIN_URL}/users/admin/register`, payload)
        let response = data
        console.log(response)
        if (response) {
            yield put(authActions.registerSuccess(response))
        } else {
            yield put(authActions.registerError({ statusCode: 404, message: 'Registration Failed' }))
        }
    } catch (error) {
        yield put(authActions.registerFailed({ statusCode: 500, message: 'Server Error' }))
    }
}

export function* loginSaga({payload}) {
    try {
        const { data } = yield call(authApi, `${DOMAIN_URL}/users/admin/login`, payload)
        let response = data
        if (response) {
            yield put(authActions.loginSuccess(response))
            let success = response.success
            if(success === 1){
                localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, phone: response.user.phone_number }))
                history.push({ pathname: '/admin/sellMyCar'})
            }
        } else {
            yield put(authActions.loginError({ vehicles: [], statusCode: 404, message: 'Not Found' }))
        }
    } catch (error) {
        yield put(authActions.loginFailed({ vehicles: [], statusCode: 500, message: 'Server Error' }))
    }
}