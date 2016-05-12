#Paquete Flux para node.js

##Descripción
Patrón (independiente de flux) que usaremos en la capa de presentación que se pretende seguir en los proyectos que desarrollamos en AITEX. En este caso seguimos la implementación que ha desarrollado Facebook ( y que sirve de base en la mayoría de otros paquetes que implementan flux).  

> Como norma general en React.js es muy fácil ponerle lógica de negocio a los mismos componentes, dejando que estos sean todo lo reutilizables que deberían ser. Además nos encontramos que los componentes padres deben ser Vistas, al final actúan como Controladores, Vistas-Detalles, etc.  

> **Lógica de negocio / Lógica de la aplicación:**  conjunto de reglas para reaccionar antes distintas situaciones que queda a cargo de los modelos los cuales deberán saber qué hacer ante las situaciones que se produzcan en el proceso de ejecución de una aplicación.

##Instalación propuesta
Desde el prompt de "node.js" escribiremos `npm install --save flux` además tenemos los detalles de la instalación **[aqui](https://www.npmjs.com/package/flux).**

##Uso
Utilizaremos Flux para organizar nuestro código y separar responsabilidades. Flux se fundamenta en crear una comunicación fluida entre los distintos niveles, siempre direccionando la comunicación de arriba hacia abajo.  

El patrón Flux se centra en un "dispatcher" centralizado que actúa como mecanismo de publicador/suscriptor. Este mecanismo lo usaremos para comunicar a nuestros componentes que algo ha cambiado y que por lo tanto el componente (si procede) deberá renderizarse o lo que proceda.

![flux_map.png](../images/flux_map.png "Diagrama conceptual de Flux")  

Explicación del diagrama:
1. Empezamos desde la "Acción", que podría haber sido creada desde una **[WebApi][webapi]** o por una interacción del usuario con la vista (que también puede llamar a una WebApi).  
> **Web API:** "_API_" interfaz de programación de aplicaciones (o Application Programming Interface) que es un conjunto de rutinas que provee acceso a funciones de un determinado software. En la web se publican para ofrecer la posibilidad de realizar acciones, acceso a características *(fuente: Wikipedia)*.  

> + El usuario quiere borrar un Autor. Por lo que al interactuar con el enlace oportuno, genera una acción compuesta para llamar a la WebApi para que la borre al autor e informar al "dispatcher" que se ha procedido al borrado.  

2. La "Acción" se notifica al "Disptacher", éste comprueba qué "Stores" se han suscrito a dicha "Acción" y se publican (notifica). La "Store" equivale al modelo, el que contiene los datos de la aplicación, por lo que no se caracteriza por tener lógica.

	+ Marcará en la "Store" que en el Autor se está borrando. Vamos a considerar que hasta que no se obtenga una acción de cofirmación de borrado, no se va a borrar, meramente se marcan como que se están borrando.  

3. Las "Stores" harán lo que tengan programado (en principio nada ya que sólo contienen datos) y notificarán a las "Vistas" o "Componentes React.js", éstos a su vez consultarán a la "Store" y si les afecta el cambio se tendrán que renderizar (las "Vistas" se suscriben al evento "Change" de la "Store"). Por lo que las "Vistas" o "Componentes React.js" no interaccionarán nunca con el "Dispatcher".

	+ Los componentes suscritos a la "Store", le solicitarán los nuevos valores, verán los cambios ocasionados, realizando un renderizado con los nuevos valores.

	Este proceso es cíclico porque estos pasos son los que describen el ciclo de vida de una aplicación React.  
    + (Siguiendo con el ejemplo), cuando la petición de borrado se tenga resuelta (si recibimos un "200" es que ha sido borrado, en caso contrario no se ha borrado correctamente - recibimos un "500"), esta misma puede ejecutar otra acción, que será el borrado del elemento de la "Store" y el consiguiente renderizado.
    ![flux_detail.png](../images/flux_details.png "Detalle del direccionamiento de Flux")
> Hay que tener en cuenta que los componentes React tienen que ser lo más aislados posibles y que su única comunicación debería de ser con el componente de nivel superior mediante sus propiedades, mientras que el padre lo escucha mediante eventos.  

##Referencias
+ [Gestor de paquetes "npm"](https://www.npmjs.com/).
+ [Flux en el gestor de paquetes "npm"](https://www.npmjs.com/package/flux).
+ [Flux documentación en GitHub](https://github.com/facebook/flux).
+ [Web oficial de Flux](http://facebook.github.io/flux/).
+ [Documentación - Web oficial Flux](https://facebook.github.io/flux/docs/overview.html).
+ [Tutorial - Web oficial Flux](https://facebook.github.io/flux/docs/todo-list.html).
+ [Introducción a Web API en ASP.NET](https://www.pluralsight.com/courses/aspnetwebapi).
+ [Video: Flux, Arquitectura de UI, explicado por Eduard Tomàs](https://www.youtube.com/watch?v=IRitxt702EY).
+ [Programación por capas (Wikipedia)](https://es.wikipedia.org/wiki/Programaci%C3%B3n_por_capas).
+ [¿Qué es el MVC (modelo-vista-controlador)?](http://www.desarrolloweb.com/articulos/que-es-mvc.html).
<!-- Referencias ocultas -->
[webapi]:https://es.wikipedia.org/wiki/Web_API
