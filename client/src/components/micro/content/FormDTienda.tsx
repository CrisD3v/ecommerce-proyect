import React, { useState } from "react";

const FormDTienda: React.FC = () => {
  const [inputs, setInputs] = useState<{ [key: string]: string  }>({
    nameShop: "",
    logoTipo: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para manejar el envío del formulario
    console.log("Formulario enviado:", inputs);
  };

 

  return (
    <div className="container mx-auto flex justify-center flex-col h-96 mt-44">
      <h2 className="text-2xl text-center mr-52 font-semibold mb-4">
        EDITAR DATOS DE LA TIENDA
      </h2>
      <div className="w-full flex justify-center items-center -ml-28">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nameShop"
              className="block text-lg font-medium text-gray-700"
            >
              Nombre de Tienda
            </label>
            <input
              name="nameShop"
              type="text"
              id="nameShop"
              value={inputs["nameShop"]}
              className="mt-2 block w-full border-2 outline-none border-gray-300 p-2 rounded-md shadow-sm hover:border-cyan-300 focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm transition-all ease-in-out duration-300"
              placeholder="Nombre de Tienda"
            />
          </div>
          <div>
            <label
              htmlFor="logoTipo"
              className="block text-lg font-medium text-gray-700"
            >
              Logo Tipo
            </label>
            <input
              name="logoTipo"
              type="file"
              id="logoTipo"
              className="mt-2 block w-full border-2 outline-none p-2 border-gray-300 rounded-md shadow-sm hover:border-cyan-300 focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm"
            />
          </div>
          <div className="flex justify-center mr-4">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-400 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-200"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormDTienda;
