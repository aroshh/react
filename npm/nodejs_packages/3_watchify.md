![logo_aitex_min.png](../images/logo_aitex_min.png "Logotipo de Aitex")

##Paquete Watchify

El módulo watchify se encarga de detectar cada cambio en un directorio y notifica si se ha producido un cambio en sus archivos mediante la generación del "bundle" (o fichero unificado) cada vez que exista una modificiación.

Para instalarlo globalmente, como siempre desde el prompt: `> npm install watchify -g`

En nuestro caso se encarga de detectar cada cambio en los archivos fuente y ejecutar las tareas necesarias para su construcción sin cargar manualmente la tarea. Todo esto estará orquestado por Gulp. En el ejemplo de "Gulpfile.js" puesto anteriormente en la explicación de Gulp se utiliza.

Como ejemplo de actualización de un archivo origen, browserify lo volvería a compilar ` > watchify main.js -o js/bundle.js`

> En MS Windows el parámetro "-o" no está disponible

###Eventos

Primero guardaremos en una variable el objeto a partir del siguiente código

```javascript
var browserify = require('browserify');

var b = browserify({...});
```

`.on('update',function(ids){})` Cuando se actualiza el "bundle"se emite un array de identificadores del bundle que está cambiado

`.on('bytes', function(bytes){})` Cuando se genera el "bundle", este evento se activa con el número de bytes.

`.on('time', function(time){})` Al generarse el bundle, este evento se activa al crear el bundle, muestra el valor en milisegundos

`.on('log',function(msg){})`Este evento se activa después de que el "bundle" sea creado y muestra mensajes de la forma 

```bash
 X bytes written (Y seconds)
```

## Referencias

+ [Página web del gestor de paquetes de Watchify](https://www.npmjs.com/package/watchify)

+ [Documentación en GitHub sobre watchify](https://github.com/substack/watchify)

+ [Ejemplo de "watchify" en un fichero "gulpfile.js"](2_1_gulpfile.md)
