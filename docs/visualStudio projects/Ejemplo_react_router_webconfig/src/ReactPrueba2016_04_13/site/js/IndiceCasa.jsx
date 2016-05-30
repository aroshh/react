import React from 'react';
import {Link, Router} from 'react-router';
import render from 'react-dom';

console.log("llega a IndiceCasa.jsx")

// este home es una variable privada
class IndiceCasa extends React.Component{
    render () {
        return (<div>
                    <h2>INDICE CASA</h2>
                    <p>esto es el índice...</p>
                    <ul>
                        <li>
                            <span><Link to="/home">Ir al home</Link></span>
                        </li>
                    </ul>
                    
                </div>)
    }
}

// tendremos que exportarla para que sea pública
export default IndiceCasa;