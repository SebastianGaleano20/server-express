## Iniciamos nuestro Proyecto con EXPRESS

npm init

## Instalamos nuestras dependencias

npm i express dotenv cors

## Estructura MVC

## Creamos nuestras carpetas y archivos

touch .gitignore .env .env.example README.md
mkdir src
-- Dentro de src ( cd src):

- touch index.js (Archivo principal de la app).
- mkdir controllers models middlewares routes views database

## Configuramos nuestro puerto en nuestro archivo .env

PORT=2020 (ejemplo)

## Creamos nuestro servidor

-- En index.js:

- importamos express, cors y dotenv
  -- Para configurar la variable de entorno de nuestro servidor:
  dotenv.config()

-- Creamos una variable para utilizar express y levantar el servidor.
const app = express();

-- Llamamos al puerto a utilizar:
const port = process.env.PORT

-- Indicamos el puerto para escuchar nuestro servidor:
app.listen(port , ()=>{
console.log(`Servidor activo en http://localhost:${port}`)
})

## Ya tenemos activo nuestro servidor.

## Le indicamos a nuestra aplicacion que use cors

- app.use(cors());

## Le indicamos a nuestra aplicacion que toda respuesta se muestre en formato JSON

app.use(express.json());

## Creamos nuestro archivo JSON para la base de datos en la carpeta database

- product.json

## Models

- En nuestro archivo vamos a crear los models a utilzar en nuestra app

- Importamos fs para poder leer y reescribir nuestra base de datos:
  import fs from 'node:fs'

## Creamos el modelo para mostrar la base de datos

export const getProducts = () =>{
//
try{
return products;
} catch(error){
throw new Error("404 - NOT FOUND");
}
};
try - catch para indicarle a nuestro archivo que intente realizar la funcion y en caso de encontrar un error devovler un mensaje al usuario.

## Importamos nuestra base de datos:

import products from "../database/product.json" assert {type: "json"};

- Utilizamos assert para indicar que el tipo de importacion de la data sera en formato JSON.

## Creamos la funcion para agregar data a nuestra base de datos:

export const addProduct = (newProduct) => {
try {const products = getProducts();
products.push(newProduct);
fs.writeFileSync("./src/database/product.json", JSON.stringify(products));
return "Agregado con exito";
} catch (error){
throw new Error ("406 - NOT POSSIBLE");
}
};

## Controller

- Creamos nuestro archivo controlador de los modelos.
- productsController.js

## Importaciones

- Importamos todos los models del archivo productModels:
  import _ as productModel from "../models/productModels.js"
  ( Con _ indicamos que queremos extraer todos los modulos que estan en el archivo, con "as" le indicamos el nombre que va a tener el objeto importado)
## Creamos la Vista (View)

- Archivo que tiene la responsabilidad de mostrarle al usuario la respuesta.
- En la carpeta Views creamos un archivo js
  productViews.js

## Funcion response

-export const responseProducts = (res, code, data)=>{
response.writeHead(code, { "Content-Type": "application/json" });
res.end(JSON.stringify(data));
};

Recibimos por parametro la response del usuario, el statusCode (ej: 404 de error), y la data.

# Creamos los controladores

- export const getProducts = (req,res) =>{
  try {
    const products = productModel.getProducts();
    responseProducts(res,200,products);
  } catch (error) {
    responseProducts(res,404,{message: "ERROR_TO_GET_DATA"});
  }
};

Con try/catch intentamos obtener con productModel.getProducts() lo que retorna dicha funcion/modulo. (En este caso nos retorna la base de datos)

- Para mostrarle al usuario el contenido, utilizamos la funcion responseProducts que se responsabiliza a realizar esa tarea. 
- Mediante los parametros le enviamos la response, el statusCode en caso de exito (200) y la data que contiene products (En este caso, el retorno de getProducts()).
- En caso de error, los parametros cambian a statusCode: 404 y data como objeto con un mensaje al usuario.


## Controlador add
- export const addProducts = (req, res) => {
  try {
    const newProduct = req.body;
    newProduct.id = crypto.randomUUID();
    productModel.addProduct(newProduct);
    responseProducts(res, 200, {
      message: "ADDED_PRODUCT_SUCCESFUL",
    });
  } catch (error) {
    responseProducts("ERROR_TO_ADD_PRODUCT");
  }
};

con try/catch desde la req capturamos dentro de la variable una propiedad llamada body que es el contenido que nos envia el usuario como data.
- guardamos en una variable newProduct el contenido y le añadimos un id con randomUUID.

## Routes
- Creamos el archivo para manejar nuestras routes.
 routes.js
## Configuramos el enrutador
- Importamos express
import express from "express";

- Importamos los controladores
import * as productsController from "../controllers/productsControllers.js";

## Creamos la ruta
- export const routes = express.Router();

con express.Router() creamos nuestro manejador de rutas.

## Creamos la solicitud GET
- routes.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    app: "express-server-utn",
    endpoints: {
      index: "/",
      getProducts: "/api/product",
      addProducts: "/api/product",
    },
  });
});

con routes.get() utilizamos la funcion que tiene como responsabilidad iniciar su funcionalidad cuando el usuario hace una peticion de tipo GET
como primer parametro le indicamos "/" la URL que va a tomar como referencia, como segundo parametro le enviamos una req y res que muestra el contenido. 

Le indicamos el menu principal de nuestra aplicacion que nos da informacion sobre la aplicacion y sus endpoint.
