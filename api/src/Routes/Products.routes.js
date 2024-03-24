const { Router } = require("express");

const routesProduct = Router();
const productController = require("../Controllers/Products.controller");

routesProduct.post("/upProduct", productController.postProduct);
routesProduct.put("/updateProduct/:id", productController.updateProduct);
routesProduct.put("/deleteOrInactiveProduct/:id", productController.deleteProduct);
routesProduct.get("/getProducts", productController.getDataProducts);

module.exports = routesProduct;
