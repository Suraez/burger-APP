import React, {Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom'

// redux
import { connect } from 'react-redux'

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data')
    }

    render(){
        return (
            <div>
                <CheckoutSummary 
                checkoutCancelled={this.checkoutCancelledHandler} 
                checkoutContinued={this.checkoutContinuedHandler} 
                ingredients={this.props.ings}/>

                <Route path={this.props.match.url + '/contact-data'} component={ContactData}/>         
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}


export default  connect(mapStateToProps)(Checkout);