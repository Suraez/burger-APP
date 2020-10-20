import React from 'react'

import './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

export default function Toolbar() {
    return (
      <header className="Toolbar">
        <div>MENU</div>
          <Logo height="80%"/>
        <nav className="DesktopOnly">
          <NavigationItems />
        </nav>
      </header> 
    );
}
