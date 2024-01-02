//Importamos la base de datos indicandole con assert el tipo json para retornarlo en dataJson
import products from "../database/product.json" assert { type: "json" };
import fs from "node:fs";
//Creamos la funcion que muestra nuestra base de datos
export const getProducts = () => {
  //
  try {
    return products;
  } catch (error) {
    throw new Error("404 - NOT FOUND");
  }
};
export const getProductById = (id) => {
  try {
    return products.find((prod) => prod.id === id);
  } catch (error) {
    throw new Error("404 - NOT FOUND");
  }
};

//Funcion para agregar un nuevo producto
export const addProduct = (newProduct) => {
   //Recibimos por parametro la data a agregar a nuestra base de datos
  try {
    //Guardamos nuestra base de datos en una variable
    const products = getProducts();
    //pusheamos a nuestra variable la data recibida por parametro
    products.push(newProduct);
    // Con fs reescribimos nuestra base de dato indicandole con JSON.stringify el formato a enviar y enviando por parametro el nuevo array.
    fs.writeFileSync("./src/database/product.json", JSON.stringify(products));
    //Mostramos un mensaje de exito
    return "Agregado con exito";
  } catch (error) {
    //En caso de error mostramos un mensaje de error
    throw new Error("406 - NOT POSSIBLE");
  }
};

