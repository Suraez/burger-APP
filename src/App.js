import React, { useEffect } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerContainer/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

// import {BrowserRouter as Router, } from 'react-router'

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { connect  } from 'react-redux'
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout';
import { checkAuthState } from './store/actions';

function App(props) {

  useEffect(() => {
    props.onTryAutoSignUp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Router>
      <div>
        <Layout>
          <Switch>
            { props.isAuthenticated && <Route path="/checkout" component={Checkout} />}
            { props.isAuthenticated && <Route path="/orders" component={Orders} />}
            <Route path="/auth" component={Auth} />
            {props.isAuthenticated && <Route path="/logout" component={Logout} />}
            <Route path="/" exact component={BurgerBuilder} />
            {/* {!props.isAuthenticated && <Redirect to="/" />} */}
            <Redirect to="/" />
          </Switch>
        </Layout>
    </div>
    </Router>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToprops = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(checkAuthState())
  }
}

export default connect(mapStateToProps, mapDispatchToprops)(App);
