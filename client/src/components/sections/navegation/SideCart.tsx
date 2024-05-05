import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  useGetProductsQuery,
  useGetStoreQuery,
  useCreateOrderMutation,
  useCleanCartMutation,
} from "@/redux/services/ecommerceApi";
import CardProductCart from "@/components/micro/cards/cardProductCart";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";
import { setOpenModal } from "@/redux/features/modalSlice";
import { setOpenMenuCart } from "@/redux/features/isClickedSideCart";

interface Props {
  onClose: () => void;
}

function SideCart({ onClose }: Props) {
  const cookies = new Cookies();
  const token = cookies.get("token_user");
  const user_id = token ? jwtDecode(token)?.id : null;
  const productArrState = useAppSelector((state) => state.setProduct.ids); // Obtener el array del estado
  const dispatch = useAppDispatch();
  const {
    data: productArrBD,
    isLoading: isLoading2,
    isError: isError2,
  } = useGetStoreQuery(); // Obtener el array del estado en BD
  const { data: dataProduct, isLoading, isError } = useGetProductsQuery();
  const [createOrderPOST, { isLoading: isLoadingC, isError: isErrrorC }] =
    useCreateOrderMutation();
  const [cleanCart, { isLoading: isLoadingD, isError: isErrrorD }] =
    useCleanCartMutation();
  let productArr = productArrState;

  // Objeto para almacenar los productos con sus cantidades
  const productsWithQuantity: { [key: number]: number } = {};
  // Array para mantener el orden de los IDs
  const orderedIds: number[] = [];

  // Contar las cantidades de cada producto en productArr y mantener el orden
  productArr.forEach((productId) => {
    if (!productsWithQuantity[productId]) {
      orderedIds.push(productId);
    }
    productsWithQuantity[productId] =
      (productsWithQuantity[productId] || 0) + 1;
  });

  // Calcular el total del carrito
  const total = orderedIds.reduce((acc, productId) => {
    const product = dataProduct.find((product) => product.id === productId);
    const quantity = productsWithQuantity[productId];
    return acc + (product?.price || 0) * quantity;
  }, 0);

  // Formatear el total como pesos colombianos
  const formattedTotal = total.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
  });

  const createOrder = () => {
    if (orderedIds.length <= 0) return
      if (!token) {
        dispatch(setOpenMenuCart());
        dispatch(setOpenModal());
      } else {
        const jsonProducts = JSON.stringify(productArr);

        try {
          cleanCart({ idUser: user_id });
        } catch (error) {
          console.error("Error al crear la orden:", error);
        }

        try {
          createOrderPOST({
            idUser: user_id,
            order: [jsonProducts],
          });
        } catch (error) {
          console.error("Error al crear la orden:", error);
        }

        const messageHeader = `*ORDEN DE COMPRA POR EL USUARIO: ${user_id}*\n*Precio Total: ${formattedTotal}*\n\n`;
        const messageBody = orderedIds
          .map((productId) => {
            const productSend = dataProduct.find(
              (product) => product.id === productId
            );
            const formattedPrice = new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
            }).format(productSend.price);
            const quantitySend = productsWithQuantity[productId];

            return `${productSend.name} - _*precio: ${formattedPrice}*_ - _*código de producto: ${productSend.code}*_ - _*cantidad: ${quantitySend}*_`;
          })
          .join("\n");

        const phoneNumber = 3053577990;
        const message = `${messageHeader}${messageBody}`;

        const formattedMessage = encodeURIComponent(message);
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${formattedMessage}`;

        window.open(whatsappLink, "_blank");
        window.location.reload();
      }
  };

  return (
    <div className="fixed top-0 right-0 h-full w-96 bg-slate-50 border-l z-50">
      <div className="p-4">
        <div className="">
          <button
            className="absolute top-0 left-0 m-4 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            <div className="h-6 w-6 fill-current">
              <XMarkIcon className="text-sky-400 hover:text-cyan-400" />
            </div>
          </button>
          <h2 className="text-xl font-semibold mb-4 text-center text-sky-400">
            CARRITO DE COMPRAS
          </h2>
        </div>
        <div className="flex items-center justify-center overflow-y-auto h-[53rem] flex-wrap gap-5">
          {orderedIds.map((productId, i) => {
            const product = dataProduct.find(
              (product) => product.id === productId
            );
            const quantity = productsWithQuantity[productId];
            return (
              <CardProductCart
                id={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                cantidad={quantity}
                key={i}
              />
            );
          })}
        </div>
        <div className="flex flex-col justify-center items-center mt-3">
          <span className="font-semibold mb-1">Total: {formattedTotal}</span>
          <button
            onClick={createOrder}
            className="border-2 border-sky-400 rounded p-2 text-cyan-400 hover:bg-sky-500 hover:text-white transition-all ease-in-out duration-300"
          >
            CREAR ORDEN DE COMPRA
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideCart;
