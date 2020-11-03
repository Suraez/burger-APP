import React from 'react'

import classes from './Order.css'
export default function Order() {
    return (
        <div className={classes.Order}>
            <p>Ingredients: Salad(1)</p>
            <p>Price: <strong>$454.4</strong></p>
        </div>
    )
}
