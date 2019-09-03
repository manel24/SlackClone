import React from 'react';
import Home from '../components/Home/Home';

import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';

export default () => (<BrowserRouter>
    <Switch>
        <Route path="/" exact Component={Home} />
    </Switch>
</BrowserRouter>)

