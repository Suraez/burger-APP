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
            <Button btnType="Danger" clicked>CANCEL</Button>
            <Button btnType="Success" clicked>CONTINUE</Button>
        </div>
    )
}
