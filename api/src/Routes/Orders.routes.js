const { Router } = require("express");

const routesOrders = Router();
const { ordersController } = require("../Controllers/Orders.Controller");
const { authMiddleware } = require("../middlewares/AuthMiddleware");

routesOrders.post(
  "/create/:idUser",
  authMiddleware.verifyToken,
  ordersController.createOrder
);
routesOrders.get(
  "/get",
  authMiddleware.verifyToken,
  ordersController.getOrder
);
routesOrders.put(
  "/finalize/:idUser",
  authMiddleware.verifyToken,
  ordersController.finalizeOrder
);
routesOrders.delete(
  "/cancel/:idUser",
  authMiddleware.verifyToken,
  ordersController.cancelOrder
);

module.exports = routesOrders;
