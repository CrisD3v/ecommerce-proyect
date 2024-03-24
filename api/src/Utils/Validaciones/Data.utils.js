const { Products } = require("../../App/Db");
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

// Función para eliminar productos inactivos
const deleteInactiveProducts = async () => {
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
};

module.exports = { validate, deleteInactiveProducts };
