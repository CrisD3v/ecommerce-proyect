const { subCategoriesServices } = require("../Services/SubCategories.services");

const subCategoriesController = {
  createSubCategory: async (req, res) => {
    try {
      const { sub_category, category } = req.body;
      const subCategories = await subCategoriesServices.createSubCategories(
        sub_category,
        true,
        category
      );
      res.status(200).json(subCategories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateSubCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { sub_category, category, active } = req.body;
      const subCategories = await subCategoriesServices.updateSubCategory(
        sub_category,
        active,
        category,
        id
      );
      res.status(200).json(subCategories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteSubCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const subCategories = await subCategoriesServices.deleteSubCategory(id);
      res.status(200).json(subCategories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllSubCategories: async (req, res) => {
    try {
      const subCategories = await subCategoriesServices.getAllSubCategories();
      res.status(200).json(subCategories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = { subCategoriesController };
