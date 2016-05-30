import React from 'react';
import { ReactDOM, render } from 'react-dom';
import { Router, Route, IndexRoute, Link, IndexLink, hashHistory, browserHistory, NotFoundRoute, DefaultRoute, Redirect } from 'react-router';

import ComponentTaskSelector from  './ComponentTaskSelector.jsx';

let routes = (
    <Router history={browserHistory} >
        <Route path="/" component={ComponentTaskSelector}>
           
        </Route>
    </Router>      
)

//// Para renderizar indicando la variable    
render(routes, document.getElementById("contenedor"));