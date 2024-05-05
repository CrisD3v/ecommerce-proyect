const { SubCategories, Categories } = require("../App/Db");

const subCategoriesServices = {
  createSubCategories: async (sub_category, active, category_id) => {
    const subCategory = await SubCategories.create({ sub_category, active });

    // Buscar la categoría por su ID
    const category = await Categories.findByPk(category_id);
    if (!category) {
      console.log(category_id);
      throw new Error("Categoría no encontrada");
    }

    // Asignar la subcategoría a la categoría
    await category.addSubCategory(subCategory);

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
