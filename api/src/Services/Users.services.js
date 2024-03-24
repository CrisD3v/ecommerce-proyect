const { Users, Rol } = require("../App/Db");
const bcrypt = require("bcrypt");

const usersServices = {
  // Registrar un nuevo usuario
  register: async (
    name,
    lastName,
    phone,
    user,
    email,
    password,
    active,
    image,
    isAdmin
  ) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      name,
      lastName,
      phone,
      user,
      email,
      password: hashedPassword,
      active,
      image,
      isAdmin,
    });

    Rol.addRol(newUser);

    return "Se ha registrado un usuario correctamente.";
  },

  // Actualizar el perfil de un usuario
  updateUserProfile: async (
    name,
    lastName,
    phone,
    user,
    email,
    password,
    active,
    image,
    id
  ) => {
    const updateUser = await Users.update(
      { name, lastName, phone, email, password, active, image },
      { where: { id: id } }
    );

    if (updateUser[0] == 0) {
      return "Usuario no encontrado.";
    }

    return "Perfil de usuario actualizado correctamente.";
  },

  // Eliminar Usuarios
  deleteUser: async (id) => {
    const deletedUser = await Users.destroy({ where: { id: id } });
    if (deletedUser === 0) {
      return "Usuario no encontrado.";
    }

    return "Se ha eliminado el usuario correctamente.";
  },

  // Obtener usuario
  getUsers: async (id) => {
    const user = await Users.findByPk(id);
    if (!user) {
      return "Usuario no encontrado.";
    }

    return user;
  },

  // Inicio de sesion
  login: async (email, password) => {
    const user = await Users.findOne({ where: { email: email } });
    if (!user) {
      return "Usuario no encontrado.";
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return "Credenciales invalidas.";
    }

    return "El usuario ha iniciado sesion correctamente";
  },
};

module.exports = {
  usersServices,
};