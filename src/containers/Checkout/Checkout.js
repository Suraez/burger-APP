import React, {Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData';
import { Redirect, Route } from 'react-router-dom'

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
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
        return (
          <>
            {purchasedRedirect}
            {this.props.ings ? (
              <div>
                <CheckoutSummary
                  checkoutCancelled={this.checkoutCancelledHandler}
                  checkoutContinued={this.checkoutContinuedHandler}
                  ingredients={this.props.ings}
                />

                <Route
                  path={this.props.match.url + "/contact-data"}
                  component={ContactData}
                />
              </div>
            ) : (
              <Redirect to="/" />
            )}
          </>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        purchased: state.order.purchased
    }
}

export default  connect( mapStateToProps )(Checkout);