import React from 'react'
import styles from "./order.module.css"
export default function Order(props) {
    const ingredients = [];
    for (let key in props.ingredients) {
        ingredients.push({
            name: key,
            amount: props.ingredients[key]
        })
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span key={ig.name} style={{border: '1px solid #ccc', margin: '0 8px',padding:  '5px', textTransform: 'capitalize'}}>
            {ig.name} ({ig.amount})
        </span>
    })
    return (
        <div className={styles.Order}>



            <p>Ingredients: {ingredientOutput}</p>           
            <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
        </div>
    )
}
