import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

// importing axios instance from axios.orders instance
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// redux
import { connect } from 'react-redux';
import { addIngredients, removeIngredients } from '../../store/actions/ingredients'


class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state ={
            purchasing: false,
            loading: false,
            error: false
        }
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
                        .map(igKey => ingredients[igKey])
                        .reduce((sum, el) => sum+el, 0)

        return sum > 0
    }

    // addIngredientHandler = (type) => {
    //     const updatedCount = this.state.ingredients[type] + 1;
    //     let updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const newPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];
    //     this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
    //     this.updatePurchaseState(updatedIngredients);
    // }


    // removeIngredientHandler = (type) => {
    //     if (this.state.ingredients[type] > 0 ){
    //         const updatedCount = this.state.ingredients[type] - 1;
    //         let updatedIngredients = {
    //             ...this.state.ingredients
    //         };
    //         updatedIngredients[type] = updatedCount
    //         const newPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];
    //         this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
    //         this.updatePurchaseState(updatedIngredients);
    //     }
    // }


    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }
    // componentDidMount () {
    //     // axios.get('https://burgerapp-c0935.firebaseio.com/ingredients.json')
    //     //     .then(res => {
    //     //         this.setState({ingredients: res.data})
    //     //         console.log(res.data);
    //     //     })
    //     //     .catch(err => this.setState({error: true}))
    // }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null

        // burger fetching ingredient data from the server
        let burger = this.state.error ? <p>Ingredients can't be loaded</p>:<Spinner />;
        if ( this.props.ings ) {
            burger = (
                <>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchaseable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                    price={this.props.price}
                    />
                </>
            )

            orderSummary = <OrderSummary ingredients={this.props.ings} 
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            totalPrice = {this.props.price}/>;
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

const mapStateToProps = state =>  {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(addIngredients(ingName)),
        onIngredientRemoved: (ingName) => dispatch(removeIngredients(ingName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));