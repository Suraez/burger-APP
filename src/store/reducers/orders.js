import * as ACTIONS from '../actions/actions'

const initialState = {
    orders: [],
    loading: false
}

const reducer = ( state = initialState, action ) => {
    switch(action.type) {
        case ACTIONS.GET_ORDERS_DATA:
            return {
                ...state,
                orders: action.orders,
                loading: true
            }
        default:
            return state;
    }
}

export default reducer;