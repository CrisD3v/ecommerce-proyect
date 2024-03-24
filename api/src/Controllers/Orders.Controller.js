const { ordersServices } = require("../Services/Orders.services");

const ordersController = {
  createOrder: async (req, res) => {
    try {
      const { idUser } = req.params;
      const order = await ordersServices.createOrder(idUser, true);

      res.status(200).json({ msg: order });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await ordersServices.getOrder(id);
      res.status(200).json({ msg: order });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  finalizeOrder: async (req, res) => {
    try {
      const { idUser } = req.params;
      const order = await ordersServices.finalizeOrder(idUser);

      res.status(200).json({ msg: order });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = {
    ordersController
}