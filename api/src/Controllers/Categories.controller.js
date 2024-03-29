const {categoriesServices} = require('../Services/Categories.services')

const categoriesController = {
    createCategory: async (req,res) => {
        try {
            const {category} = req.body;
            const categories = await categoriesServices.createCategories(category,true);
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateCategory: async (req,res) => {
        try {
            const {id} = req.params;
            const {category,active} = req.body;
            const categories = await categoriesServices.updateCategory(category,active,id);
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteCategory: async (req,res) => {
        try {
            const {id} = req.params;
            const categories = await categoriesServices.deleteCategory(id);
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAllCategories: async (req,res) => {
        try {
            const categories = await categoriesServices.getAllCategories();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
}

module.exports = {categoriesController};