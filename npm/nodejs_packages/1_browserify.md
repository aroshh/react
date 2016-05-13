![logo_aitex_min.png](../images/logo_aitex_min.png "Logotipo de Aitex")
#Paquete Browserify

**Browserify** [[1]] nos permite organizar una aplicación javascript (o módulos de node.js) en varios archivos y referenciarlos unos desde otros a través de `require('module')` que vamos a ir usando a lo largo del proyecto. Además, unirá los diferentes archivos incluyendo los módulos necesarios en el orden adecuado para después generar un fichero para ser utilizado en nuestro navegador.  

_Browserify nos permite el uso de librerías Node.js en el cliente, permite desarrollar en el lado del cliente mediante dichos módulos y cumplimiento de dependencias de forma explícita._  

Equivale a usar los módulos que soportará de forma nativa en **JavaScript** [[2]] y que aún no ha sido implementado en los navegadores [[3]].  
> El 28 de enero de 2016, ya se han aprobado algunas características mínimas correspondientes que han sido implementadas en los navegadores actuales.  




Trabajar de una manera modular nos permite que el código sea independiente, desacoplado, fácil de mantener y reutilizable (DRY [[4]], no confundir con SOLID [[5]]).

Por lo que se refiere al **"ámbito de las variables"** es totalmente independiente quedando encapsulado y sólo exponiendo hacia el exterior aquello que nosotros queramos que lo sea mediante **"module.exports"**. Con lo que "está" accesible públicamente.
>Ejemplo:  
```javascript
var myModulo = {
    algo: function () {
        // codigo
        });
    }
};
//exportamos
module.exports = myModulo;
```

Para que dicho **"módulo"** sea accesible desde cualquier parte de la aplicación, utilizaremos:
```javascript
var modulo2 = require('/ruta/del/modulo');
```
Para poder utilizar el módulo creado necesitamos requerirlo y guardarlo en la variable "modulo2" así
podremos acceder a sus propiedades, etc.


##Instalación propuesta
Utilizaremos el siguiente comando (desde el prompt de node.js) `> npm install --save browserify`.   Con lo que nos descargaremos sólo el paquete que necesitamos con lo que nos evitaremos comprobar y bajar las dependencias. Éste se guardará en nuestra carpeta del proyecto en `node_modules/`. 

O bien de forma global mediante el comando `> npm install browserify -g`.  
>Es posible que necesitemos instalar el paquete de forma global para poder utilizarlo en nuestra aplicación.  

En la página oficial [[6]] tenemos el detalle completo para su instalación.  
##Uso
1. Instalar módulos para el cliente, con NPM, al igual que hacíamos con **"[bower][enlaceBower]"**, pero ahora, utilizando la misma sintaxis que en Node [[7]].  
```javascript
var $ = require("jquery");		// debe estar en el directorio de módulos descargados
var aitexModulo = require("./miscript.js")	// buscará en el directorio aitexModulo.js
```  
> Si no ponemos una barra o una ruta "browserify" pensará que es un módulo de node.js, por lo que usará npm para descargarlo.

2. Olvidándonos de tener que importar todas las librerías (junto sus dependencias que se tendrían que haber puesto antes) y scritps utilizados en el HTML.
```javascript
<script src="requisito_de_miScript.js"></script>
<script src="miscript.js"></script>
```
3. Crearnos el bundle final (un sólo archivo .js minimizado) con todos sus archivos y requisitos para ser usado en el navegador. Lo veremos con el **módulo Gulp**.  
> 
> 
> Utilizando el prompt de Node.js: `> browserify index.js -o main.js`  
> Conseguimos obtener un fichero único "main.js" que contendrá todo lo necesario para ejecutar después en nuestro navegador.
4. Creamos nuestros propios módulos con **module.exports** y podemos llamarlos de nuevo desde nuestro código con **"require"** desde otros ficheros o "módulos".

##package.json
"browserify" utiliza el fichero "package.json" en el caso de que exista un campo "main", resolverá el proyecto en ese punto, es decir, indicamos los módulos necesarios, en caso contrario, buscará un fichero **"foo.js"** en el directorio raíz de nuestro módulo.
> Cuando creamos nuestro proyecto utilizando `npm init` y por defecto se establece el campo `main: "index.js"` pero que se puede indicar otro "js".
> Recordemos que nosotros tenemos indicado `main: "gulpfile.js"` en el "package.json".

###¿Qué podemos añadir a nuestro JSON?
Podemos editarlo y proceder a:
+ Especificar la transformación del origen mediante la indicación del campo ***browserify.transform***. Por ejemplo, si requerimos "react" podemos añadir: `"browserify": { "transform": [ "reactify" ] }` entonces en el caso de que se haga un "require()" se aplicará dicho módulo automáticamente a los archivos del proyecto debiendo también agregar las transformaciones al campo **"dependencies"** del fichero JSON.

> Pero nosotros finalmente no vamos a modificar nuestro fichero "package.json" ya que utilizamos nuestro propio fichero **"[gulpfile.js][fichero_gulpfile.js]"**.

##Transformaciones 
En el **[listado actualizado de transformaciones de origen soportadas][enlaceTransformaciones]** utilizando "browserify" y en el caso de utilizar **["babelify"][ficheroBabelify]** podemos transformar nuestro código ECMAScript 6 a JavaScript nativo comprensible por el navegador web.

#PONER ECMAScript 6 y 5

##Otras herramientas
"Browserify" también dispone de herramientas (**[browserfy-tools][enlaceBrowserifyTools]**) como:
+ Task runners.
+ Compilación para desarrollo:
	+ Herramientas para Servidor Web.
	+ Herramientas independientes: como por ejemplo ["watchify"][ficheroWatchify]
	+ Cargador dinámico en el navegador.
+ Compilador de tuberías.
+ Testeo.
+ ...

##Referencias
[1] [Página web oficial de browserify](http://browserify.org/)  
[2] [Uso de módulos en JavaScript con ECMAScript 6](http://www.2ality.com/2013/11/es6-modules-browsers.html)  
[3] [Soporte de EMACScript en los principales navegadores](http://kangax.github.io/compat-table/es6/)  
[4] [Princpio DRY (No lo vuelvas a repetir)](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)  
[5] [Principio SOLID](https://es.wikipedia.org/wiki/SOLID_(object-oriented_design)  
[6] [Instalación browserify](https://www.npmjs.com/package/browserify)  
[7] [Página oficial de CommonJS](http://www.commonjs.org/)  
[8] [Uso de browserify](http://blog.koalite.com/2014/09/como-utilizar-reactjs-con-browserify/)
[9] [Ejemplo de fichero browserify utilizando watchify](https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md)
 [10] [Uso de babelify](6_babelify.md)
<!-- Enlaces y referencias del documento -->
[1]:http://browserify.org/
[2]:http://www.2ality.com/2013/11/es6-modules-browsers.html
[3]:http://kangax.github.io/compat-table/es6/
[4]:https://en.wikipedia.org/wiki/Don%27t_repeat_yourself
[5]:https://es.wikipedia.org/wiki/SOLID_(object-oriented_design)
[6]:https://www.npmjs.com/package/browserify
[7]:http://www.commonjs.org/
[enlaceBower]:http://bower.io/
[fichero_gulpfile.js]: 2_1_gulpfile.md
[enlaceTransformaciones]:https://github.com/substack/node-browserify/wiki/list-of-transforms
[enlaceBrowserifyTools]:https://github.com/substack/node-browserify/wiki/browserify-tools
[ficheroWatchify]:3_watchify.md
[ficheroBabelify]:6_babelify.md
