import * as ACTIONS from '../actions/actionTypes'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = ( state = initialState, action ) => {
    switch(action.type) {
        case ACTIONS.PURCHASE_BURGER_INIT:
            return {
                ...state,
                purchased: false
            }
        case ACTIONS.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            };
        case ACTIONS.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            }
        case ACTIONS.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case ACTIONS.FETCH_ORDER_START:
            return {
                ...state,
                loading: true
            }
        case ACTIONS.FETCH_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.orders
            }
        case ACTIONS.FETCH_ORDER_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export default reducer