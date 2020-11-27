import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import './SideDrawer.css'
import Backdrop from "../../UI/Backdrop/Backdrop"


export default function SideDrawer(props) {
    let attachedClasses = ['SideDrawer'];
    if (props.open) {
        attachedClasses[1] = 'Open'
    } else {
        attachedClasses[1] = 'Close'
    }
    return (
        <>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
                <Logo height="11%"/>
            <nav>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </div>
        </>
    )
}
