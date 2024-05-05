const { Orders, Users } = require("../App/Db");

const ordersServices = {
  createOrder: async (idUser, data, state) => {
    const dataUser = await Users.findOne({ where: { id: idUser } });
    const order = await Orders.create({ UserId: idUser, data, state });
    await dataUser.addOrder(order);

    return "Orden creada correctamente.";
  },

  getOrder: async () => {
    const order = await Orders.findAll();
    return order;
  },

  finalizeOrder: async (idUser) => {
    const order = await Orders.update(
      { state: false },
      { where: { UserId: idUser } }
    );

  
    return "Orden finalizada";
  },

  cancelOrder: async (idUser) => {
    await Orders.destroy({ where: { UserId: idUser } });

    return "Orden cancelada.";
  },
};

module.exports = {
  ordersServices,
};
