import React from 'react'

import './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

export default function Toolbar(props) {
    return (
      <header className="Toolbar">
        <div onClick={props.toggleSideDrawer} className="mobileOnly">MENU</div>
         <Logo height="80%"/> 
        <nav className="DesktopOnly">
          <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
      </header> 
    );
}
