import React, { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import RelacionCategoryModal from "@/components/items/modal/RelacionCategoryModal";

interface ModalProps {
  onClose: () => void;
  idProduct: any;
}

function CategoryModal({ onClose, idProduct }: ModalProps) {
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
      <div
        id="modal"
        className="bg-white w-4/12 xl:h-[45rem] p-8 rounded-2xl shadow-md overflow-hidden  xl:w-[40rem]"
      >
        {/* Contenido del modal */}
        <div className="overflow-y-auto h-[50rem] w-[37.5rem] xl:h-[40rem]">
          <div className="w-[35.5rem]">
            <RelacionCategoryModal key={1} idProduct={idProduct} />
          </div>
        </div>
        {/* Botón para cerrar el modal */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
        >
          <XMarkIcon className="text-black hover:text-white" />
        </button>
      </div>
    </div>
  );
}

export default CategoryModal;
