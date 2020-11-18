import * as ACTIONS from './actions'

export const addIngredients = (ingName) => {
    return {
        type: ACTIONS.ADD_INGREDIENT,
        ingredientName: ingName
    }
}

export const removeIngredients = (ingName) => {
    return {
        type: ACTIONS.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
}