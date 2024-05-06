/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setProductArr } from "@/redux/features/productCartSlice";
import {
  useGetStoreQuery,
  useStoreProductsMutation,
  useUpdateStoreProductsMutation,
} from "@/redux/services/ecommerceApi";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

interface Props {
  image: string;
  name: string;
  price: string;
  id: number;
}

interface JwtPayload {
  id: string; // Ensure the 'id' type is correct as per your usage
}

interface Store {
  UserId : string;
  id: string;
}


function CardProduct({ image, name, price, id }: Props) {
  const cookies = new Cookies();
  const URL_BASE = process.env.URL_BASE;
  const dispatch = useAppDispatch();
  const [storeProduct, { isLoading, isError }] = useStoreProductsMutation();
  const [updateStoreProduct, { isLoading: loading, isError: err }] =
    useUpdateStoreProductsMutation();
  const {
    data: productArrBD = [] as Store[],
    isLoading: isLoading2,
    isError: isError2,
  } = useGetStoreQuery(); // Obtener el array del estado en BD
  const token = cookies.get("token_user");
  const user_id = token ? (jwtDecode(token) as JwtPayload).id ?? null : null;
  const productArr = useAppSelector((state) => state.setProduct.ids); // Obtener el array del estado
  let dataToSend = {
    id: user_id,
    products: [id],
  };

  const addToCart = async (product_id: number) => {
    dispatch(setProductArr(product_id));
    try {
      if (!token) return;

      const userProduct = (productArrBD as Store[]).find(
        (product) => product.UserId === user_id
      );
      const isUserProductExist = !!userProduct;

      if (isUserProductExist) {
        await updateStoreProduct({
          id: userProduct.id,
          products: [product_id],
        });
      } else {
        await storeProduct(dataToSend);
      }
    } catch (error) {
      console.error("Error al procesar el carrito de compras:", error);
    }
  };

  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(Number(price));

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
        className="w-full h-48 object-cover object-center select-none"
        src={`${URL_BASE}uploads/${image}`}
        alt="Producto"
      />
      <div className="px-6 py-4 border-t">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{formattedPrice}</p>
      </div>
      <div className="px-6 py-4">
        <button
          onClick={() => addToCart(id)}
          className="select-none bg-sky-400 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-sky-400"
        >
          {isLoading ? "Agregando..." : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}

export default CardProduct;
