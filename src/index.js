import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


// Redux functionality
import { createStore, combineReducers  } from 'redux';
import { Provider } from 'react-redux' 
import burgerBuilderReducer from "./store/reducers/burgerBuilder"
import checkoutReducer from "./store/reducers/checkout"

const rootReducer = combineReducers({
  bur: burgerBuilderReducer,
  check: checkoutReducer
})

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider>
    <App store={store}/>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
