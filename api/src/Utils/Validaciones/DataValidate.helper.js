const ValidacionEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

const productValidation = {
  name: {
    regex: null,
    mensaje: "Este producto ya existe.",
  },
  description: null,
  price: null,
  stock: { regex: /^[0-9]+$/, mensaje: "Ingrese solo numero." },
  image: null,
  type: {
    regex: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,
    mensaje: "Ingrese solo texto en el tipo",
  },
  code: {
    mensaje: "El codigo ya se encuentra registrado. Ingrese uno nuevo",
  },
};

module.exports = { productValidation };
