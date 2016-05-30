import React from 'react';
import ReactDOM from 'react-dom';
//import {render} from 'react-dom';
import {Link, Router} from 'react-router';

import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Indice from './Indice.jsx';

console.log("llega a Layout.jsx")

//color del enlace al pulsar sobre él
const ACTIVE = { color: 'olive' }


class Layout extends React.Component{
    render(){
        return (<div>
                    <Header />
                    <h1>My Layout Pag</h1>
                    <ul>
                        <li><Link to="/home" activeStyle={ACTIVE}>/home</Link></li>
                        <li><Link to="/casa" activeStyle={ACTIVE}>/casa</Link></li>
                        <li><Link to="/casa/coche" activeStyle={ACTIVE}>/casa/coche</Link></li>
                        <li><Link to="/casa/campana" activeStyle={ACTIVE}>/casa/campana</Link></li>
                        <li><Link to="/hello" activeStyle={ACTIVE}>/hello</Link></li>
                        <li><Link to="/about" activeStyle={ACTIVE}>/acerca de...</Link></li>
                    </ul>
                    {this.props.children}
                    <Footer />
                    
                </div>)
    }
}

//************************************
// Etiquetas HTML + react component
// React.createElement
// ***********************************
let boton = React.createElement("button",{style:{width:'100px'},className:'miBoton'},'un boton');
////ReactDOM.render(boton,document.getElementById("contenedor3"));

//let myDivElement = <div className="foo" />;
//ReactDOM.render(myDivElement, document.getElementById('contenedor2'));

//var style = {
//    color: 'red',
//    fontSize: 20
//};

////let unParrafo = <p className="p1" style={style}>Esto es un parrafo</p>;
//let unParrafo = <p className="p1" style={{color:'red',fontSize:30}}>Esto es un parrafo</p>;
//ReactDOM.render(unParrafo,document.getElementById("contenedor3"));

let parrafo = React.createElement('p',null,'Lorem Ipsum...',boton);
//let parrafo = React.createElement(boton,'p','Lorem Ipsum...',null);
//let parrafo = React.createElement('p',{className:'mioP'},'Lorem Ipsum...');
let bloque = React.createElement('div',{className:'miBloque'},'parrafos y parrafos',parrafo);
//ReactDOM.render(bloque , document.getElementById('contenedor4'));
//ReactDOM.render(<Footer /> , document.getElementById('contenedor4'));

//var listado = <ul className="my-list">
//             <li>Text ContentA</li>
//             <li>Text ContentB</li>
//             <li>Text ContentC</li>
//           </ul>;
//ReactDOM.render(listado, document.getElementById('contenedor2'));
// ************

let Counter = React.createClass({ 
             getInitialState: function () { 
               return { count: 0 }; 
             }, 
         handleClick: function () { 
               this.setState({ 
                     count: this.state.count + 1, 
                   }); 
         }, 
         render: function () { 
             return ( 
                 
                <button onClick={this.handleClick}> 
                    Click me! Number of clicks: {this.state.count} 
                </button> 
             
           ); 
         } 
}); 

//render.render( 
ReactDOM.render( 
         <Counter />, 
         document.getElementById('contenedor2') 
       ); 

// ****************************
// REACT - FACTORIES
//let bloque = React.createFactory('div');
//let componente = bloque({ className: 'my-div12' });

//let root = React.DOM.ul({ className: 'my-list' },
//             React.DOM.li(null, 'Text Content')
//           );

//let root = React.DOM.ul({ className: 'primero' },
//            React.DOM.li(null, 'Elemento A'),
//            React.DOM.li(null, 'Elemento B'),
//            React.DOM.h1(null,'Encabezado1'),
//            React.DOM.h2(null,'Encabezado2'),
//            React.DOM.ol({ className: 'segundo' },
//                React.DOM.li(null,'Subelemento A'),
//                React.DOM.li(null,'Subelemento B'),
//                React.DOM.li(null,'Subelemento C'),
//                React.DOM.li(null,'Subelemento D')
//            )
//);

//ReactDOM.render(root, document.getElementById('contenedor2'));
// ****************************

// *******************************
// comunicacion entre componentes
//let handleClick = function(i, props) {
//    console.log('You clicked: ' + props.items[i]);
//}

let MyLogo = {
    componentDidMount: function(){
        console.log('Logo mixin montado!')
    }
};

let HelloWord = React.createClass({
    mixins:[MyLogo],
    // podemos indicar más mixins
    // el orden seguido es el que está introducid
    //mixins:[MyLogo, OtroLogo, MasLogo],
    componentDidMount: function () { 
        console.log('Paso 5º. Ejecución de componentDidMount'); 
    },

    getDefaultProps: function () {
        console.log('Paso 1º. Ejecución de getDefaultProps');
        return {
            value: 'valor por defecto'
        };
    },

    getInitialState: function () { 
        console.log('Paso 2º. Ejecución de getInitialState'); 
        return {};
    },

    componentWillMount: function () { 
        console.log('Paso 3º. Ejecución de componentWillMount'); 
    },

    render: function () {
        console.log('Paso 4º. Ejecución de render');
        return (
            <div>
                <Header /> 						//componente React
                <h1>Ciclo de vida de ReactJS</h1> // etiqueta HTML + texto
                <Footer />						//componente React
            </div>
        );
    }

    

});

ReactDOM.render(<HelloWord />, document.getElementById('contenedor'));


// tendremos que exportarla para que sea pública
export default Layout;