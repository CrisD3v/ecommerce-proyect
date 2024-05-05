const { Router } = require("express");

const routesCart = Router();
const {
  cartController,
} = require("../Controllers/Cart.controller");
const { authMiddleware } = require("../middlewares/AuthMiddleware");

routesCart.post(
  "/create",
  cartController.storeProducts
);
routesCart.put(
  "/update/:id",
  cartController.updateStoreProducts
);
routesCart.delete(
  "/delete/:id",
  authMiddleware.verifyToken,
  cartController.deleteStore
);
routesCart.get("/get", cartController.getStore);

module.exports = routesCart;
