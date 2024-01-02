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

res.status(200).json()
le indicamos que la response va a tener un status de 200 (caso de exito) y que en formato JSON le mostramos la informacion dentro del array. (El objeto que indica el nombre de la app, su estado y sus endpoints)

## Route configurada
- Una vez creado todo le indicamos en el archivo index.js que la ruta a utilizar es la creada:
En index.js importamos la ruta:

import { routes } from "./routes/routes.js";

- utilizamos la ruta:

app.use("/api", routes);

## Ruta de la base de datos
- Dentro de routes.js
-routes.get("/product", productsController.getProducts);
para indicarle a nuestra aplecacion que cuando el usuario nos envie una peticion de tipo GET y la URL sea /product, utilice el controlador getProoducts importado como objeto dentro del archivo.

## Ruta para agregar un nuevo proucto
- routes.post(
  "/product",
  middlewareProductStructure,
  productsController.addProducts
);
le indicamos a la app que cuando el metodo de peticion sea POST y la URL sea "/product", ejecute el archivo middleware y luego el controlador para agregar el producto.

## Creacion del Middleware
// Definición de un middleware llamado middlewareProductStructure
export const middlewareProductStructure = (req, res, next) => {
    // Lista de propiedades requeridas en la estructura del producto
    const requiredProperties = [
      "id",
      "title",
      "price",
      "description",
      "category",
      "image",
      "rating",
    ];
  
    // Obtener el objeto de producto desde el cuerpo de la solicitud (request body)
    const product = req.body; // Se asume que los datos del producto están en el cuerpo de la solicitud
  
    // Iterar sobre las propiedades requeridas
    for (const property of requiredProperties) {
      // Verificar si el producto tiene la propiedad actual
      if (!product.hasOwnProperty(property)) {
        // Si falta alguna propiedad, enviar una respuesta de error y finalizar el middleware
        return res.status(400).json({ error: `Missing property: ${property}` });
      }
    }
  
    // Si se han verificado todas las propiedades, continuar con el siguiente middleware o ruta
    next();
};


Por supuesto, aquí está una explicación línea por línea del código proporcionado:

javascript
Copy code
// Definición de un middleware llamado middlewareProductStructure
export const middlewareProductStructure = (req, res, next) => {
    // Lista de propiedades requeridas en la estructura del producto
    const requiredProperties = [
      "id",
      "title",
      "price",
      "description",
      "category",
      "image",
      "rating",
    ];
  
    // Obtener el objeto de producto desde el cuerpo de la solicitud (request body)
    const product = req.body; // Se asume que los datos del producto están en el cuerpo de la solicitud
  
    // Iterar sobre las propiedades requeridas
    for (const property of requiredProperties) {
      // Verificar si el producto tiene la propiedad actual
      if (!product.hasOwnProperty(property)) {
        // Si falta alguna propiedad, enviar una respuesta de error y finalizar el middleware
        return res.status(400).json({ error: `Missing property: ${property}` });
      }
    }
  
    // Si se han verificado todas las propiedades, continuar con el siguiente middleware o ruta
    next();
};

- export const middlewareProductStructure = (req, res, next) => {: Declara y exporta un middleware llamado middlewareProductStructure. Los middlewares en Express son funciones que tienen acceso a los objetos de solicitud (req), respuesta (res), y la siguiente función en la pila de middlewares (next).

- const requiredProperties = [...];: Define un array llamado requiredProperties que contiene las propiedades que se esperan en la estructura del producto.

- const product = req.body;: Obtiene el objeto de producto desde el cuerpo de la solicitud. Se asume que la información del producto está incluida en el cuerpo de la solicitud (req.body).

- for (const property of requiredProperties) {: Inicia un bucle for...of para iterar sobre cada propiedad en requiredProperties.

- if (!product.hasOwnProperty(property)) {: Verifica si el objeto de producto no tiene la propiedad actual.

- return res.status(400).json({ error: Missing property: ${property} });: Si falta alguna propiedad, envía una respuesta de error (código de estado 400) indicando qué propiedad falta y finaliza el middleware. Este método devuelve la respuesta JSON y detiene la ejecución del middleware.

- next();: Si todas las propiedades requeridas están presentes en el objeto de producto, llama a la función next() para pasar al siguiente middleware o ruta en la pila de ejecución.
