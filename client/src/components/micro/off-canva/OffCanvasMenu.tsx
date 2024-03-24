"use client";
import { useState } from "react";

function OffCanvasMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Botón para abrir el menú */}
      <button
        onClick={toggleMenu}
        className="fixed right-4 top-4 z-50 bg-gray-800 text-white p-2 rounded-full"
      >
        ☰
      </button>

      {/* Contenedor del menú */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full"
        } fixed top-0 right-0 h-full w-64 bg-white z-40 transition-transform duration-300 transform`}
      >
        {/* Contenido del menú */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Menú</h2>
          <ul>
            <li className="mb-2">
              <a href="#">Inicio</a>
            </li>
            <li className="mb-2">
              <a href="#">Acerca de</a>
            </li>
            <li className="mb-2">
              <a href="#">Servicios</a>
            </li>
            <li className="mb-2">
              <a href="#">Contacto</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Fondo oscuro */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-30"
        ></div>
      )}
    </div>
  );
}

export default OffCanvasMenu;
