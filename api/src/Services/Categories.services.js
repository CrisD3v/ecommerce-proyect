const { Categories } = require("../App/Db");

const categoriesServices = {
    createCategories: async (category, active) => {
        const category = await Categories.create({ category, active });

        return "Se creo la categoria correctamente."
    },

    updateCategory: async (category, active, id) => {
        const category = await Categories.update({ category, active }, { where: { id } });
        if(active == false) {
            return "Se inhabilito la categoria correctamente."
        }
        return "Se actualizo la categoria correctamente."
    },

    deleteCategory: async (id) => {
        const category = await Categories.destroy({ where: { id } });
        return "Se elimino la categoria correctamente."
    },

    getCategory: async () => {
        const categories = await Categories.findAll();
        return categories;
    }
}

module.exports = {categoriesServices};