const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const server = express();

// Importacion de rutas
const userRoutes = require("../Routes/Users.routes");
const productRoutes = require("../Routes/Products.routes");
const rolRoutes = require("../Routes/Rol.routes");
const ordersRoutes = require("../Routes/Orders.routes");
const categoriesRoutes = require("../Routes/Category.routes");
const subCategoriesRoutes = require("../Routes/SubCategory.routes");

server.use(cors());
server.set("port", process.env.PORT || 3004);
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Rutas middleware
server.use("/api/users", userRoutes);
server.use("/api/products", productRoutes);
server.use("/api/rol", rolRoutes);
server.use("/api/orders", ordersRoutes);
server.use("/api/categories", categoriesRoutes);
server.use("/api/subCategories", subCategoriesRoutes);

// Test route
server.get("/", (req, res) => {
  res.send("Ecommerce API is running...");
});

// Elimina Datos cada 3 dias
const { deleteInactiveData } = require("../Utils/Validaciones/Data.utils");
// Ejecuta la función cada 3 días (86400000 ms = 24 horas * 60 minutos * 60 segundos * 1000 ms)
setInterval(deleteInactiveData.deleteInactiveProducts, 86400000 * 3);
// Ejecuta la función cada 3 días (86400000 ms = 24 horas * 60 minutos * 60 segundos * 1000 ms)
setInterval(deleteInactiveData.deleteInactiveOrders, 86400000 * 3);

module.exports = server;
