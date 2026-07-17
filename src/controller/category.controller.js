const { Label } = require("../model");
const Category = require("../model/categoryModel");
const httpStatusCode = require("../utils/httpStatusCode");
const logger = require("../utils/logger");
const categoryValidation = require("../validation/categoryValidation");

class CategoryController {
  async addCategory(req, res) {
    try {
      const { error } = categoryValidation.validate(req.body);

      if (error) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: error.details[0].message,
        });
      }
      const { name, description } = req.body;
      const existingCategory = await Category.findOne({
        where: { name },
      });

      if (existingCategory) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Category already exists",
        });
      }
      const category = await Category.create({
        userId: req.user.id,
        name,
        description,
      });
      logger.info(`Category created: ${category.name}`);

      return res.status(httpStatusCode.CREATED).json({
        success: true,
        message: "Category created successfully",
        category,
      });
    } catch (error) {
      logger.error(error.message);
      res
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: "Failed to create category" });
    }
  }
  async findCategory(req, res) {
    try {
      const categories = await Category.findAll({
        where: { userId: req.user.id },
      });
      return res.status(httpStatusCode.OK).json({
        message: "Category fetched successfully",
        categories,
      });
    } catch (error) {
      console.error("Error fetching categories :", error);
      res
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to create categories " });
    }
  }
  async editCategory(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findOne({
        where: {
          id,
          userId: req.user.id,
        },
      });

      if (!category) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Category not found",
        });
      }
      await category.update(req.body);
      return res.status(httpStatusCode.OK).json({
        message: "Category updated successfully",
        category,
      });
    } catch (error) {
      res
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to update product" });
    }
  }
  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findOne({
        where: {
          id,
          userId: req.user.id,
        },
      });

      if (!category) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Category not found",
        });
      }
      await category.destroy();
      return res.status(httpStatusCode.OK).json({
        message: "Category deleted successfully",
        category,
      });
    } catch (error) {
      res
        .status(httpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to delete product" });
    }
  }
  async addLabel(req, res) {
    try {
      const { name } = req.body;

      const existingLabel = await Label.findOne({
        where: {
          name,
          userId: req.user.id,
        },
      });

      if (existingLabel) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Label already exists",
        });
      }

      const label = await Label.create({
        userId: req.user.id,
        name,
      });

      return res.status(httpStatusCode.CREATED).json({
        success: true,
        message: "Label created successfully",
        label,
      });
    } catch (error) {
      logger.error(error.message);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async listCategoriesAndLabels(req, res) {
    try {
      const categories = await Category.findAll({
        where: {
          userId: req.user.id,
        },
      });

      const labels = await Label.findAll({
        where: {
          userId: req.user.id,
        },
      });

      return res.status(httpStatusCode.OK).json({
        success: true,
        categories,
        labels,
      });
    } catch (error) {
      logger.error(error.message);

      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new CategoryController();
