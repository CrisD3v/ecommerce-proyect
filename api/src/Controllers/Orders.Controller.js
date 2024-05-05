const { ordersServices } = require("../Services/Orders.services");

const ordersController = {
  createOrder: async (req, res) => {
    try {
      const { idUser } = req.params;
      const orderData = req.body;
      console.log(orderData);
      const order = await ordersServices.createOrder(idUser, orderData, true);

      res.status(200).json({ msg: order });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getOrder: async (req, res) => {
    try {
      const order = await ordersServices.getOrder();
      res.status(200).json(order);
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

  cancelOrder: async (req, res) => {
    try {
      const { idUser } = req.params;
      const order = await ordersServices.cancelOrder(idUser);

      res.status(200).json({ msg: order });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = {
  ordersController,
};
