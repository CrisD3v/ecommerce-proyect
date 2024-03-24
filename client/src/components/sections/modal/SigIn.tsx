import React from "react";

function SigIn() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-center">Iniciar sesión</h2>
      <form
        // onSubmit={handleSubmit}
        className="w-full flex justify-center items-center flex-col"
      >
        <div className="mb-4 w-6/12">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Usuario
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 w-6/12">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-end w-6/12 mb-10">
          <a href="#">
            <p className="text-xs text-blue-600 cursor-pointer hover:underline">
              ¿Se te olvido tu Contraseña?
            </p>
          </a>
        </div>
        <button
          type="submit"
          className="bg-sky-400 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default SigIn;
