const { Router } = require("express");

const routesOrders = Router();
const { ordersController } = require("../Controllers/Orders.Controller");
const { authMiddleware } = require("../middlewares/AuthMiddleware");

routesOrders.post(
  "/create/:idUser",
  authMiddleware.verifyToken,
  ordersController.createOrder
);
routesOrders.put(
  "/get/:id",
  authMiddleware.verifyToken,
  ordersController.getOrder
);
routesOrders.put(
  "/finalize/:idUser",
  authMiddleware.verifyToken,
  ordersController.finalizeOrder
);

module.exports = routesOrders;
