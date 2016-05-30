//var React = require('react');
import React from 'react';
//var Link = require('react-router').Link;
import {Link} from 'react-router';

console.log("llega a Index.jsx")

class NotFound extends React.Component{
    render() {
        return (
            <div className="error">
              <h3>Página no encontrada...</h3>
              <h4>Volver <Link to="home">al home</Link></h4>
            </div>
            )
    }
}

//hacemos público el módulo creado
export default NotFound;