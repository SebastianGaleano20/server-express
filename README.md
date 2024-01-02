## Iniciamos nuestro Proyecto con EXPRESS
npm init

## Instalamos nuestras dependencias
npm i express dotenv cors

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
   app.use(cors());
- 
## Le indicamos a nuestra aplicacion que toda respuesta se muestre en formato JSON
   app.use(express.json());

## Creamos nuestro archivo JSON para la base de datos en la carpeta database
- product.json

## Creamos en la carpeta models el archivo productModels.js
- En nuestro archivo vamos a crear los models a utilzar en nuestra app

- Importamos fs para poder leer y reescribir nuestra base de datos:
   import fs from 'node:fs'

## Creamos la funcion que muestra nuestra base de datos:
  
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

