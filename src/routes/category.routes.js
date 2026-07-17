const express = require("express");

const AuthCheck = require("../middleware/auth");
const categoryController = require("../controller/category.controller");
const categoryRouter = express.Router();

categoryRouter.post("/create", AuthCheck, categoryController.addCategory);
categoryRouter.get("/get", AuthCheck, categoryController.findCategory);
categoryRouter.put("/update/:id", AuthCheck, categoryController.editCategory);
categoryRouter.delete(
  "/delete/:id",
  AuthCheck,
  categoryController.deleteCategory,
);
categoryRouter.post("/create/label", AuthCheck, categoryController.addLabel);
categoryRouter.get(
  "/categories-labels",
  AuthCheck,
  categoryController.listCategoriesAndLabels,
);

module.exports = categoryRouter;
