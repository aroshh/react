![logo_aitex_min.png](../images/logo_aitex_min.png "Logotipo de Aitex")
##Paquete react-dom
Este existe desde la versión 0.14.0 (octubre 2015) de "React.js" ya que se [**decidió separar**][enlaceSeparar] dicho paquete único en dos: react y react-dom. Con lo que permite compartir componentes entre las diferentes versiones de ___React___ (web y nativo), por lo que tendremos que incluir tanto archivos como funciones movidas de **react** a **react-dom**.

Lo podemos encontrar dentro del gestor de paquetes de [**"npm"**][enlaceNpm]. Su utilidad es que nos permite renderizar de forma automática nuestra tabla de rutas (routes.jsx) e inicializar el DOM. Para realizar la importación será mediante `import {render} from 'react-dom';` (ECMAScript 6).

Además provee métodos específicos para el DOM que pueden ser utilizados en el nivel más alto de nuestra aplicación.

##Instalación

Como se indica en la página web oficial, desde el prompt de node.js ejecutaremos `> npm install --save-dev react-dom` 

##Uso

Al encontrarnos en "desarrollo" de nuestra SAP, tendremos nuestro fichero de rutas **"rutas.jsx"** donde además de importar los módulos/paquetes necesarios, estableceremos las rutas para que el navegador sepa el historial que hemos creado para la navegación:

```javascript
import React from 'react';
import { render } from 'react-dom';
import {Router, Route, IndexRoute, Link, IndexLink, browserHistory, Redirect } from 'react-router';

render((    
    <Router history={browserHistory} >
        <Route path="/" component={Layout}>
            <IndexRoute component={Indice} />
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Redirect from="about-us" to="about" />
            <Route path="*" component={NotFound} />
        </Route>
    </Router> 
), document.getElementById('contenedor')) 
```

###Referencias

+ [React-dom en "npm"](:https://www.npmjs.com/package/react-dom).
+ [Fichero "gulpfile.js"](2_1_gulpfile.md).
+ [ECMAScript 6 y 5](:http://www.ecma-international.org/ecma-262/6.0/).
+ [Nuevas características entre ECMAScript 5 y 6](http://es6-features.org).
+ [React (Virtual) DOM Terminology](https://facebook.github.io/react/docs/glossary.html).
+ [Web oficial métodos de React](https://facebook.github.io/react/docs/top-level-api.html).  

<!-- Referencias ocultas -->  

[enlaceNpm]:https://www.npmjs.com/ "enlace al gestor de paquetes de Node.js npm"
[enlaceSeparar]:https://github.com/facebook/react/blob/master/CHANGELOG.md#major-changes-1
