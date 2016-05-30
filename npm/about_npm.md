![logo_aitex.png](images/logo_aitex_min.png "Logotipo de Aitex")
#"npm"  

##Gestor de paquetes "npm"
**"npm"** facilita a los desarrolladores de JavaScript compartir , reutilizar código así como actualizar el código que se está compartiendo.  

Estas porciones de código reutilizable, llamados **paquetes** aunque  normalmente los llaman módulos. Un **paquete** es un directorio el cual contiene uno más archivos, también hay un fichero **package.json** con meta datos de dicho paquete. En una apliación típica, como en el caso de una página web dependen de docenas o cientos de paquetes. Dichos paquetes son a menudo pequeños. La idea principal es que creemos un bloque que resuelva un problema y lo resuelva bien. Esto hace posible realizar composiciones largas, personalizar soluciones a la medida de estos bloques compartidos.   

Esto permite que su equipo aproveche los conocimientos de otros desarrolladores externos a la empresa incorporando las soluciones de estos a su proyecto e incluso la reutilización de código a través de proyectos.  

En la web oficial de **"[npm]"** podemos encontrar diferentes paquetes o módulos para Node.js, inicialmente **"npm"** comenzó como gestor de Node.js.  

**"npm"** dispone de una página web que contiene multitud de paquetes registrados, es también una base de datos con información sobre los paquetes o módulos que otros desarrolladores comparten. Mediante la instalación del ++"cliente npm"++ el desarrollador lo utilizará para publicar su código en dicho registro de la base de datos, cuando aparezca la entrada de dicho paquete, otros desarrolladores utilizarán su "cliente npm" para instalar el paquete del registro. 

##¿Usar "bower" o "npm"?
Ambos son gestores, pero nuestra opción es **"npm"** porque es el más utilizado para gestionar los módulos para Node.js trabajando en front-end como en el back-end cuando se combina con otros paquetes (por ejemplo: browserify), mientras que **"Bower"** sólo es para el "front-end". 

Referente al árbol de dependencias **"npm"** tiene un árbol de dependencias (de gran tamaño) mientras que **["Bower"][webBower]** sólo require un árbol de dependencias plana ya que pone la carga de la resolución de dependencias en el usuario.  

Más información **[aquí][bowerVSnpm]**.

##Referencias
+ [Página oficial npm](https://docs.npmjs.com/getting-started/what-is-npm).
+ [Documentación Node.js 4.4.0 LTS](https://nodejs.org/dist/latest-v4.x/docs/api/).

<!--  Referencias y enlaces a las fuentes -->
[webNode]:https://nodejs.org/en/
[versatilidad]:http://www.nodehispano.com/2011/11/que-es-node-js-nodejs/
[npm]:https://www.npmjs.com/
[bowerVSnpm]:http://stackoverflow.com/questions/18641899/what-is-the-difference-between-bower-and-npm
[webBower]:https://www.npmjs.com/package/bower