import * as ACTIONS from '../actions/actionTypes'

const initialState = {
    ingredients: null,
    totalPrice: 10,
    error: false

}

const INGREDIENTS_PRICE = {
    salad: 0.4,
    meat: 1.5,
    bacon: 0.9,
    cheese: 0.3 
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTIONS.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            }
        case ACTIONS.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
            }
        case ACTIONS.RESET_INGREDIENTS:
            return {
              ...state,
              ingredients: {
                salad: 0,
                meat: 0,
                bacon: 0,
                cheese: 0,
              },
              totalPrice: 10
            };
        case ACTIONS.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 10
            }
        case ACTIONS.ERROR_OCCURED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default reducer;