import React from 'react'

import './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

export default function Burger(props) {
    const transformedIngredients = Object.keys(props.ingredients)
        .map(igkey => {
            return [...Array(props.ingredients[igkey])].map((_,i) => 
                <BurgerIngredient key={igkey + i} type={igkey} />
            )
        })
        .reduce((arr, el) => arr.concat(el),[])

    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top" />
            { transformedIngredients.length === 0 && <p>Please start adding Ingredients!</p> }
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}
