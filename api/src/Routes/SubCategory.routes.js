const { Router } = require("express");

const routesSubCategory = Router();
const {
  subCategoriesController
} = require("../Controllers/SubCategories.controller");
const { authMiddleware } = require("../middlewares/AuthMiddleware");

routesSubCategory.post(
  "/create",
  authMiddleware.verifyToken,
  subCategoriesController.createSubCategory
);
routesSubCategory.put(
  "/update/:id",
  authMiddleware.verifyToken,
  subCategoriesController.updateSubCategory
);
routesSubCategory.put(
  "/delete/:id",
  authMiddleware.verifyToken,
  subCategoriesController.deleteSubCategory
);
routesSubCategory.get(
  "/get",
  authMiddleware.verifyToken,
  subCategoriesController.getAllSubCategories
);

module.exports = routesSubCategory;
