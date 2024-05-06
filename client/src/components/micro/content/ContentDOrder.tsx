"use client";
import React, { useState } from "react";
import InputSearch from "@/components/items/inputs/InputSearch";
import {
  useGetOrderQuery,
  useGetProductsQuery,
  useCancelOrderMutation,
  useFinalizeOrderMutation,
} from "@/redux/services/ecommerceApi";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import CardProduct from "../cards/CardProduct";
import CardOrder from "../cards/CardOrder";

interface OrderResult {
  UserId: any;
  state: boolean;
  data: any;
}

interface Product {
  id: any;
  price: any;
  name: string;
  code: string;
  image: string;
}

function ContentDOrder() {
  const cookies = new Cookies();
  const token = cookies.get("token_user");
  const [productsOrder, setProductsOrder] = useState([]);
  const [ordersOrNot, setOrdersOrNot] = useState("");
  const orderQueryResult = useGetOrderQuery();
  const [iduser, setIdUser] = useState("");
  const {
    data: response = [] as OrderResult[],
    isLoading,
    isError,
  } = token ? orderQueryResult : { data: null, isLoading: null, isError: null };
  const {
    data: dataProduct = [] as Product[],
    isLoading: isLoading2,
    isError: isError2,
  } = useGetProductsQuery();

  const [cancelOrders, { isLoading: loading2, isError: err2 }] =
    useCancelOrderMutation();
  const [finalizeOrders, { isLoading: loading3, isError: err3 }] =
    useFinalizeOrderMutation();

  const handleSearchInputChange = (event: any) => {};

  const handleSearchInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const value = (event.target as HTMLInputElement).value;
      setIdUser(value);
      console.log(value);

      const productsFiltered = (response as OrderResult[])?.find(
        (el) => el.UserId === value
      );
      if (productsFiltered && productsFiltered.state === true) {
        const arrayFromValues = Object.values(productsFiltered.data);
        if (arrayFromValues.length > 0) {
          const jsonStringWithoutArray = arrayFromValues[0];
          if (typeof jsonStringWithoutArray === 'string') {
            const jsonArray = JSON.parse(jsonStringWithoutArray);
            setProductsOrder(jsonArray);
          } else {
            console.error('Expected a string for JSON parsing, received:', jsonStringWithoutArray);
          }
        }
      } else {
        setProductsOrder([]);
        setOrdersOrNot("NO HAY ORDENES DE COMPRA REGISTRADOS A ESTE USUARIO");
      }
    }
  };

  const handleSearchInputClick = (event: any) => {
    const value = (event.target as HTMLInputElement).value;
    setIdUser(value);
    console.log(value);

    const productsFiltered = (response as OrderResult[])?.find(
      (el) => el.UserId === value
    );
    if (productsFiltered && productsFiltered.state === true) {
      const arrayFromValues = Object.values(productsFiltered.data);
      if (arrayFromValues.length > 0) {
        const jsonStringWithoutArray = arrayFromValues[0];
        if (typeof jsonStringWithoutArray === "string") {
          const jsonArray = JSON.parse(jsonStringWithoutArray);
          setProductsOrder(jsonArray);
        } else {
          console.error(
            "Expected a string for JSON parsing, received:",
            jsonStringWithoutArray
          );
        }
      }
    } else {
      setProductsOrder([]);
      setOrdersOrNot("NO HAY ORDENES DE COMPRA REGISTRADOS A ESTE USUARIO");
    }
  };

  const productsWithQuantity: { [key: number]: number } = {};
  // Array para mantener el orden de los IDs
  const orderedIds: number[] = [];

  // Contar las cantidades de cada producto en productArr y mantener el orden
  productsOrder.forEach((productId) => {
    if (!productsWithQuantity[productId]) {
      orderedIds.push(productId);
    }
    productsWithQuantity[productId] =
      (productsWithQuantity[productId] || 0) + 1;
  });

  // Calcular el total del carrito
  const total = orderedIds.reduce((acc, productId) => {
    const product = (dataProduct as Product[]).find((product) => product.id === productId);
    const quantity = productsWithQuantity[productId];
    return acc + (product?.price || 0) * quantity;
  }, 0);

  // Formatear el total como pesos colombianos
  const formattedTotal = total.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
  });

  const cancelOrder = (idUser: any): void => {
    if (token) {
      try {
        // Realiza la llamada a la mutación para actualizar los productos del usuario
        cancelOrders({ idUser: idUser });
        window.location.reload();
      } catch (error) {
        console.error("Error al actualizar el array de productos:", error);
      }
    }
    return;
  };

  const finalizeOrder = (idUser: any): void => {
    if (token) {
      try {
        // Realiza la llamada a la mutación para actualizar los productos del usuario
        finalizeOrders({ idUser: idUser });
        window.location.reload();
      } catch (error) {
        console.error("Error al actualizar el array de productos:", error);
      }
    }
    return;
  };

  return (
    <div className="container mx-auto select-none">
      <div className="w-[70rem] ">
        <h2 className="text-2xl text-center ml-96 xl:-ml-20 font-semibold mb-4">
          BUSCAR ORDENES DE COMPRA
        </h2>
        {/* Aquí va el formulario para subir, editar y eliminar categorías */}
        <div className="w-full">
          <div className="w-full flex justify-center gap-10 ml-[12.1rem] xl:-ml-11">
            <div className="w-max">
              <InputSearch
                placeHolder="INGRESA EL CODIGO DE USUARIO"
                radius="rounded"
                colorIcon="red-900"
                colorBorder="red-900"
                onChange={handleSearchInputChange} // Manejador de cambio
                onKeyPressFunct={handleSearchInputKeyPress}
              />
            </div>
          </div>
        </div>

        {productsOrder.length > 0 && orderedIds.length > 0 ? (
          <div>
            <div className="flex flex-row gap-20 justify-center ml-[24rem] xl:-ml-[6.5rem]  mt-12 mb-12">
              <div className="">
                <button
                  className="p-4 w-36 border  rounded-md text-white font-bold bg-green-400"
                  onClick={() => finalizeOrder(iduser)}
                >
                  Enviado
                </button>
              </div>
              <div className="">
                <button
                  className="p-4 w-36 border  bg-red-400 rounded-md text-white font-bold"
                  onClick={() => cancelOrder(iduser)}
                >
                  Cancelado
                </button>
              </div>
            </div>
            <div className="w-max-[95rem] xl:w-[60rem] xl:ml-20 xl:h-[34.7rem] flex flex-wrap flex-row h-[37rem] gap-10 mt-9 overflow-y-auto transition-all ease-in-out duration-300">
              {/* Aquí va el contenido si productsOrder tiene elementos */}
              {orderedIds.map((productId, i) => {
                const product = (dataProduct as Product[]).find(
                  (product) => product.id === productId
                );
                if (!product) return null;
                const quantity = productsWithQuantity[productId];
                return (
                  <div className="" key={i}>
                    <CardOrder
                      id={product.id}
                      image={product.image}
                      name={product.name}
                      quantity={quantity}
                      code={product.code}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end items-end w-[95rem] border-t">
              <div className="text-2xl mt-4">
                <p className="text-gray-800 font-bold text-center">Total</p>
                <p className="text-gray-700 font-semibold">{formattedTotal}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-max-[95rem] xl:w-[60rem] xl:ml-14 h-[37rem] ml-[24rem] flex justify-center items-center">
            <p className="text-2xl font-bold text-center">{ordersOrNot}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContentDOrder;
