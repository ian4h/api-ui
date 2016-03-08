/**
 * Created by ian on 07/03/16.
 */

import React from "react";
import ReactDom from "react-dom";
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'

import Layout from './components/Layout'
import CreateCustomer from './components/CreateCustomer'
import CustomerList from './components/CustomerList'

const app = document.getElementById('app');

//ReactDom.render(<Layout />, app);
ReactDom.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={CustomerList}></IndexRoute>
            <Route path="createCustomer" name="createCustomer" component={CreateCustomer}></Route>
        </Route>
    </Router>,
    app
);