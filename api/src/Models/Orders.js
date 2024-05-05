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
      data: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      UserId: {
        type: DataTypes.UUID,
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
