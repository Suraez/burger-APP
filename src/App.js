import React from 'react';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerContainer/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

// import {BrowserRouter as Router, } from 'react-router'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Orders from './containers/Orders/Orders';

function App() {
  return (
    <Router>
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/"  component={BurgerBuilder} />
          </Switch>
          {/* <BurgerBuilder />
          <Checkout /> */}
        </Layout>
    </div>
    </Router>
  );
}

export default App;
