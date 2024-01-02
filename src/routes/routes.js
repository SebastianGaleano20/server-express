import express from "express";
import * as productsController from "../controllers/productsController.js";
import { middlewareProductStructure } from "../middlewares/middlewareProductStructure.js";

const routes = express.Router();

routes.get("/", (req, res) => {
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

//  http:localhost:2010/api/product -> GET
routes.get("/api/product", productsController.getProducts);


//  http:localhost:2010/api/product:id -> GET
routes.get("/api/product:id", productsController.getProductById);


routes.post(
  "/product",
  middlewareProductStructure,
  productsController.addProducts
);

export { routes };
