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

//  http:localhost:3005/api/product -> GET
routes.get("/product", productsController.getProducts);

routes.post(
  "/product",
  middlewareProductStructure,
  productsController.addProducts
);

export { routes };
