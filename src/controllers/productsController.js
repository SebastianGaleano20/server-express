import * as productModel from "../models/productModels.js"

export const getProducts = () =>{
  try {
    const products = productModel.getProducts();
    return products;
  } catch (error) {
    
  }
};

export const addProduct = () =>{

};

console.log(getProducts());