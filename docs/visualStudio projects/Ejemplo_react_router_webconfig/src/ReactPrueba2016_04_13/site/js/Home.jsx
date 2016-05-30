import React from 'react';
import {Link, Router} from 'react-router';
//import render from 'react-dom';

console.log("Estoy en el Home.jsx")

// este home es una variable privada
class Home extends React.Component{
    render () {
        return (<div className="myhome">
                    <h2>My Home Pag</h2>
                    <p>esto es el home...23</p>
                    <ul>
                        <li>
                            <span><Link to="/casa">hacia algo</Link></span>
                            
                        </li>
                    </ul>
                    
                </div>)
    }
}

// tendremos que exportarla para que sea pública
export default Home;