const { Orders, Users } = require("../App/Db");

const ordersServices = {
  createOrder: async (idUser, state) => {
    const dataUser = await Users.findOne({ where: { idUser } });
    const order = await Orders.create({ dataUser, state });
    Users.addOrder(order);

    return "Orden creada correctamente.";
  },

  getOrder: async (id) => {
    const order = await Orders.findOne({ were: { id }, include: [Users] });
    if (order) return order;
    else return "No hay ordenes almacenadas";
  },

  finalizeOrder: async (idUser) => {
    const user = await Users.findOne({
      where: { idUser },
      include: [Orders],
    });

    if (user) {
      const order = user.Orders;

      if (order) {
        order
          .update({ state: false })
          .then((updatedOrder) => {
            return "Estado de la orden actualizado:", updatedOrder;
          })
          .catch((err) => {
            return "Error al actualizar el estado de la orden:", err;
          });
      } else {
        console.log("El usuario no tiene una orden asociada.");
      }
    }

    return "Usuario no existente.";
  },
};

module.exports = {
  ordersServices,
};
