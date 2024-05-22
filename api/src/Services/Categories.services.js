const { Categories, SubCategories } = require("../App/Db");

const categoriesServices = {
  createCategories: async (category, active, image) => {
    const categorys = await Categories.create({ category, active, image });

    return "Se creo la categoria correctamente.";
  },

  updateCategory: async (category, active, image, id) => {
    const categorys = await Categories.update(
      { category, image, active },
      { where: { id } }
    );
    if (active == false) {
      return "Se inhabilito la categoria correctamente.";
    }
    return "Se actualizo la categoria correctamente.";
  },

  deleteCategory: async (id) => {
    const category = await Categories.destroy({ where: { id } });
    return "Se elimino la categoria correctamente.";
  },

  getAllCategories: async () => {
    const categories = await Categories.findAll({
      include: [SubCategories],
    });
    return categories;
  },
};

module.exports = { categoriesServices };
