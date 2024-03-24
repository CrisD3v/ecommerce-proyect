import React from "react";
import Image from "next/image";

function CardProduct() {
  return (
    <div className="max-w-md bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
      {/* <Image
        className="w-full h-48 object-cover object-center select-none"
        src="https://via.placeholder.com/300x200"
        alt="Producto"
        width={300}
        height={200}
      /> */}
      <img
        className="w-full h-48 object-cover object-center select-none"
        src="https://via.placeholder.com/300x200"
        alt="Producto"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Producto Ejemplo</div>
        <p className="text-gray-700 text-base">$99.99</p>
      </div>
      <div className="px-6 py-4">
        <button className="select-none bg-sky-400 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-sky-400">
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default CardProduct;
