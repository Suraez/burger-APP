import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, combineReducers, compose } from 'redux'

// for asynchoronous reduxx
import thunk from 'redux-thunk'

// reducers
import ingReducer from './store/reducers/ingredients'
import ordReducer from './store/reducers/orders'
import { Provider  } from 'react-redux'

// combining reducers
const rootReducer = combineReducers({
  ing: ingReducer,
  ord: ordReducer
})

  
// redux devTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
