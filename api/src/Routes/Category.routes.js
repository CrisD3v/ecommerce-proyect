const { Router } = require("express");

const routesCategory = Router();
const { categoriesController } = require("../Controllers/Categories.controller");
const { authMiddleware } = require("../middlewares/AuthMiddleware");
const multer = require('multer')
const storage = require('../App/Config/multer.config')
const upload = multer({ storage:storage});

routesCategory.post(
  "/create",
  authMiddleware.verifyToken,
  upload.single("file"), // Middleware de multer para procesar un solo archivo
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
    categoriesController.getAllCategories
);

module.exports = routesCategory;
