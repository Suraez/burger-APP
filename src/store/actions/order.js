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

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())  
        axios.post('/orders.json', orderData)
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