import React from 'react';

console.log("llega a About.jsx")
// este home es una variable privada

class About extends React.Component {
    render() {
        return (
            <h2>About Pag / Página acerca de</h2>
            )
    }
}

// tendremos que exportarla para que sea pública
export default About;