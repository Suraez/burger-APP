import React from 'react'

import './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

export default function Layout(props) {
    return (
        <React.Fragment>
            <Toolbar />
            <SideDrawer />
            <main className="Content">
                {props.children}
            </main>
        </React.Fragment>
    )
}
