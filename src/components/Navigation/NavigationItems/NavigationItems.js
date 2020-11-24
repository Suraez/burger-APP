import React from 'react'
import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'


export default function NavigationItems() {
    return (
        <ul className="NavigationItems">
            <NavigationItem  link="/" exact>BurgerBuilder</NavigationItem>
            <NavigationItem  link="/orders">Orders</NavigationItem>
            <NavigationItem  link="/auth">Authenticate</NavigationItem>    
        </ul>
    )
}