const { Router } = require("express");

const routesProduct = Router();
const productController = require("../Controllers/Products.controller");
const multer = require("multer");
const storage = require("../App/Config/multer.config");
const upload = multer({ storage: storage });

routesProduct.post(
  "/upProduct",
  upload.single("file"), // Middleware de multer para procesar un solo archivo
  productController.postProduct
);
routesProduct.put("/updateProduct/:id", productController.updateProduct);
routesProduct.put(
  "/deleteOrInactiveProduct/:id",
  productController.deleteProduct
);
routesProduct.get("/getProducts", productController.getDataProducts);

module.exports = routesProduct;
