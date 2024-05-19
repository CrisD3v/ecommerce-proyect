const { Products, Categories, SubCategories } = require("../App/Db");

const productServices = {
  createProducts: async (
    name,
    description,
    price,
    stock,
    image,
    code,
    active,
    categoryId,
    subCategoryId
  ) => {
    try {
      const product = await Products.create({
        name,
        description,
        price,
        stock,
        image,
        code,
        active,
      });

      // Asignar la categoría al producto
      await product.setCategory(categoryId);

      // Asignar la subcategoría al producto
      await product.addSubCategory(subCategoryId);

      return "El producto se ha añadido con éxito.";
    } catch (error) {
      console.error("Error al crear el producto:", error);
      throw new Error("Error al crear el producto.");
    }
  },

  updateProducts: async (
    name,
    description,
    price,
    stock,
    image,
    category,
    subCategory,
    id
  ) => {
    const productsEdit = await Products.update(
      {
        name,
        description,
        price,
        stock,
        image,
      },
      {
        where: { id: id },
      }
    );

    // Obtener el producto actualizado
    const updatedProduct = await Products.findByPk(id);

    if (!updatedProduct) {
      return "Producto no encontrado";
    }

    // Asignar la categoría al producto
    await updatedProduct.setCategory(category);

    if (subCategory.length > 2) {
      subCategory = subCategory.split(",").map(Number);
    }

    // Actualizar las subcategorías del producto
    if (subCategory && subCategory.length > 0) {
      await updatedProduct.setSubCategories(subCategory);
    }

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
    const products = await Products.findAll({
      include: [
        { model: Categories, attributes: ["id", "category"] },
        { model: SubCategories, attributes: ["id", "sub_category"] },
      ],
    });

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
  productServices,
};
