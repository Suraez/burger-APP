import React from 'react'
import './Logo.css'
import BurgerLogo from '../../assets/images/logo.png'
export default function Logo(props) {
    return (
        <div className="Logo" style={{height: props.height}}>
            <img src={BurgerLogo} alt="Logo"/>
        </div>
    )
}