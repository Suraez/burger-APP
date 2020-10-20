import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import './BuildControls.css'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'},
]

export default function BuildControls(props) {
    return (
      <div className="BuildControls">
        <p>
          Current Price: <strong>{props.price.toFixed(2)}</strong>
        </p>
        {controls.map((ctrl) => (
          <BuildControl
            key={ctrl.label}
            added={() => props.ingredientAdded(ctrl.type)}
            label={ctrl.label}
            removed={() => props.ingredientRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
          />
        ))}
        <button className="OrderButton" disabled={!props.purchaseable} onClick={props.ordered}>
          ORDER NOW
        </button>
      </div>
    );
}
