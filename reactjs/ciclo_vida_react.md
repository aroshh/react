##React: Ciclo de vida
![ciclo_vida_react.png](images/ciclo_vida_react_esp.png "Detalle de las fases por las que pasa un componente React")

Al crear e interactuar con un componente React éste pasa por tres ciclos:

+ Montaje (mounting).

+ Actualización (updating).

+ Desmontaje (unmounting).  



En la documentación de la página oficial de React, separa métodos para la especificación de componentes y otros para el ciclo de vida:  

|Especificación|Montaje|Actualización|Desmontaje|
|:--------:|:--------:|:--------:|:--------:|
| render(*) 		| getInitialState | [componentWillReceiveProps][enlaceComponentwillreceiveprops] | [componentWillUnmount][enlaceUnmountingcomponentwillmount] |
| [getInitialState][enlaceGetinitialstate](*) | getDefaultProps| [shouldComponentUpdate][enlaceShouldcomponentupdate] |  |
| [getDefaultProps][enlaceGetdefaultprops](*) | [componentWillMount][enlaceComponentwillmount] | [componentWillUpdate][enlaceComponentwillupdate] |  |
| propTypes(*) 	| [render][enlaceRender] | [render][enlaceRender] |  |
| mixins(*) 		| [componentDidMount][enlaceComponentdidmount] | [componentDidUpdate][enlaceComponentdidupdate] |  |  
| statics(*) 		|  |  |  |
| displayName(*) |  |  |  |  

> (*) Métodos que podemos utilizar para la creación del componente.

> Aunque nosotros trataremos "dichas especificaciones" como pertenecientes al montaje del componente.

###Montaje

En esta fase creamos/montamos el componente **en el DOM virtual** pudiendo utilizar los siguientes métodos:

+ **[getInitialState][enlaceGetinitialstate],** se llama sólo al principio al montar el componente, tendrá el valor inicial de `this.state`.

+ **[getDefaultProps][enlaceGetdefaultprops],** invocado sólo una vez y se guarda en caché al crear el componente. Los valores se guardarán en `this.props`. No puede depender de ningún valor de `this.props` porque es invocado antes de la creación de cualquier instancia.

+ **[componentWillMount][enlaceComponentwillmount],** sólo se invoca una vez y antes de renderizar el componente. En el caso de que pongamos un valor de estado (`this.state`) dentro, no se producirá ninguna actualización.

+ **[render][enlaceRender],** nos devuelve el componente para visualizarlo, en caso de que no queramos mostrar nada, debe retornar "null" o "false". Requisitos a cumplir: 

	+ Siempre será un método requerido por los componentes. 

	+ Nunca debe modificar el estado del componente ni modificar el resultado cada vez que sea llamado.

	+ Prohibido leer / escribir directamente en el **[DOM][enlaceDOM]** o interactuar en el navegador (si ocurriera tal cosa, deberemos utilizar el método `componentDidMount`).

+ **[componentDidMount][enlaceComponentdidmount],** invocado una sóla vez y en el lado del cliente, será llamado después de la renderización. Aquí podremos acceder a las referencias (`refs`) de los componentes hijos ya que dicho método es llamado antes que el de los padres (paterns). También podemos integrar: componentes jQueryUI, boobstrap, llamadas Ajax, etc.

	> Podemos integrar dentro de un elemento react:

	>   + Sólo jQuery: animaciones...

	>   + Dentro de una misma página, tener de forma separada los componentes: react.js y el plugin de jQueryUI. La comunicación entre dichos componentes se efectuaría mediante un objeto compartido en la misma ventana del navegador.

	>   + Integrar un plugin jQueryUI como parte del "renderizado" de "React.js".
	NOTA: Para sincronizar el plugin de jQueryUI con el renderizado debemos tener claro que el componente "se lanza" una vez que ha sido: creado, renderizado y añadido al **[DOM][enlaceDOM].** Entonces mediante el método `componentDidMount` podremos renderizarlo junto con el componente react.



    Ahora el componente "montado" se muestra en nuestro navegador.



```javascript
import ReactDOM from 'react-dom';	//Paquete react-dom
import Footer from './Footer.jsx';	//React.Component
import Header from './Header.jsx';	//React.Component

let HelloWord = React.createClass({
    getDefaultProps: function () {
        console.log('Paso 1º. Ejecución de getDefaultProps');
        return {
     		value: 'valor por defecto'
        };
    },
    getInitialState: function () { 
        console.log('Paso 2º. Ejecución de getInitialState'); 
        return {};
    },
    componentWillMount: function () { 
    	console.log('Paso 3º. Ejecución de componentWillMount'); 
    },

    render: function () {

        console.log('Paso 4º. Ejecución de render');
        return (
            <div>
                <Header /> 						//componente React
                <h1>Ciclo de vida de ReactJS</h1> // etiqueta HTML + texto
                <Footer />						//componente React
            </div>
        );
    },
    componentDidMount: function () { 
        console.log('Paso 5º. Ejecución de componentDidMount'); 
    },
});

ReactDOM.render(<HelloWord />, document.getElementById('contenedor'));
```

Podemos poner sólamente el método `render` con etiquetas HTML y otros componentes de React pero todos ellos delimitados por un contenedor `<div>` para que sea posible la renderización del propio componente padre. En el caso de poner los métodos desordenados, se seguirán ejecutando en orden tal y como se muestran en el código anterior.



