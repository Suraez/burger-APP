import Axios from 'axios'
import * as ACTIONS from './actionTypes'

export const authStart = () => {
    return {
        type: ACTIONS.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: ACTIONS.AUTH_SUCCESS,
        token,
        userId
    }
}

export const authFail = (error) => {
    return {
        type: ACTIONS.AUTH_FAIL,
        error
    }
}

const authLogout = () => {
    return {
        type: ACTIONS.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD287pBntjmUqhO-BIuNcKHp7oK_9KTTMs'
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD287pBntjmUqhO-BIuNcKHp7oK_9KTTMs'
        }
        Axios.post(url, authData)
            .then(res => {
                console.log(res);
                dispatch(authSuccess(res.data.idToken, res.data.localId))
                dispatch(checkAuthTimeOut(res.data.expiresIn))
            })
            .catch(err => {
                console.log(err.response);
                dispatch(authFail(err.response.data.error));
            })
    }
}