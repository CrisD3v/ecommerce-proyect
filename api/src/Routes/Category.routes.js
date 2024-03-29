const { Router } = require("express");

const routesCategory = Router();
const { categoriesController } = require("../Controllers/Categories.controller");
const { authMiddleware } = require("../middlewares/AuthMiddleware");

routesCategory.post(
    "/create",
    authMiddleware.verifyToken,
    categoriesController.createCategory
);
routesCategory.put(
    "/update/:id",
    authMiddleware.verifyToken,
    categoriesController.updateCategory
);
routesCategory.put(
    "/delete/:id",
    authMiddleware.verifyToken,
    categoriesController.deleteCategory
);
routesCategory.get(
    "/get",
    authMiddleware.verifyToken,
    categoriesController.getAllCategories
);

module.exports = routesCategory;
