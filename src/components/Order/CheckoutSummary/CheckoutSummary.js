import React from 'react'
import Burger from '../../Burger/Burger'
import Button from "../../UI/Button/Button"


export default function CheckoutSummary(props) {
    return (
        <div style={{textAlign: 'center'}}>
            <h1>Nice Burger, right ?</h1>
            <div style={{width: '100%', margin: 'auto' }}>
                    <Burger ingredients={props.ingredients}/>
            </div>
            <div style={{marginTop: '-120px'}}>
                <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
            </div>
        </div>
    )
}
