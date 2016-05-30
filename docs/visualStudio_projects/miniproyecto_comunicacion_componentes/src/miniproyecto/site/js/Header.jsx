// importar librerías
import React from 'react';
import Link from 'react-router';


class Header extends React.Component{
    render() {
        return (
            <div className="header">
                <hr/>
              <h4>Cabecera de la página</h4>
              <hr/>
            </div>
            )
    }
}

console.log("Carga Header.jsx")

//hacemos público el módulo creado
export default Header;