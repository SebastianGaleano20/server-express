import * as productModel from "../models/productModels.js"
import {responseProducts} from "../views/productsViews.js"
export const getProducts = (req,res) =>{
  try {
    const products = productModel.getProducts();
    responseProducts(res,200,products);
  } catch (error) {
    responseProducts(res,404,{message: "ERROR_TO_GET_DATA"});
  }
};

export const addProduct = () =>{

};

console.log(getProducts());