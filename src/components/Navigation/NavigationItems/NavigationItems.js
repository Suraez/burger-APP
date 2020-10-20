import React from 'react'
import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'


export default function NavigationItems() {
    return (
        <ul className="NavigationItems">
            <NavigationItem  link="/" active>BurgerBuilder</NavigationItem>
            <NavigationItem  link="/checkout">Checkout</NavigationItem>
        </ul>
    )
}
