import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from "../../axios-orders"
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { fetchOrders } from '../../store/actions'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component{
    state = {
        orders: [],
        loading: true
    }
    
    componentDidMount(){
        this.props.onFetchOrders(this.props.token);
    }
    render () {
        return (
          <div>
            {this.props.orders ? (
              this.props.orders.map((order) => (
                <Order
                  key={order.id}
                  ingredients={order.ingredients}
                  price={+order.totalPrice}
                />
              ))
            ) : (
              <Spinner />
            )}
          </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(fetchOrders(token))
    }
}

export default connect( mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));