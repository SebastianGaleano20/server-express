import * as productModel from "../models/productModels.js";
import { responseProducts } from "../views/productsViews.js"
export const getProducts = (req, res) => {
  try {
    const products = productModel.getProducts();
    responseProducts(res, 200, products);
  } catch (error) {
    responseProducts(res, 404, {
      message: "ERROR_TO_GET_DATA",
    });
  }
};

export const addProducts = (req, res) => {
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
