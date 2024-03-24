const { Products } = require("../App/Db");
const { productServices } = require("../Services/Products.services");
const {
  productValidation,
} = require("../Utils/Validaciones/DataValidate.helper");
const { validate } = require("../Utils/Validaciones/Data.utils");

const productController = {
  postProduct: async (req, res) => {
    try {
      const validateData = await validate(
        req.body,
        Products,
        productValidation
      );
      if (validateData.length > 0) res.status(404).json(validateData);
      else {
        const { name, description, price, stock, image, type, code } = req.body;
        const active = true;

        const dataProduct = await productServices.createProducts(
          name,
          description,
          price,
          stock,
          image,
          type,
          code,
          active
        );

        res.status(200).json(dataProduct);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const validateData = await validate(req.body, Products);
      if (validateData.length > 0) res.status(404).json(validateData);
      else {
        const { name, description, price, stock, image, type, code } = req.body;

        const { id } = req.params;

        const dataProduct = await productServices.updateProducts(
          name,
          description,
          price,
          stock,
          image,
          type,
          code,
          id
        );

        res.status(200).json(dataProduct);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    const { state } = req.body;
    const { id } = req.params;
    try {
      const deleteProduct = await productServices.deleteProducts(id, state);
      res.status(200).json(deleteProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getDataProducts: async (req, res) => {
    try {
      const products = await getProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  findDataProducts: async (req, res) => {
    const { code, name } = req.body;
    try {
      const findProduct = await productServices.findProducts(code, name);
      res.status(200).json(findProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = productController;
