//// importar React también
//var React = require('react');
//var Router = require('react-router');
//// requerimos el módulo correspondiente
//// browserify se encargará del resto, nos lo buscará, etc.

////importar los módulos creados
//var Home = require('./Home.jsx');
//var About = require('./About.jsx');
//var Layout = require('./Layout.jsx');

//var Route = Router.Route;
////var Route = require('react-router').Route;

////necesitaremos otros módulos
//var ReactDOM = require('react-dom');
//var render = require('react-dom');
//var hashHistory = require('react-router').hashHistory;
//var browserHistory = require('react-router').browserHistory;
//var IndexRoute = require('react-router');
//// generaremos una tabla de rutas, se guarda en una variable
//// tabla de rutas principal para la "master face" LAYOUT
////var routes = (
////    <Router handler={Layout}>
////        <Route name="home" path="home" handler={Home} />
////        <Route name="about" path="about" handler={About} />
////    </Router>
////);

//// poner Router en marcha
//// Router.run, el método "run" ha sido eliminado por lo que habrá que utilizar otra forma
////Router.run(routes, Router.HashLocation, function (Root, state) {
////    ReactDOM.render(<Root/>, document.getElementById("contenedor"));
////});

//console.log("llega a dibujar las páginas");

//render((    
//  <Router history={browserHistory} >
//    <Route path="/" component={Layout}>
//      <IndexRoute component={Home} />
//      <Route path="/about" component={About}/> 
//      <Route path="/home" component={Home}/> 
//      </Route>
//  </Router> 
//    ), document.getElementById('contenedor'))


// importar React también
import React from 'react';
import { ReactDOM, render } from 'react-dom';
import { Router, Route, IndexRoute, Link, IndexLink, hashHistory, browserHistory, NotFoundRoute, DefaultRoute, Redirect } from 'react-router';

//importar los módulos creados
// páginas del sitio web
import Home from './Home.jsx';
import About from './About.jsx';
import Layout from  './Layout.jsx';
import Footer from './Footer.jsx';
import Indice from './Indice.jsx';
import NotFound from './NotFound.jsx';

// más paginas de prueba
import Coche from './Coche.jsx';
import Casa from './Casa.jsx';
import Campana from './Campana.jsx';

// generaremos una tabla de rutas, se guarda en una variable
// tabla de rutas principal para la "master face" LAYOUT
//var routes = (
//    <Router handler={Layout}>
//        <Route name="home" path="home" handler={Home} />
//        <Route name="about" path="about" handler={About} />
//    </Router>
//);

console.log("llega a dibujar las páginas");

// poner Router en marcha
// Router.run, el método "run" ha sido eliminado por lo que habrá que utilizar otra forma
//Router.run(routes, Router.HashLocation, function (Root, state) {
//    ReactDOM.render(<Root/>, document.getElementById("contenedor"));
//});

/*
render((    
    <Router history={browserHistory} >
        <Route path="/" component={Layout}>
            <IndexRoute component={Indice} />
                <Route path="/casa" component={Casa} />
                <Route path="/coche" component={Coche} />
                <Route path="/campana" component={Campana} />
                <Route path="/home" component={Home} />
                <Route path="/about" component={About} />
                <Redirect from="about-us" to="about" />
                <Redirect from="abouts" to="about" />
                <Route path="*" component={NotFound} />
        </Route>
    </Router> 
), document.getElementById('contenedor')) 
*/


let routes = (
    <Router history={browserHistory} >
        <Route path="/" component={Layout}>
            <IndexRoute component={Indice} />
                <Route path="/casa" component={Casa} />
                <Route path="/casa/coche" component={Coche} />
                <Route path="/casa/campana" component={Campana} />
                <Route path="/home" component={Home} />
                <Route path="/about" component={About} />
                <Redirect from="about-us" to="about" />
                <Redirect from="abouts" to="about" />
                <Route path="*" component={NotFound} />
        </Route>
    </Router>      
)

// Para renderizar indicando la variable    
render(routes, document.getElementById("contenedor"));