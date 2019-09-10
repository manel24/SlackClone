import React from 'react';
import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import CreateTeam from './CreateTeam/CreateTeam';
import ViewTeam from './ViewTeam/ViewTeam';
import decode from 'jwt-decode';

import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refresh-token');
    try {
        decode(token);
        decode(refreshToken);
    } catch (error) {
        return false;
    }
    return true;
}
const PrivateRoute = (
    { component: Component, ...rest }) => (
        <Route {...rest}
            render={props => (isAuthenticated() ? (<Component {...props} />) : (
                <Redirect to={{ pathname: '/login' }} />
            ))} />

    )
export default () => (<BrowserRouter>
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/view-team" exact component={ViewTeam} />
        <PrivateRoute path="/create-team" exact component={CreateTeam} />
    </Switch>
</BrowserRouter>)

