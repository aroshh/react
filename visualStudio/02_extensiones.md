##Extensiones / plugins para Visual Studio 2015
Disponiendo de la versión "Community" necesitaremos las siguientes extensiones:
+ **[ASP.NET and Web Tools 2015](https://visualstudiogallery.msdn.microsoft.com/c94a02e9-f2e9-4bad-a952-a63a967e3935)**, nos proporcionará herramientas de soporte para ASP.NET, ASP.NET 5, ASP.NET Core. Despliegue de nuestras aplicaciones  ASP.NET sobre servidores IIS o Microsoft Azure. Actualizar editores de código, soporte para los gestores de paquetes "npm" y "bower", etc.

+ **[ASP.NET Frameworks and Tools 2015](https://visualstudiogallery.msdn.microsoft.com/2f8a7e60-2e6b-4220-b334-26d1e60ec54c)**, proporciona ASP.NET MVC 5 como un marco para la construcción y basada en estándares de aplicaciones web escalables mediante el uso de patrones establecidos, usando ASP.NET y .NET Framework.

+ **[ASP.NET 5 RC1 Update 1](https://www.nuget.org/packages/Microsoft.AspNet.Mvc/5.1.0-rc1)**, necesario para construir sitios web dinámicos de forma eficiente.

##Otras extensiones
+ **[NPM Task Runner](https://visualstudiogallery.msdn.microsoft.com/8f2f2cbc-4da5-43ba-9de2-c9d08ade4941)**, añade soporte para los scripts "npm" del fichero "package.json" en el "Task Runner Explorer" (explorador del ejecutador de tareas).  

 ![npm_task_runner_json.png](images/npm_task_runner_json.png "NPM Task Runner")  

>Por lo que además de detectar nuestro fichero **"gulpfile.js"** y sus tareas, también puede mostrar las tareas que trae aparecen en nuestro fichero **"package.json"** (creado mediante el "cliente npm").


+ **[Markdown Mode](https://visualstudiogallery.msdn.microsoft.com/0855e23e-4c4c-4c82-8b39-24ab5c5a7f79)**, para editar código en Markdown, nos descargaríamos la extensión y la instalaríamos en nuestro Visual Studio 2015. Podemos abrir directamente un archivo con extensión **md** ("markdown").

![](images/markdown_visual_studio_new.png)  

> El problema que presenta, son los acentos, por lo que tendríamos que utilizar carácteres especiales para mostrar: acentos, "ñ", "ç", signos de puntuación, etc.  

> | Caracter | Código |
|--------|--------|
| á | `&aacute;` |
| Á | `&Aacoute;` |
| ñ | `&ntilde;` |
| Ñ | `&Ntilde;` |

##Referencias
+ [Otros Task Runner disponibles en Visual Studio para desarrollo web](https://blogs.msdn.microsoft.com/webdev/2016/01/06/task-runners-in-visual-studio-2015/).
+ [Codificación de caracteres en HTML](http://librosweb.es/libro/xhtml/capitulo_3/codificacion_de_caracteres.html).