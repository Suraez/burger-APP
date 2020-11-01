import React from 'react'
import Button from '../../UI/Button/Button';

// import {NavLink} from "react-router-dom"

export default class OrderSummary extends React.Component {
  componentDidUpdate(){
    console.log("from ordersummary");
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map((igKey) => (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {this.props.ingredients[igKey]}
      </li>
    ));
    return (
      <>
        <h3>Your Order</h3>
        <p>A delicious Burger with the following ingredients: </p>
        <ul>{ingredientSummary}</ul>
        <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
        <p>Continue to checkout ?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        {/* <NavLink to="/checkout"> */}
          <Button btnType="Success" clicked={this.props.purchaseContinued}>
            CONTINUE
          </Button>
        {/* </NavLink>    */}
      </>
    );
  }
}
