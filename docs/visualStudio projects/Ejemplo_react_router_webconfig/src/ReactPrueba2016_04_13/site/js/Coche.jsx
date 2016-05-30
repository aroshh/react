// importar los módulos/paquetes necesarios
//import React from 'react';
import React, {Component} from 'react';
import {Link,Router} from 'react-router';

console.log("Hola estoy en el Home3.jsx")

class Coche extends React.Component{
    render() {
        return (<div>
                    <h2>My Coche Home 2</h2>
                    <p>la suma da {1+1}</p> 
                                     
                </div>)
    }
}

// tendremos que exportarla para que sea pública
export default Coche;