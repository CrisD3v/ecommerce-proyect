/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";

interface props {
  image: string;
  name: string;
  price: string;
  code: string;
  description: string;
  stock: string;
  openModalEdit: () => void;
}

function CardProductsAdm({
  image,
  name,
  price,
  code,
  description,
  stock,
  openModalEdit,
}: props) {
  const URL_BASE = process.env.URL_BASE;
  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(Number(price));
  return (
    <div
      className="w-72 xl:w-[15rem] h-[28rem] cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 border"
      onClick={openModalEdit}
    >
      {/* <Image
        className="w-full h-48 object-cover object-center select-none"
        src="https://via.placeholder.com/300x200"
        alt="Producto"
        width={300}
        height={200}
      /> */}
      <img
        className="w-full h-60 object-cover object-center select-none"
        src={`${URL_BASE}uploads/${image}`}
        alt="Producto"
      />
      <div className="px-6 py-4 border-t">
        <div className="font-bold text-xl mb-2">{name}</div>
        <div className="mt-1">
          <div className="flex justify-center flex-col">
            <p className="text-cyan-400 text-base font-semibold">
              <span className="font-bold text-gray-700">CODIGO:</span> {code}
            </p>
            <p className="text-gray-700 text-base">
              <span className="font-bold">PRECIO:</span> {formattedPrice}
            </p>
            <p className="text-gray-700 text-base">
              <span className="font-bold">STOCK:</span> {stock}
            </p>
            <div className="flex items-center flex-col border-t-2 mt-2">
              <p className="font-bold mt-2 text-gray-700 text-base">
                DESCRIPCION
              </p>
              <p className="overflow-hidden">
                {description.slice(0, 28)}
                {description.length > 28 ? "..." : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProductsAdm;
