import React from 'react'
import { connect } from 'react-redux'
import './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends React.Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false})
    }

    toggleSideDrawer = () => {
        this.setState(prevState => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render() {
        return (
          <React.Fragment>
            <Toolbar
              toggleSideDrawer={this.toggleSideDrawer}
              isAuth={this.props.isAuthenticated}
            />
            <SideDrawer
              open={this.state.showSideDrawer}
              closed={this.sideDrawerCloseHandler}
              isAuth={this.props.isAuthenticated}
            />
            <main className="Content">{this.props.children}</main>
          </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}


export default connect(mapStateToProps)(Layout);