###Actualización.

Dicha fase sucede cuando se producen cambios en el estado o nuevas propiedades.

+ **[componentWillReceiveProps][enlaceComponentwillreceiveprops]**, sólo cuando el componente recibe nuevos "props". Utilizamos éste método para actualizar el estado del componente (`this.state`). Los valores anteriores de los "props" son accesibles mediante el método `this.props` porque aún no se han actualizado. Dicho método recibe como parámetros los valores de los "props" a actualizar. Este método no es llamado cuando hay un cambio de estado.

+ **[shouldComponentUpdate][enlaceShouldcomponentupdate]**,invocado antes del render en el caso de recibir los nuevos `props` / `states`. El valor por defecto devuelto es `true` pero podemos sobreescribirlo y cambiarlo a `false` en el caso de que la actualización de los `props`/`states` no implique la actualización del componente, provocando a su vez que no se llame a los métodos: `render`, `componentWillUpdate`, `componentDidUpdate` hasta el próximo cambio. Dentro de este método podemos efectuar comparaciones entre los cambios pudiendo decidir si actualizamos o no por lo que la ventaja que presenta es la de un mejor rendimiento y aprovechamiento de los recursos.

+ **[componentWillUpdate][enlaceComponentwillupdate]**, se invoca al recibir los nuevos "props"/"estados". No podremos utilizar `this.setState` en caso de que queramos cambiar el estado ya que se produce un cambio en los "props" por tanto deberemos utilizar el método `componentWillReceiveProps`.

+ **[render][enlaceRender]**, realiza lo mismo que hemos indicado en la fase de montaje. Creación del componente como tal.

+ **[componentDidUpdate][enlaceComponentdidupdate]**, método utilizado para realizar operaciones en el DOM una vez que el componente ya está actualizado.



###Desmontaje.
Es la última fase donde el componente se desmonta, el método utilizado es:

+ **[componentWillUnmount][enlaceUnmountingcomponentwillmount]**, llamaremos al método antes de que el componente sea borrado del DOM, pudiendo eliminar elementos creados por el método `componentDidMount`.

##Referencias
+ [Ciclo de vida de un componente React](http://vensign.com/reactjs-ciclo-de-vida-de-un-componente/).
+ [Facebook React - Lifecycle](https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods).
+ [Ejemplos de componentes React.js: animaciones, iconos, imágenes...](https://js.coach/react).
+ [React.js - Listado de cambios](https://github.com/facebook/react/blob/master/CHANGELOG.md).
+ [React sobre ES6](https://babeljs.io/blog/2015/06/07/react-on-es6-plus).
+ [Primeros pasos con React](http://frontendlabs.io/3158--react-js-espanol-tutorial-basico-primeros-pasos-ejemplos).


<!-- Referencias ocultas -->
[enlaceDOM]:http://librosweb.es/libro/ajax/capitulo_4.html
[enlaceProptypes]:https://facebook.github.io/react/docs/component-specs.html#proptypes
[enlaceValidadores]:https://facebook.github.io/react/docs/reusable-components.html#prop-validation
[enlaceCiclodevida]:https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods
[enlaceHijounico]:https://facebook.github.io/react/docs/reusable-components.html#single-child
[enlaceGetinitialstate]:https://facebook.github.io/react/docs/component-specs.html#getinitialstate
[enlaceGetdefaultprops]:https://facebook.github.io/react/docs/component-specs.html#getdefaultprops
[enlaceComponentwillmount]:https://facebook.github.io/react/docs/component-specs.html#mounting-componentwillmount
[enlaceRender]:https://facebook.github.io/react/docs/component-specs.html#render
[enlaceComponentdidmount]:https://facebook.github.io/react/docs/component-specs.html#mounting-componentdidmount
[enlaceComponentwillreceiveprops]:https://facebook.github.io/react/docs/component-specs.html#updating-componentwillreceiveprops
[enlaceShouldcomponentupdate]:https://facebook.github.io/react/docs/component-specs.html#updating-shouldcomponentupdate
[enlaceComponentwillupdate]:https://facebook.github.io/react/docs/component-specs.html#updating-componentwillupdate
[enlaceComponentdidupdate]:https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
[enlaceUnmountingcomponentwillmount]:https://facebook.github.io/react/docs/component-specs.html#unmounting-componentwillunmount
[enlaceMixins]:https://facebook.github.io/react/docs/reusable-components.html#mixins 
[enlaceDefaultpropvalues]:https://facebook.github.io/react/docs/reusable-components.html#default-prop-values
[enlaceCrosscuttingconcern]:https://en.wikipedia.org/wiki/Cross-cutting_concern
[enlaceFuncionesinestado]:https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
[enlaceStatics]:https://facebook.github.io/react/docs/component-specs.html#statics
[enlaceDisplayname]:https://facebook.github.io/react/docs/component-specs.html#displayname
[enlaceHtmltojsx]:https://facebook.github.io/react/html-jsx.html
[enlaceDiferencias]:https://github.com/uberVU/react-guide/blob/master/props-vs-state.md
[enlaceEstados1]:http://facebook.github.io/react/docs/thinking-in-react.html#step-4-identify-where-your-state-should-live
[enlaceEstados2]:https://groups.google.com/forum/#!topic/reactjs/hAldztPzQgI
