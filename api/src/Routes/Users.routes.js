const { Router } = require("express");

const routesUser = Router();
const usersController = require("../Controllers/Users.controller");
const { authMiddleware } = require("../middlewares/AuthMiddleware");

routesUser.post(
  "/signup",
  usersController.registerUser
);
routesUser.put(
  "/updateUsProfile/:id",
  authMiddleware.verifyToken,
  usersController.updateUser
);
routesUser.delete(
  "/deleteOrInactiveUser/:id",
  authMiddleware.verifyToken,
  usersController.deleteUser
);
routesUser.get(
  "/getUser/:id",
  authMiddleware.verifyToken,
  usersController.getUsers
);
routesUser.post("/signin", usersController.login);

module.exports = routesUser;
