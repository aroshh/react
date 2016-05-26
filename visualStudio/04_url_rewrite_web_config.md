## web.config
Primeramente establecemos las rutas entre el componente padre y sus respectivos hijos indicado en el fichero **"routes.jsx"** para poder navegar entre componentes react. Por otra parte, al ejecutar nuestra **SPA** utilizando **IIS Express 10.0** también establecemos unas reglas de navegación en nuestro fichero de configuración `web.config` dentro del propio proyecto de Visual Studio Community 2015 siendo el siguiente:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="httpPlatformHandler" path="*" verb="*" modules="httpPlatformHandler" resourceType="Unspecified"/>
    </handlers>
    <httpPlatform processPath="%DNX_PATH%" arguments="%DNX_ARGS%" stdoutLogEnabled="false" startupTimeLimit="3600"/>
    <defaultDocument enabled="true">
      <files>
        <clear/>
        <add value="index.html"/>
      </files>
    </defaultDocument>
    <rewrite>
      <rules>
        <rule name="Redirigir al indice1" enabled="true">
          <match url="myindice" />
          <action type="Redirect" url="/" />
        </rule>
        <rule name="Redirigir al indice2" enabled="true">
          <match url="myinicio" />
          <action type="Redirect" url="./index.html" />
          <!-- <action type="Redirect" url="http://localhost:51554/index.html" /> -->
        </rule>
        <rule name="Redirigir al error" enabled="true">
          <match url="fallo" />
          <action type="Redirect" url="./errorpage.html" />
        </rule>
        <rule name="Pagina no encontrada" patternSyntax="Wildcard">
          <match url="*"/>
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true"/>
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true"/>
          </conditions>
          <action type="Rewrite" url="errorpage.html"/>
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```
Explicamos el código anterior:
+ `<defaultDocument>` al habilitarlo indicamos que el fichero a cargar por defecto será nuestro `index.html` al ejecutar nuestra SPA.  

+ `<rules>...</rules>` indicamos que a continuación siguen las reglas de redirección en caso de que el navegador no encuentre el recurso indicado. Es una colección de "reglas distribuidas" que se pueden definir en cualquier nivel dentro de la jerarquía de la configuración, además dichas reglas distribuidas se utilizan para definir URL's lógicas de reescritura dentro del ámbito de configuración.  

+ `<rule>...</rule>` contiene el detalle de las reglas junto con las etiquetas necesarias para administrar con nombres concretos que dejamos habilitadas.  

+ `<match>` si aquello que escribimos en la url **contiene** "myinicio" o "myindice" indicamos que la acción a realizar (`<action>`) y mediante el atributo `type` "redireccione" al directorio raíz de nuestra aplicación o a un fichero. También podemos utilizar expresiones regulares para filtrar lo que escriba el usuario. **[Más sobre redireccionamiento](http://www.iis.net/learn/extensions/url-rewrite-module/url-rewrite-module-configuration-reference#Redirect_action).**

+ También podemos indicar condiciones (`<conditions>`) para que se aplique la regla. Añadiremos condiciones mediante `<add>` indicando mediante los atributos:
	+ **"input"** recogerá una string o cadena arbitraria que podrá incluir variables de servidor. El valor para el atributo será una variable de tipo servidor, por ejemplo: `"{REQUEST_URI}"`, `"{PATH_INFO}"`, etc., **[más información sobre dichas variables...](http://www.iis.net/learn/extensions/url-rewrite-module/url-rewrite-module-configuration-reference#Interaction_with_IIS_Output_Caching).**
	+ **"matchType"** podrá ser una de las siguientes opciones:
		+ **IsFile**, indicamos que si la cadena introducida contiene una ruta física a un archivo dentro de nuestro sistema de archivos.
		+ **IsDirectory**, si la cadena contiene una ruta física a un directorio.
	+ **"negate"**, atributo utilizado para el elemento `match`, entonces la acción de la regla se llevará a cabo sólo si la URL actual no coincide con lo que hemos especificado.
	+ **[Más información sobre condiciones](http://www.iis.net/learn/extensions/url-rewrite-module/url-rewrite-module-configuration-reference#Rule_conditions).**

##Referencias
+ **[Url rewrite module configuration reference (Tabla de contenidos)](http://www.iis.net/learn/extensions/url-rewrite-module/url-rewrite-module-configuration-reference).**
+ **[Configuración por defecto Web.config IIS](http://www.dantor.com/support/misc/web-config-default-website-document.aspx).**
+ **[ISS mejora rendimiento y SEO en .NET](http://www.humanlevel.com/articulos/desarrollo-web/como-configurar-internet-information-server-iis-para-mejorar-el-rendimiento-y-el-seo-de-tu-web.html).**
