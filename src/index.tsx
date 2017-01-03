import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, Link, browserHistory, IndexRedirect } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import './index.css';

import {App} from "./App";
import {Tickers} from "./Tickers";
import {Company} from "./Company";


import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import {boeEngine} from './boeEngine'

// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    boeEngine,
    routing: routerReducer
  })
)



const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
  <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
            <IndexRedirect to="companies" />
            <Route path="companies" component={Tickers}/>
            <Route path="company/:ticker" component={Company}/>
        </Route>
      </Router>
    </Provider>), document.getElementById("root"));
