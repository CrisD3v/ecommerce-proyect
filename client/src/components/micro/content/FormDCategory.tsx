import React, { useEffect, useState } from "react";
import TiendaModal from "../modal/TiendaModal";
import { useGetCategoryQuery } from "@/redux/services/ecommerceApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setOpenModal } from "@/redux/features/modalSlice";
import MyAccordion from "../accordion/Accordion";

interface props {
  data: any;
  isLoading: any;
}

const FormDCategory: React.FC<props> = ({data, isLoading}) => {
  const [typeModal, setTypeModal] = useState("");

  const modalIsOpen = useAppSelector((state) => state.openModal.openModal);
  const dispatch = useAppDispatch();
  const openModalCreate = (typeModal: any) => {
    dispatch(setOpenModal());
    setTypeModal(typeModal);
  };
  return (
    <div className="container mx-auto">
      <div className="w-[70rem] ">
        <h2 className="text-2xl text-center ml-10 xl:-ml-96 font-semibold mb-4">
          ADMINISTRAR CATEGORIAS
        </h2>
        {/* Aquí va el formulario para subir, editar y eliminar categorías */}
        <div className="w-full">
          <div className="w-full flex justify-center gap-10 ml-5 xl:-ml-48">
            <button
              onClick={() => openModalCreate("CATEGORIA")}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-400 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-200"
            >
              CREAR CATEGORÍA
            </button>
            <button
              onClick={() => openModalCreate("SUBCATEGORIA")}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-400 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-200"
            >
              CREAR SUBCATEGORÍA
            </button>
          </div>
        </div>
      </div>

      <div className="w-[90rem] xl:w-[60rem] flex flex-wrap flex-col h-[48rem] xl:h-[40rem] mt-9 overflow-y-auto transition-all ease-in-out duration-300">
        <MyAccordion data={data} loading={isLoading} />
      </div>

      {modalIsOpen ? (
        <TiendaModal onClose={() => openModalCreate("")} type={typeModal} />
      ) : (
        ""
      )}
    </div>
  );
};

export default FormDCategory;
