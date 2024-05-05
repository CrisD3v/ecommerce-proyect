"use client"
import { useEffect } from "react";
import Main from "@/components/templates/Main";
import { setProductArr } from "@/redux/features/productCartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useGetStoreQuery } from "@/redux/services/ecommerceApi";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const dispatch = useAppDispatch();
  const cookies = new Cookies();
  const token = cookies.get("token_user");
  const user_id = token ? jwtDecode(token)?.id ?? null : null;
  const {
    data: productArrBD,
    isLoading: isLoading2,
    isError: isError2,
  } = useGetStoreQuery(); // Obtener el array del estado en BD

  useEffect(() => {
    if (token && productArrBD && productArrBD.length > 0) {
      // Verificar si hay algún producto del usuario en productArrBD
      const userProduct = productArrBD.find(
        (product) => product.UserId === user_id
      );

      if (userProduct) {
        const data = userProduct.products;
        data.forEach((e, i) => {
          dispatch(setProductArr(e));
        });
      }
    }
  }, []); // Paso un arreglo vacío para que el efecto se ejecute solo una vez

  return (
    <main className="min-h-screen">
      <div className="">
        <Main />
      </div>
    </main>
  );
}
