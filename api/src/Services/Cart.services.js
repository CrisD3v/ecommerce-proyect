const { Cart, Users } = require("../App/Db");

const cartServices = {
  storeProducts: async (products, user_id) => {
    const productsCart = await Cart.create({products});

    const user = await Users.findByPk(user_id); // Obtener el usuario de la base de datos

    if (user) {
      await productsCart.setUser(user_id); // Asignar el usuaro al almacen
    } else {
      // Manejar el caso donde no se encuentra el usuario
      console.error("El usuario no se encontró.");
    }

    return "Productos almacenados correctamente";
  },

  updateStoreProducts: async (products, id, identity) => {
    const productsInCart = await Cart.findOne({ where: { id } });

    let updatedProducts = [];
    if (identity) {
      updatedProducts.push(...products);
    } else {
      if (productsInCart) {
        updatedProducts = [...productsInCart.products]; // Copia los productos actuales del carrito
      }

      // Fusiona los nuevos productos con los existentes
      updatedProducts.push(...products);
    }

    // Realiza la actualización en la base de datos
    const productsCart = await Cart.update(
      { products: updatedProducts },
      { where: { id } }
    );

    return "Se actualizo el almacen correctamente.";
  },

  deleteStore: async (id) => {
    await Cart.destroy({ where: { UserId:id } });
    return "Se elimino el almacen correctamente.";
  },

  getStore: async () => {
    const store = await Cart.findAll({
      include: [Users],
    });
    return store;
  },
};

module.exports = { cartServices };
