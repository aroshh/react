// importar los módulos/paquetes necesarios
import React from 'react';
import {Link, Router} from 'react-router';

console.log("Hola estoy en el Home3.jsx")

class Campana extends React.Component{
    render() {
        return (<div>
                    <h2>My Camapana Home 3</h2>
                    <p>página tercera</p>
                   
                </div>)
    }
}

// tendremos que exportarla para que sea pública
export default Campana;