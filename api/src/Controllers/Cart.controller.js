const { cartServices } = require("../Services/Cart.services");

const cartController = {
  storeProducts: async (req, res) => {
    try {
      const products = req.body;

      console.log(products.products)

      const productsCart = await cartServices.storeProducts(
        products.products,
        products.id
      );
      res.status(200).json(productsCart);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },

  updateStoreProducts: async (req, res) => {
    try {
      const { id } = req.params;
      const products = req.body;
      let identity = false;
      let product = products;
      console.log(products);
      if (products && typeof products === "object" && "identity" in products) {
        identity = products.identity;
        product = products.products;
      }

      const productsCart = await cartServices.updateStoreProducts(
        product,
        id,
        identity
      );
      res.status(200).json(productsCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteStore: async (req, res) => {
    try {
      const { id } = req.params;
      const store = await cartServices.deleteStore(id);
      res.status(200).json(store);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getStore: async (req, res) => {
    try {
      const store = await cartServices.getStore();
      res.status(200).json(store);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = { cartController };
