import React from 'react';
import {Link, Router} from 'react-router';

class Hello extends React.Component{
    render() {
        return (
            <div className="saludo">
              <h3>Hello....page</h3>
              <ul>
                  <li><Link to="/home" >/home</Link></li>
                  <li><Link to="/casa" >/casa</Link></li>
                  <li><Link to="/casa/coche">/casa/coche</Link></li>
                  <li><Link to="/casa/campana" >/casa/campana</Link></li>
                  <li><Link to="/hello">/hello</Link></li>
                  <li><Link to="/about" >/acerca de...</Link></li>
              </ul>
              {this.props.children}
            </div>
            )
    }
}

//export const Hello = ( { params, location } ) => (
//  <h3>Howdy, { params.name }! You like { location.query.food }.</h3>
//);
console.log('llega a Hello.jsx');
export default Hello;