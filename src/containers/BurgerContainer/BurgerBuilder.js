import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICE = {
    salad: 0.4,
    meat: 1.5,
    bacon: 0.9,
    cheese: 0.3 
}

export default class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state ={
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 2,
            purchaseable: false,
            purchasing: false
        }
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
                        .map(igKey => ingredients[igKey])
                        .reduce((sum, el) => sum+el, 0)

        this.setState({purchaseable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        let updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
        this.updatePurchaseState(updatedIngredients);
    }


    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] > 0 ){
            const updatedCount = this.state.ingredients[type] - 1;
            let updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount
            const newPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];
            this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
            this.updatePurchaseState(updatedIngredients);
        }
    }


    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        alert("You continued!!!")
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }


        return (
          <React.Fragment>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                <OrderSummary ingredients={this.state.ingredients} 
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                totalPrice = {this.state.totalPrice}/>
            </Modal>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls
              ingredientAdded={this.addIngredientHandler}
              ingredientRemoved={this.removeIngredientHandler}
              disabled={disabledInfo}
              purchaseable={this.state.purchaseable}
              ordered={this.purchaseHandler}
              price={this.state.totalPrice}
            />
          </React.Fragment>
        );
    }
}
