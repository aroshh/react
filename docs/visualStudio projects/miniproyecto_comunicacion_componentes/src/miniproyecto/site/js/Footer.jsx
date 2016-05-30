import React from 'react';
import {Link, Router} from 'react-router';
import render from 'react-dom';


class Footer extends React.Component{
    render() {
        return (
            <div className="myfooter" >
                <hr />
                <small><span>Footer </span>
                (c) 2016 Footer mostrado </small>
            </div>
            )
    }
}

console.log("Carga Footer.jsx")

//hacemos público el módulo creado
export default Footer;