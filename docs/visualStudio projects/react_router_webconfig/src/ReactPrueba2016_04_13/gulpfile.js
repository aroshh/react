/// <binding />
//Módulos requeridos 
var gulp = require('gulp'); 
var source = require('vinyl-source-stream');    // Se utiliza para transmitir paquete para su  
                                              // posterior manipulación 
var browserify = require('browserify'); 
var reactify = require('reactify'); 
var watchify = require('watchify'); 
var babelify = require('babelify');
var concat = require('gulp-concat'); 
var webserver = require('gulp-webserver');      // Por si queremos ejecutar nuestro propio servidor. 
var project = require('./project.json');        // Lectura del json del proyecto. 

//var uglify = require('gulp-uglify');

//Nombre de los archivos claves 
var fileNames = {}; 
fileNames.entrySource = "index.js";
fileNames.bundleDest = "main.js"; 

//Rutas 
var paths = { 
    webroot: "./" + project.webroot + "/"       // Propiedad del json. 
}; 

paths.js = paths.webroot + "js/"; 
paths.jsFiler = paths.js + "**/*.js"; 
paths.minJsFilter = paths.js + "**/*.min.js"; 
paths.cssFilter = paths.webroot + "css/**/*.css";
paths.minCssFilter = paths.webroot + "css/**/*.min.css"; 
paths.concatJsDest = paths.js + "site.min.js"; 
paths.concatCssDest = paths.webroot + "css/site.min.css"; 
paths.entrySource = "./site/js/" + fileNames.entrySource;
//
//paths.entrySourceCss = "./site/css/" + 
paths.bundleDest = paths.js + fileNames.bundleDest; 

var contador = 0;
var trans = 1; //contador para las veces que se transforma el bundler

//console.log("el cssFilter => " + paths.cssFilter);
//console.log("el minCssFilter => " + paths.minCssFilter);



//Definición de la Tarea 
gulp.task('browserify', function () {
    console.log('Se verifica la lectura de la variable paths.webroot:' + paths.webroot);
    console.log('Empezando con la tarea browserify'); 
    console.log('Creación del bundle usando babel con punto de partida ' + paths.entrySource); 
    var bundler = browserify({
        entries: [paths.entrySource],                   // Solo necesitamos el archivo inicial para encontrar dependencias. 
        transform: [reactify],
        transform: [[babelify, { "presets": ["es2015", "react"] }]],
        //transform: [babelify],                          // Queremos convertir JSX a EMACScript 5.0
        debug: true,                                    // Nos da sourcemapping 
        cache: {}, packageCache: {},
        fullPaths: true                                 // Reserva la ruta original con la que se generó. 
        //}).transform(babelify);
        //}).transform(babelify, { presets: ["es2015", "react"] });
    //});
        //}).on('transform', function () {
        //    console.log("Transformación correcta " + trans);
        //    trans++;
    });

    console.log('Preparando para que se quede observando los cambios.'); 
    var watcher = watchify(bundler); 
    return watcher
        .on('update', function () {                     // Cuando se modifique algún archivo 
            console.log('Actualización de Archivo detectada.');
            var updateStart = Date.now();

            console.log('Actualizando bundle', (Date.now() - updateStart) + 'ms...' + 'guardado(' + contador + ')');
            contador++;
            return watcher.bundle()                            // Crea un nuevo bundle (como se lo hemos pasado por parámetro ya tiene la configuración) 
                      // Logs errors
            .on('success', function () {
                console.log("Actualización realizada!!!");
            })
            .on('error', function (err) {
                console.log(err.message + ' error en el bundle ');
                this.emit('end');
            })
                //TODO: revisar xq no muestra el mensaje de finalización.
            .on('finish', function () {
                console.log('Finalizado con o sin errores el bundle!', (Date.now() - updateStart) + 'ms - ' + paths.bundleDest);
                this.emit('end');
            })
            .pipe(source(fileNames.bundleDest))
            
            .pipe(gulp.dest(paths.js))             // Se puede ver el nuevo bundle en paths.bundleDest 
        })
        .bundle()                                       // Crea el bundle inicial cuando se inicia la tarea 
        .pipe(source(fileNames.bundleDest))
        .pipe(gulp.dest(paths.js))
}); 


//Si falla algún módulo, si ejecutamos la tarea browserify no nos muestra el error. 
gulp.task('build', function () { 
    browserify({ 
        entries: [paths.entrySource],                   // Solo necesitamos el archivo inicial para encontrar dependencias. 
        transform: [reactify],
        //transform: [babelify],                          // Queremos convertir JSX a EMACScript 5.0 
        transform: [[babelify, { "presets": ["es2015", "react"] }]],
        debug: true,                                    // Nos da sourcemapping 
        cache: {}, packageCache: {}, 
        fullPaths: true                                 // Reserva la ruta original con la que se generó. 
    }) 
    .bundle() 
    .pipe(source(fileNames.bundleDest)) 
    .pipe(gulp.dest(paths.js)); 
}) 

//Iniciamos un server para ver la web, es innecesario pues solo estamos viendo html+js 
gulp.task('server', function () { 
    gulp.src(paths.webroot) 
    .pipe( 
        webserver({ 
            host: '127.0.0.1',                          // equivale a localhost 
            port: 8080,                                 // ojo en tener el puesto libre, en caso contrario saldrá un error EACCES 
            fallback: 'index.html', 
            livereload: true, 
        }) 
    ) 
})

// Ejecutará las 2 tareas 
gulp.task('default', ['browserify']);
//gulp.task('default', ['browserify', 'server']);
//Recordatorio: en windows Ctrl+C para parar el servicio.

