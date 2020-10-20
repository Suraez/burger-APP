import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import './SideDrawer.css'


export default function SideDrawer() {
    return (
        <div className="SideDrawer">
                <Logo height="11%"/>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    )
}
