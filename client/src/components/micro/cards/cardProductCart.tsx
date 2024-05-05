/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setProductArr,
  removeProductId,
  removeProductCantId,
} from "@/redux/features/productCartSlice";
import {
  useGetStoreQuery,
  useStoreProductsMutation,
  useUpdateStoreProductsMutation,
} from "@/redux/services/ecommerceApi";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";
import { data } from "autoprefixer";

interface Props {
  image: string;
  name: string;
  price: string;
  cantidad: string;
  id: number;
}

interface JwtPayload {
  id: string; // Ensure the 'id' type is correct as per your usage
}

interface Store {
  UserId: string;
  id: string;
}

function CardProductCart({ image, name, price, id, cantidad }: Props) {
  const URL_BASE = process.env.URL_BASE;
  const dispatch = useAppDispatch();
  const cookies = new Cookies();
  const token = cookies.get("token_user");
  const user_id = token ? (jwtDecode(token) as JwtPayload).id ?? null : null;

  const {
    data: productArrBD = [] as Store[],
    isLoading: isLoading2,
    isError: isError2,
  } = useGetStoreQuery(); // Obtener el array del estado en BD
  const [storeProduct, { isLoading, isError }] = useStoreProductsMutation();
  const [updateStoreProduct, { isLoading: loading, isError: err }] =
    useUpdateStoreProductsMutation();
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

  const removeFromCart = (productId: number) => {
    dispatch(removeProductId(productId)); // Enviar el id del producto a la acción para eliminarlo del carrito
  };

  const removeCantFromCart = (productId: number) => {
    dispatch(removeProductCantId(productId)); // Enviar el id del producto a la acción para eliminarlo del carrito
    if (token) {
      let productsUpdate: number[] = productArr.map(Number); //productArr.slice(); // Hacer una copia del array productArr
      const indexToRemove = productsUpdate.indexOf(productId); // Encontrar el índice del id a eliminar
      if (indexToRemove !== -1) {
        productsUpdate.splice(indexToRemove, 1); // Eliminar el id del array
      }

      const varPost = { products: productsUpdate, identity: true };

      // Verificar si productArrBD está definido y no está vacío
      if (productArrBD && productArrBD.length > 0) {
        // Verificar si hay algún producto del usuario en productArrBD
        const userProduct = (productArrBD as Store[]).find(
          (products) => products.UserId === user_id
        );

        if (userProduct) {
          try {
            // Realiza la llamada a la mutación para actualizar los productos del usuario
            updateStoreProduct({
              id: userProduct.id,
              products: varPost,
            });
          } catch (error) {
            console.error("Error al actualizar el array de productos:", error);
          }
        }
      }
    }
  };

  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(Number(price));
  return (
    <div className="w-[18rem] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 border">
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
        <p className="text-gray-700 text-base mb-2" id="price">
          {formattedPrice}
        </p>
        <p className="text-gray-700 text-base flex items-center">
          <span className="mr-2">Cantidad:</span>
          <span className="flex items-center bg-gray-200 rounded">
            <button
              className="px-3 py-1 rounded-l focus:outline-none"
              onClick={() => removeCantFromCart(id)}
            >
              -
            </button>
            <span className="px-3 py-1">{cantidad}</span>
            <button
              className="px-3 py-1 rounded-r focus:outline-none"
              onClick={() => addToCart(id)}
            >
              +
            </button>
          </span>
        </p>
      </div>
      <div className="px-6 py-4">
        <button
          onClick={() => removeFromCart(id)}
          className="select-none w-full bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-red-400 transition-all ease-in-out duration-300"
        >
          Remover producto
        </button>
      </div>
    </div>
  );
}

export default CardProductCart;
