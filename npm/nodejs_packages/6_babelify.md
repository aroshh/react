![logo_aitex_min.png](../images/logo_aitex_min.png "Logotipo de Aitex")
##Paquete Babelify
Es otro módulo de npm que añadido al módulo **["browserify"][enlaceBrowserify]** se produce la transformación de nuestro código JavaScript en JavaScript nativo comprensible por nuestro navegador web. Éste traduce (transforma) ES6 a ES5 para luego crear un fichero "bundle.js" que contendrá todos los ficheros de la aplicación.  

Dicha transformación es necesaria porque los navegadores actuales no soportan ECMAScript 6.

Depende del módulo **["babel"][enlaceBabel]** (versión 6.0.0 - abril 2016) no se incluyen plugins por defecto por lo que tendremos que indicarlos.
> BABEL es un compilador para escritura para la siguiente generación de JavaScript.

###[ECMAScript][wikipediaECMAScript]
Es una especificación del lenguaje de programación que define tipos dinámicos inspirado en Java y otros lenguajes como C, además de soportar ciertas características de la **[programación orientada a objetos (POO)][wikipediaPOO]**. 

La mayoría de los navegadores  incluyen una implementación del estándar ECMScript así como acceso al **[Document Object Model (DOM)][wikipediaDOM]** para la manipulación de las páginas web. 

**[JavaScript][wikipediaJavascript]** está implementado en la mayoría de navegadores con lo que cualquier código funcionará en todos ellos.

####ECMAScript6
También llamado "ECMAScript 2015" (6ª edición/junio 2015) es hasta la fecha la última versión del estándar ECMAScript **[podemos ver el estándar ES6 para la especificación completa de dicho lenguaje][enlaceECMAScript]**. Aquí tenemos un ejemplo de los cambios que se producen al importar o exportar una función / módulo:

>| ECMAScript 6 | ECMAScript 5 |
|:--------:|:--------:|
|import React from 'react';|var React = require ('react');|
|export default Add;|module.exports = Add;|



###Instalación
Como venimos haciendo anteriormente utilizaremos el prompt de node.js para instalarlo localmente junto con los parámetros correspondientes: `npm install --save-dev babelify` con lo que quedará registrado en nuestro **"package.json"** como "devDependencies".

###Uso
En nuestro fichero **["gulpfile.js"][fichero_gulpfile]** declaramos que el "bundler" o archivo resultante sea transformado previamente a ECMAScript5 y después a **["react"][enlaceReact]**:
```javascript
    let bundler = browserify({
        ...
        transform: [reactify],
        transform: [[babelify, { "presets": ["es2015", "react"] }]],
        ...
    });
```
Para que sea posible la transformación necesitaremos tener instalados los siguientes módulos *(presets/plugins)* para poder transformar nuestro código ECMAScript6 a ECMAScript5 (soportado por los navegadores actuales): 
```javascript
> npm install --save-dev babel-preset-react babel-preset-es2015
```
>Recordemos que la instalación se realiza desde el prompt de node.js

## Referencias
+ [Página oficial de "babelify"](https://github.com/babel/babelify).
+ [Página oficial de "babel"](https://babeljs.io/).
+ [Página oficial de "browserify"](http://browserify.org/).
+ [Introducción a ECMAScript 6](https://github.com/lukehoban/es6features#readme).
+ [Ejemplo de aplicación con React.js y ECMAScript 6](https://carlosazaustre.es/blog/ejemplo-de-aplicacion-con-react-js-en-ecmascript-6/).
+ [Tabla compatibilidad ECMAScript6](http://kangax.github.io/compat-table/es6/) para: compiladores, navegadores, servidores y móviles.
+ [Nuevas características entre ECMAScript 5 y 6](http://es6-features.org/#Constants).
+ [ECMAScript 6 - Palabras clave](http://www.hongkiat.com/blog/ecmascript-6/).
+ [Ejemplo uso de React.js 0.14 con ECMAScript 6-7](http://blog.ricardofilipe.com/post/babel-react-es7-sample)

<!-- Referencias internas -->
[fichero_gulpfile]:2_1_gulpfile.md
[enlaceBrowserify]:https://github.com/substack/node-browserify#usage "Browserify documentación en GitHub"
[enlaceReact]:https://facebook.github.io/react/docs/getting-started.html "Página oficial de React"
[enlaceBabel]:https://github.com/babel/babel "Babel documentación en GitHub "
[enlaceECMAScript]:http://www.ecma-international.org/ecma-262/6.0/ "Página oficial de ECMAScript"
[wikipediaECMAScript]:https://es.wikipedia.org/wiki/ECMAScript "Definición de Wikipedia"
[wikipediaJavascript]:https://es.wikipedia.org/wiki/JavaScript
[wikipediaDOM]:https://es.wikipedia.org/wiki/Document_Object_Model
[wikipediaPOO]:https://es.wikipedia.org/wiki/Programaci%C3%B3n_orientada_a_objetos
