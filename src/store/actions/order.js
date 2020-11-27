import  * as ACTIONS from './actionTypes';
import axios from '../../axios-orders'

export const purhcaseBurgerSuccess = (id, orderData) => {
    return {
        type: ACTIONS.PURCHASE_BURGER_SUCCESS,
        orderId: id, 
        orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: ACTIONS.PURCHASE_BURGER_FAIL,
        error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: ACTIONS.PURCHASE_BURGER_START
    }
} 

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())  
        axios.post('/orders.json?auth=' + token, orderData)
            .then(res => {
                console.log(res.data);
                dispatch(purhcaseBurgerSuccess(res.data.name, orderData));
            })
            .catch(err => {
                dispatch(purchaseBurgerFail(err))
            })
    }
}

export const purchaseBurgerInit = () => {
    return {
        type: ACTIONS.PURCHASE_BURGER_INIT
    }
}

// order  related
export const fetchOrdersSuccess = ( orders ) => {
    return {
        type: ACTIONS.FETCH_ORDER_SUCCESS,
        orders
    }
}

export const fetchOrdersFail = ( error ) => {
    return {
        type: ACTIONS.FETCH_ORDER_FAIL,
        error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: ACTIONS.FETCH_ORDER_START
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch =>  {
        dispatch(fetchOrdersStart())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch(err => fetchOrdersFail(err))
    }
}