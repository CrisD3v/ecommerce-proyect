import React, { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Category from "@/components/items/modal/Category";
import SubCategory from "@/components/items/modal/SubCategory";

interface ModalProps {
  onClose: () => void;
  type: string;
}

const TiendaModal: React.FC<ModalProps> = ({ onClose, type }) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.getElementById("modal");
      if (modal && !modal.contains(event.target as Node)) {
        onClose();
      }
    };

    // Agregar el listener de eventos al montar el componente
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el listener al desmontar el componente
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    <div className="fixed inset-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div id="modal" className="bg-white w-96 p-8 rounded-2xl shadow-md">
        {/* Contenido del modal */}
        {type == "CATEGORIA" ? <Category /> : <SubCategory />}
        {/* Botón para cerrar el modal */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
        >
          <div className="h-6 w-6 fill-current">
            <XMarkIcon className="text-black hover:text-white" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default TiendaModal;
