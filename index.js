import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Main/Main';
import Detail from './detail/detail';
import ShoppingCart from './shoppingCart/shoppingCart';
import Login from './login/login';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
        	<Route path="/login"  component={Login}   />
        	<Route path="/shoppingCart"  component={ShoppingCart}   />
            <Route path="/detail/:id"  component={Detail}   />
            <Route path="/main"  component={Main}  />
            <Redirect to="/main" />
        </Switch>
    </BrowserRouter>
	, document.getElementById('douban'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
