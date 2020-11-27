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

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
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
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', res.data.localId);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeOut(res.data.expiresIn)); 
            })
            .catch(err => {
                console.log(err.response);
                dispatch(authFail(err.response.data.error));
            })
    }
}

export const setAuthRedirectPath = ( path ) => {
    return {
        type: ACTIONS.SET_AUTH_REDIRECT_PATH,
        payload: {
            path
        }
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(authLogout())
        } else {
            const expirationDate =  new Date(localStorage.getItem('expirationDate')) 
            if (expirationDate <= new Date()) dispatch(authLogout())
            else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime())/ 1000))
            }
        }
    }
}