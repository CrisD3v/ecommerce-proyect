/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

interface Props {
  image: string;
  name: string;
  quantity: number;
  id: number;
  code: string;
}

function CardOrder({ image, name, quantity, id, code }: Props) {
  const URL_BASE = process.env.URL_BASE;

  return (
    <div className="w-[18rem] xl:w-[15rem] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 border">
      {/* <Image
        className="w-full h-48 object-cover object-center select-none"
        src="https://via.placeholder.com/300x200"
        alt="Producto"
        width={300}
        height={200}
      /> */}
      <img
        className="w-full h-52 object-cover object-center select-none"
        src={`${URL_BASE}uploads/${image}`}
        alt="Producto"
      />
      <div className="px-6 py-4 border-t">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base font-bold">Cantidad: {quantity}</p>
        <p className="text-gray-700  text-base font-bold">Codigo: {code}</p>
      </div>
      <div className="px-6 py-4"></div>
    </div>
  );
}

export default CardOrder;
