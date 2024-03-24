const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Orders",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      client: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      products: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      data: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );
};
