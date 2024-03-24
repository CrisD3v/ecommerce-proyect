import React from "react";

interface props {
  category: string;
  image: string;
}

function CardCategory({ category, image }: props) {
  return (
    <div className="flex flex-wrap mt-5 mb-5 gap-20">
      <div className="max-w-md rounded overflow-hidden shadow-lg transition-transform transform hover:scale-105 relative">
        <img
          className="w-full h-80 object-cover object-center select-none"
          src="https://via.placeholder.com/300x200"
          alt="Producto"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black text-white text-center opacity-0 hover:opacity-75 transition-opacity duration-300">
          <span className="text-2xl uppercase">{category}</span>
        </div>
      </div>
    </div>
  );
}

export default CardCategory;
