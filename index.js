import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { routes } from "./src/routes/routes.js";
dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}/`);
});