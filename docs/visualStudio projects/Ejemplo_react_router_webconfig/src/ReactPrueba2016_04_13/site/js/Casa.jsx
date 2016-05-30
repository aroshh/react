// importar los módulos/paquetes necesarios
import React from 'react';
import {Link,Router} from 'react-router';

console.log("Hola estoy en el Home1.jsx")

class Casa extends React.Component{
    render() {
        return (<div>
                    <h2>My Casa Home 1</h2>
                    <p>página primera</p>
                    
        </div>)
    }
}

// tendremos que exportarla para que sea pública
export default Casa;