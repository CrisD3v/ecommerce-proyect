const { usersServices } = require("../Services/Users.services");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Users } = require("../App/Db");

const usersController = {
  // REGISTRAR  USUARIOS
  registerUser: async (req, res) => {
    try {
      const {
        name,
        lastName,
        phone,
        user,
        email,
        password,
        active,
        image,
        isAdmin,
        rolId
      } = req.body;

      const newUser = await usersServices.register(
        name,
        lastName,
        phone,
        user,
        email,
        password,
        active,
        image,
        isAdmin,
        rolId
      );

      res.status(200).json(newUser);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error registering user", error: error.message });
    }
  },

  // ACTUALIZAR PERFIL DE USUARIO
  updateUser: async (req, res) => {
    try {
      const { name, lastName, phone, user, email, password, active, image } =
        req.body;

      const { id } = req.params;

      const updateUser = await usersServices.updateUserProfile(
        name,
        lastName,
        phone,
        user,
        email,
        password,
        active,
        image,
        id
      );

      if (updateUser === "Usuario no encontrado.")
        res.status(400).json(updateUser);
      else res.status(200).json(updateUser);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating user profile", error: error.message });
    }
  },

  // ELIMINAR USUARIOS
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await usersServices.deleteUser(id);
      if (deletedUser === "Usuario no encontrado.")
        res.status(400).json(deletedUser);
      else res.status(200).json(deletedUser);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting user", error: error.message });
    }
  },

  // OBTENER USUARIO
  getUsers: async (req, res) => {
    console.log('funcion')
    try {
      const { id } = req.params;
      const user = await usersServices.getUsers(id);

      if (user === "Usuario no encontrado.") res.status(400).json(user);
      else res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        message: "Error busqueda user profile",
        error: error.message,
      });
    }
  },

  // INICIO DE SESION
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await usersServices.login(email, password);
      const userId = await Users.findOne({ where: { email: email } });
      const token = jwt.sign({ id: userId.id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      if (
        user === "Usuario no encontrado." ||
        user === "Credenciales invalidas."
      )
        res.status(400).json(user);
      else res.status(200).json({ user, token });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error logging in user", error: error.message });
    }
  },
};

module.exports = usersController;
