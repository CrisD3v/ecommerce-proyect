const { Products, Orders, Users } = require("../../App/Db");
async function validate(input, model, validations) {
  const errors = [];

  async function repetition(dato, key) {
    const existingDato = await model.findOne({
      where: {
        [key]: dato,
      },
    });

    return existingDato !== null; // Devolver true si existe, false si no
  }

  const validateField = async (key, value, regex, mensaje) => {
    if (errors.length <= 0) {
      if (value === "") {
        errors.push(`${key} es requerido.`);
      } else if (regex && !regex.test(value)) {
        errors.push(mensaje);
      } else {
        if (key === "name" || key === "code") {
          const isRepeated = await repetition(value, key);
          if (isRepeated) errors.push(mensaje);
        }
      }
    }
  };

  for (const key in input) {
    if (input.hasOwnProperty(key)) {
      const value = input[key];
      const validation = validations[key];

      if (validation) {
        await validateField(key, value, validation.regex, validation.mensaje);
      }
    }
  }

  return errors;
}

// Funciónes para eliminar datos inactivos

const deleteInactiveData = {
  deleteInactiveProducts: async () => {
    try {
      // Encuentra y elimina los productos inactivos
      const deletedRows = await Products.destroy({
        where: {
          active: false,
        },
      });

      console.log(`Se eliminaron ${deletedRows} productos inactivos.`);
    } catch (error) {
      console.error("Error al eliminar productos inactivos:", error);
    }
  },
  deleteInactiveOrders: async () => {
    try {
      // Encuentra todas las órdenes inactivas
      const inactiveOrders = await Orders.findAll({
        where: {
          state: false, // Suponiendo que "state" es el campo que indica si una orden está activa o no
        },
      });

      // Recorre todas las órdenes inactivas
      for (const order of inactiveOrders) {
        // Busca el usuario asociado a la orden
        const user = await order.getUser();
        if (user) {
          // Elimina la relación entre el usuario y la orden
          await user.removeOrder(order);
          // Elimina la orden
          await order.destroy();
          return "Orden inactiva eliminada y relación con el usuario también.";
        }
      }
    } catch (error) {
      console.error("Error al eliminar las órdenes inactivas:", error);
    }
  },
};

module.exports = { validate, deleteInactiveData };
