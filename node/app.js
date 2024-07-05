import express from "express";
import cors from "cors";
//importamos la conexión a la DB
import db from "./DataBase/db.js";
//importamos nuestro enrutador
import productsRoutes from "./Routes/Routes.js";
import categoryRoutes from "./Routes/RouteCategory.js"
import salesRoutes from './Routes/SalesRoutes.js';
import AccountRoutes from './Routes/AccountRoute.js';
import UsuarioRoute from './Routes/UsuarioRoute.js';
import DireccionModel from "./Routes/DireccionRoute.js";
import WishlistRoutes from "./Routes/WishlistRoutes.js";
import CardRoute from "./Routes/CardRoute.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use("/product", productsRoutes);
app.use("/category", categoryRoutes);
app.use("/sales", salesRoutes);
app.use("/account", AccountRoutes);
app.use("/usuario", UsuarioRoute);
app.use("/direccion", DireccionModel);
app.use("/wish", WishlistRoutes);
app.use("/card", CardRoute);

try {
  await db.authenticate();
  console.log("Conexión exitosa a la DB");
} catch (error) {
  console.log(`El error de conexión es: ${error}`);
}

app.listen(8000, () => {
  console.log("Server UP running in http://localhost:8000/");
});
