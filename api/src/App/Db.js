const { Sequelize } = require("sequelize");
const path = require("path");
const fs = require("fs");

const { DB_USER, DB_PASSWORD, DB_HOST, DB } = process.env;

// Crear la instancia de Sequelize
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB}`,
  { logging: false }
);

// Obtener el nombre del archivo actual
const basename = path.basename(__filename);

// Array para almacenar los modelos definidos
const modelDefiners = [];

// Leer los archivos de modelos en la carpeta Models y cargarlos
fs.readdirSync(path.join(__dirname, "../Models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, "../Models", file));
    modelDefiners.push(model);
  });

// Cargar los modelos en la instancia de Sequelize
modelDefiners.forEach((model) => model(sequelize));

// Capitalizar nombres de modelos
const entries = Object.entries(sequelize.models);
const capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Obtener modelos
const { Users, Products, Rol, SubCategories, Orders, Categories, Cart } =
  sequelize.models;

// Definir relaciones entre modelos
Users.belongsTo(Rol);
Users.hasMany(Orders);
Orders.belongsTo(Users);
Cart.belongsTo(Users);
Categories.belongsToMany(SubCategories, { through: "c_s" });
SubCategories.belongsToMany(Categories, { through: "c_s" });
Products.hasMany(SubCategories);
Products.belongsTo(Categories);

// Exportar modelos y la conexión
module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
