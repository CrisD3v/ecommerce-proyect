const express = require("express");
const router = express.Router();

// Importing sub-routes
const userRoutes = require("./Users.routes");
const productRoutes = require("./Products.routes");
const rolRoutes = require("./Rol.routes");

// Mounting sub-routes
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/rol", rolRoutes);

module.exports = router;
