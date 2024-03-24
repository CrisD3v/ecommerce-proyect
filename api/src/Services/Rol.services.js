const { Rol } = require("../App/Db");

const rolServices = {
  createRol: async (name) => {
    await Rol.create({ name });

    return "Rol creado correctamente.";
  },
  getRol: async () => {
    const rols = ["Admin", "Client", "Dev"];

    for (let index = 0; index < rols.length; index++) {
      await Rol.findOrCreate({ where: { name: rols[index] } });
    }
   
    return await Rol.findAll();
  },

  deletRol: async (id) => {
    await Rol.destroy({ where: { id } });

    return "Rol eliminado.";
  },

  updateRol: async (name, id) => {
    await Rol.update({ name }, { where: { id } });

    return "Rol actualizado correctamente.";
  },
};

module.exports = {
  rolServices,
};
