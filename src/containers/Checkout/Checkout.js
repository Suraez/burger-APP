import React, {Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

export default class Checkout extends Component {
    state = {
        ingredients: {
            meat: 1,
            bacon: 1,
            cheese: 1,
            salad: 1
        }
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-form')
    }


    render(){
        return (
            <div>
                <CheckoutSummary checkoutCancelled={this.checkoutCancelledHandler} checkoutContinued={this.checkoutContinuedHandler} ingredients={this.state.ingredients}/>           
            </div>
        )
    }
}

// import React, { Component } from 'react'

// export default class Checkout extends Component {
//     render() {
//         return (
//             <div>
                
//             </div>
//         )
//     }
// }
