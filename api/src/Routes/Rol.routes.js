const { Router } = require("express");

const routesRol = Router();
const { rolController } = require("../Controllers/Rol.controller");
const { authMiddleware } = require("../middlewares/AuthMiddleware");

routesRol.post("/create", authMiddleware.verifyToken, rolController.createRol);
routesRol.put("/update/:id", authMiddleware.verifyToken, rolController.updateRol);
routesRol.delete(
  "/delete/:id",
  authMiddleware.verifyToken,
  rolController.deleteRol
);
routesRol.get("/get", authMiddleware.verifyToken, rolController.getRol);

module.exports = routesRol;
