import React, { useEffect } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerContainer/BurgerBuilder';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { connect  } from 'react-redux'
import Logout from './containers/Auth/Logout/Logout';
import { checkAuthState } from './store/actions';

// lazy loading
import asyncComponent from './hoc/asyncComponent/asyncComponent'

const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'))
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'))
const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'))


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
            { props.isAuthenticated && <Route path="/checkout" component={asyncCheckout} />}
            { props.isAuthenticated && <Route path="/orders" component={asyncOrders} />}
            <Route path="/auth" component={asyncAuth} />
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
