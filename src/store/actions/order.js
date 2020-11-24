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
                // this.setState({loading: false})
                // this.props.onOrderClicked();
                // this.props.history.push('/')
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

export const fetchOrders = (token) => {
    return dispatch =>  {
        dispatch(fetchOrdersStart())
        axios.get('/orders.json?auth=' + token)
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