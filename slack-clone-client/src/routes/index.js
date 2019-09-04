import React from 'react';
import Home from '../components/Home/Home';
import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';

export default () => (<BrowserRouter>
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
    </Switch>
</BrowserRouter>)

