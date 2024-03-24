const { rolServices } = require("../Services/Rol.services");

const rolController = {
  createRol: async (req, res) => {
    try {
      const { name } = req.body;
      const rol = rolServices.createRol(name);
      if (rol) res.status(200).json({ msg: rol });
      else
        res
          .status(404)
          .json({ msg: "El rol ya existe, debe elegir otro nombre." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateRol: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const rol = await rolServices.updateRol(name, id);
      res.status(200).json({ msg: rol });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteRol: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRol = rolServices.deletRol(id);
      res.status(200).json({ msg: deletedRol });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getRol: async (req, res) => {
    try {
      const rol = await rolServices.getRol();
      res.status(200).json(rol);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = {
    rolController
}
