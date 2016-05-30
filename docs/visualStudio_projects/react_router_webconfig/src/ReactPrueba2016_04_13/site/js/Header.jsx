
import React from 'react';
import Link from 'react-router';

console.log("llega a Header.jsx")

class Header extends React.Component{
    render() {
        return (
            <div className="header">
              <h3>Cabecera de la página</h3>
            </div>
            )
    }
}

//hacemos público el módulo creado
export default Header;