import React from 'react';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerContainer/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

// import {BrowserRouter as Router, } from 'react-router'

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" exact component={Checkout} />
          {/* <BurgerBuilder />
          <Checkout /> */}
        </Layout>
    </div>
    </Router>
  );
}

export default App;
