import * as ACTIONS from '../actions/actionTypes'

const initialState = {
    token: null,
    error: null,
    userId: null,
    loading: false
}

const reducer = ( state = initialState, action ) => {
    switch(action.type) {
        case ACTIONS.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            }
        case ACTIONS.AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                error: null,
                loading: false
            }
        
        case ACTIONS.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case ACTIONS.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            }
        default:
            return { ...state }
    }
}

export default reducer;