const { SubCategories } = require("../App/Db");

const subCategoriesServices = {
  createSubCategories: async (sub_category, active) => {
    const subCategory = await SubCategories.create({ sub_category, active });

    return "Se creo la sub categoria correctamente.";
  },

  updateSubCategory: async (sub_category, active, id) => {
    const subCategory = await SubCategories.update(
      { sub_category, active },
      { where: { id } }
    );
    if (active == false) {
      return "Se inhabilito la sub categoria correctamente.";
    }
    return "Se actualizo la sub categoria correctamente.";
  },

  deleteSubCategory: async (id) => {
    const subCategory = await SubCategories.destroy({ where: { id } });
    return "Se elimino la sub categoria correctamente.";
  },

  getAllSubCategories: async () => {
    const subCategories = await SubCategories.findAll();
    return subCategories;
  },
};

module.exports = { subCategoriesServices };
