// importar React también
import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute, Link, IndexLink, hashHistory, browserHistory, Redirect } from 'react-router';

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
import IndiceCasa from './IndiceCasa.jsx';
import Hello from './Hello.jsx';

/////////////////
/// Renderizar directamente
/////////////////
//render((    
//    <Router history={browserHistory} >
//        <Route path="/" component={Layout}>
//            <IndexRoute component={Indice} />
//                <Route path="/casa" component={Casa} />
//                <Route path="/coche" component={Coche} />
//                <Route path="/campana" component={Campana} />
//                <Route path="/home" component={Home} />
//                <Route path="/about" component={About} />
//                <Redirect from="about-us" to="about" />
//                <Redirect from="abouts" to="about" />
//                <Route path="*" component={NotFound} />
//        </Route>
//    </Router> 
//), document.getElementById('contenedor')) 


// mediante una variable/constante guardamos la ruta de nuestra ASP
// generaremos una tabla de rutas, se guarda en una variable
// tabla de rutas principal para la "master face" LAYOUT
const routes = (
    <Router history={browserHistory} >
        <Route path="/" component={Layout}>
            <IndexRoute component={Indice}/>
            <Route path="home" component={Home} />
            <Route path="casa"  component={Casa} />               
            <Route path="/casa/coche" component={Coche} />
            <Route path="/casa/campana" component={Campana} />
            <Route path="hello" component={Hello} >
                <IndexRoute component={IndiceCasa} />
            </Route>
            <Route path="about" component={About} />
            <Redirect from="about-us" to="about" /> 
            <Redirect from="abouts" to="about" />
            <Route path="*" component={NotFound}/>
        </Route>
    </Router>      
)

// Para renderizar indicando la constante directamente
render(routes, document.getElementById("contenedor"));

//compartimos publicamente la variable
// para renderizar después las rutas en el INDEX.JS
//export default routes;

