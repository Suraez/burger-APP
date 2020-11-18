import * as ACTIONS from './actions'
import axios from 'axios'

export const getOrders = orders => {
    return {
        type: ACTIONS.GET_ORDERS_DATA,
        orders
    }
}

export const fetchOrders = () => {
    return dispatch => {
        axios.get('https://burgerapp-c0935.firebaseio.com/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                console.log(fetchOrders, "from orders")
                dispatch(getOrders(fetchedOrders))
            })
            .catch(err => console.log(err))
    }
}
