const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Products",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stock: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      categoryId: {
        type: DataTypes.INTEGER, // Suponiendo que el ID de la categoría es de tipo INTEGER
        allowNull: true,
        references: {
          model: "Categories", // Nombre de la tabla de Categorías en tu base de datos
          key: "id", // Campo de clave primaria en la tabla de Categorías
        },
      },
      subCategoryId: {
        type: DataTypes.INTEGER, // Suponiendo que el ID de la categoría es de tipo INTEGER
        allowNull: true,
        references: {
          model: "SubCategories", // Nombre de la tabla de sub Categorías en tu base de datos
          key: "id", // Campo de clave primaria en la tabla de  sub Categorías
        },
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );
};
