import * as ACTIONS from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient = (ingName) => {
    return {
        type: ACTIONS.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: ACTIONS.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}
const setIngredients = (ingredients) => {
    return {
        type: ACTIONS.SET_INGREDIENTS,
        ingredients
    }
}

export const initIngredients = () => {
    return dispatch => {
         axios.get('https://burgerapp-c0935.firebaseio.com/ingredients.json')
            .then(res => {
                dispatch(setIngredients(res.data))
            })
            .catch(err => dispatch(errorOccured()))
    }
}

export const errorOccured = () => {
    return {
        type: ACTIONS.ERROR_OCCURED
    }
}
