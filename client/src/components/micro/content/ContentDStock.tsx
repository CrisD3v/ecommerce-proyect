"use client";
import React, { useState } from "react";
import { setOpenModal } from "@/redux/features/modalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import StockModal from "../modal/StockModal";
import { useGetProductsQuery } from "@/redux/services/ecommerceApi";
import CardProductsAdm from "../cards/CardProductsAdm";

function ContentDStock() {
  const modalIsOpen = useAppSelector((state) => state.openModal.openModal);
   const isOpenMenu = useAppSelector((state) => state.openMenu.openMenu);
  const { data: dataProduct, isLoading, isError } = useGetProductsQuery();
  const dispatch = useAppDispatch();
  const openModalCreate = () => {
    dispatch(setOpenModal());
  };
  return (
    <div className="container mx-auto">
      <div className="w-[70rem] ">
        <h2 className="text-2xl text-center ml-96 font-semibold mb-4">
          ADMINISTRAR STOCK
        </h2>
        {/* Aquí va el formulario para subir, editar y eliminar categorías */}
        <div className="w-full">
          <div className="w-full flex justify-center gap-10 ml-48">
            <button
              onClick={() => openModalCreate()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-400 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-200"
            >
              AÑADIR PRODUCTO
            </button>
          </div>
          <div
            className={`${
              isOpenMenu ? "w-[98.5rem]" : "w-[105rem]"
            } flex flex-wrap h-[47rem] mt-20 gap-20 overflow-y-auto transition-all ease-in-out duration-500`}
          >
            {dataProduct
              ?.slice()
              .reverse()
              .map((el, i) => (
                <CardProductsAdm
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  code={el.code}
                  description={el.description}
                  stock={el.stock}
                  key={i}
                />
              ))}
          </div>
        </div>
      </div>

      {modalIsOpen ? <StockModal onClose={() => openModalCreate()} /> : ""}
    </div>
  );
}

export default ContentDStock;
