import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from "../../axios-orders"
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux'
import { fetchOrders } from "../../store/actions/orders"


class Orders extends Component{
    // state = {
    //     orders: [],
    //     loading: true
    // }
    
    componentDidMount(){
        // axios.get('/orders.json')
        //     .then(res => {
        //         const fetchedOrders = [];
        //         for (let key in res.data) {
        //             fetchedOrders.push({
        //                 ...res.data[key],
        //                 id: key
        //             })
        //         }
        //         this.setState({loading: false, orders: fetchedOrders})
        //     })
        //     .catch(err => console.log(err))
        this.props.onMountOrders();
    }
    render () {
        return (
            <div>
                {this.props.orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={+order.totalPrice} />)}
            </div>
        )
    }


}

const mapStateToProps = state => {
    return {
        orders: state.orders
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onMountOrders: () => dispatch(fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));