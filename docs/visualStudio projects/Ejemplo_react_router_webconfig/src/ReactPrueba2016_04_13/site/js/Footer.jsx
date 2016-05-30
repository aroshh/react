import React from 'react';
import {Link, Router} from 'react-router';
import render from 'react-dom';

console.log("llega a Footer.jsx")

class Footer extends React.Component{
    render() {
        return (
            <div className="myfooter" >
                <hr />
                <span>Footer </span>
                (c) 2016 pruebas de footer <span><Link to="home">Home</Link></span>
            </div>
            )
    }
}

//hacemos público el módulo creado
export default Footer;