import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

// importing axios instance from axios.orders instance
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';



const INGREDIENTS_PRICE = {
    salad: 0.4,
    meat: 1.5,
    bacon: 0.9,
    cheese: 0.3 
}

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state ={
            ingredients: null,
            totalPrice: 2,
            purchaseable: false,
            purchasing: false,
            loading: false,
            error: false
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
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice )
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString,  
        });
    }
    componentDidMount () {
        axios.get('https://burgerapp-c0935.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({ingredients: res.data})
            })
            .catch(err => this.setState({error: true}))
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null

        // burger fetching ingredient data from the server
        let burger = this.state.error ? <p>Ingredients can't be loaded</p>:<Spinner />;
        if (this.state.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}
                    />
                </>
            )

            orderSummary = <OrderSummary ingredients={this.state.ingredients} 
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            totalPrice = {this.state.totalPrice}/>;


        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }


        return (
          <React.Fragment>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
          </React.Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);