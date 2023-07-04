## DEV MS

Este es el repositorio para trabajar de forma local todo lo que es React.
### Importante: 
Extiende de la rama `dev`, por lo tanto, si en nuestras casas (remoto), se toca codigo, ese codigo tambien se debe integrar en `dev-ms`, para que lo podamos tener actualizado en el entorno local.

## Configuración:

 1. Eliminar `node_modules`, copy-paste del package-json, y hacer `npm i`. Esto para actualizar las dependencias correspondientes del proyecto, y evitar problemas de dependencias.
 ````json
	"dependencies": {  
			"@babel/plugin-proposal-class-properties": "^7.18.6",  
			"@babel/plugin-transform-runtime": "^7.22.5",  
			"dotenv": "^16.3.1",  
			"@tanstack/react-query": "^4.29.12",  
			"axios": "^1.4.0",  
			"bootstrap": "^5.3.0",  
			"bootstrap-icons": "^1.10.5",  
			"moment": "^2.29.4",  
			"react": "^18.2.0",  
			"react-data-table-component": "^7.5.3",  
			"react-dom": "^18.2.0",  
			"react-icons": "^4.9.0",  
			"react-loader-spinner": "^5.3.4",  
			"react-redux": "^8.0.7",  
			"react-router-dom": "^6.12.1",  
			"react-spinners": "^0.13.8",  
			"redux": "^4.2.1",  
			"redux-devtools-extension": "^2.13.9",  
			"redux-thunk": "^2.4.2",  
			"sweetalert2": "^11.7.12"  
	},  
	"devDependencies": {  
			"@babel/preset-react": "^7.22.5",  
			"@hotwired/stimulus": "^3.0.0",  
			"@symfony/stimulus-bridge": "^3.0.0",  
			"@symfony/webpack-encore": "^1.7.0",  
			"axios": "^1.4.0",  
			"core-js": "^3.0.0",  
			"prop-types": "^15.8.1",  
			"react": "^18.2.0",  
			"react-dom": "^18.2.0",  
			"regenerator-runtime": "^0.13.2",  
			"webpack-notifier": "^1.6.0",  
			"@tanstack/react-query-devtools": "^4.29.12",  
			"@types/react": "^18.0.37",  
			"@types/react-dom": "^18.0.11"  
	}  
````
 3. Hacer un ````git clone <repo>````, y situarnos sobre la rama de `dev-ms` (!ACA VAMOS A HACER TODOS LOS CAMBIOS).
 4. Habilitar el plugin de React (permitiendonos el autoImport de react en cada archivo). Tambien, configurar la variable de entorno de la API:
 ````js
	 const webpack = require("webpack");
	 
	 Encore.
	 //..
		 .configureDefinePlugin(options => {  
			const env = dotenv.config();  
			  
			if (env.error) {  
			throw env.error;  
			}  
			  
			options['process.env'].SECRET = JSON.stringify(env.parsed.APP_SECRET);  
			options['process.env'].API_URL = JSON.stringify(env.parsed.API_URL);  
		})  
	  
	.addPlugin(new webpack.ProvidePlugin({"React": "react"}))
	//..
 ````
 5. Dentro de `DefaultController` (o algun controlador que creemos para renderizar las rutas), tenemos que hacer, por cada ruta, una funcion. Y esa funcion, definirla en `config/routes.yaml` (ver repositorio hecho por mí).
 6. Habilitar los estilos propios de la app y el CDN de Bootstrap:
 ````twig
		{% block stylesheets %}  
			<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">  
			{{ encore_entry_link_tags('app') }}  
		{% endblock %}  
		  
		{% block javascripts %}  
			<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>  
			{{ encore_entry_script_tags('app') }}  
		{% endblock %}
````
 
 ### Pendientes
 * Indagar más sobre las variables de entorno dependiendo el entorno en el que estemos desarrollando.
