const { Products } = require("../App/Db");

const productServices = {
  createProducts: async (
    name,
    description,
    price,
    stock,
    image,
    type,
    code,
    active
  ) => {
    const products = await Products.create({
      name,
      description,
      price,
      stock,
      image,
      type,
      code,
      active
    });

    return "El producto se ha añadido con exito.";
  },

  updateProducts: async (
    name,
    description,
    price,
    stock,
    image,
    type,
    code,
    id
  ) => {
    const productsEdit = await Products.update(
      {
        name,
        description,
        price,
        stock,
        image,
        type,
        code,
      },
      {
        where: { id: id },
      }
    );
    return "Los datos del producto han sido actualizados.";
  },

  deleteProducts: async (id, active) => {
    const productsDelete = await Products.update(
      {
        active: active,
      },
      {
        where: { id: id },
      }
    );

    if (active !== true)
      return "El estado del producto ha sido cambiado a 'inactivo'";
    else return "El estado del producto ha sido cambiado a 'activo'";
  },

  getProducts: async () => {
    const products = await Products.findAll();

    return products;
  },

  findProducts: async (code, name) => {
    if (code != "") {
      const product = await Products.findAll({
        where: { code: code },
      });

      return product;
    }

    if (name != "") {
      const product = await Products.findAll({
        where: { name: name },
      });

      return product;
    }
  },
};

module.exports = {
  productServices
};
