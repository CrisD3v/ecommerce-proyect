const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const server = express();

// Importacion de rutas
const userRoutes = require("../Routes/Users.routes");
const productRoutes = require("../Routes/Products.routes");
const rolRoutes = require("../Routes/Rol.routes");

server.use(cors());
server.set("port", process.env.PORT || 3004);
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Rutas middleware
server.use("/api/users", userRoutes);
server.use("/api/products", productRoutes);


// Test route
server.get("/", (req, res) => {
  res.send("Ecommerce API is running...");
});

const { deleteInactiveProducts } = require("../Utils/Validaciones/Data.utils");
// Ejecuta la función cada 3 días (86400000 ms = 24 horas * 60 minutos * 60 segundos * 1000 ms)
setInterval(deleteInactiveProducts, 86400000 * 3);

module.exports = server;
