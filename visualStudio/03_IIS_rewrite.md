##URL Rewrite 2.0 (para Internet Information Services)
![web_install_url.png](../images/web_install_url_rewrite.png "Instalación desde la plataforma web")
Esta extensión habilita a los administradores web a crear reglas para implementar URL's que sean más fáciles para los usuarios recordar y facilitar a los motores de búsqueda para encontrar.
Nos descargaremos el paquete instalador para MS Windows dependiendo de la arquitectura:
- Instalador Plataforma Web.
- x86, x64.

Dicho módulo **es compatible con** las siguientes versiones de **IIS: 7, 7.5, 8, 8.5, 10.**

Nosotros trabajamos con "Visual Studio 2015 Community" pero utilizamos el **"IIS 10.0 Express"** que viene incluido también, por lo que no podremos ejecutarlo, ya que necesitaríamos tener instalado el **"IIS 7"** (cómo mínimo):  

![wizar_instalador_web_rewrite.png](../images/wizar_instalador_web_rewrite.png "Instalador plataforma web")

Para solucionar el problema tendremos que acceder al registro de MS Windows mediante `regedit` Tendremos que situarnos en la siguiente ruta `HKEY_LOCAL_MACHINE > SOFTWARE > Microsoft > InetStp` y modificar el tipo y el valor del registro "MajorVersion" (Sería conveniente realizar una copia del registro por seguridad)

![regedit_url_rewrite.png](../images/regedit_url_rewrite.png "Registro de Windows")  

Guardamos los cambios y actualizamos con `F5`, después desde el instalador web o desde el paquete MSI procederemos a la instalación del módulo URL Rewrite 2.0. Ahora ya no tendremos problema en instalarlo y tampoco necesitaremos instalarnos ningún IIS totalmente en nuestro sistema.

***La explicación de dicho problema radica en que en el registro se guarda la versión mediante dos dígitos, es decir, si tenemos el IIS 7.0 => 70 (versión mínima), entonces como tenemos el IIS 10 => 10, a la hora de instalar se realiza la comprobación entre las distintas versiones entonces da error por lo que después nos aparece que tenemos una versión anterior a la 7.0.***

##Referencias
+ **[URL Rewrite 2.0](https://www.iis.net/downloads/microsoft/url-rewrite)**
+ **[IIS URL ASP.NET Routing](http://www.iis.net/learn/extensions/url-rewrite-module/iis-url-rewriting-and-aspnet-routing)**
+ **[Solución para Instalar Módulo URL Rewrite 2.0 en IIS Express 10.0](https://forums.iis.net/t/1223556.aspx)**
+ **[Reparación Módulo URL Rewrite 2.0](http://weblog.west-wind.com/posts/2015/Jul/05/Windows-10-Upgrade-and-IIS-503-Errors)**
+ **[Uso Módulo URL Rewrite para ASP.NET](https://support.rackspace.com/how-to/rewrite-urls-from-aspnet-on-cloud-sites/)**