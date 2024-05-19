"use client";
import { useEffect } from "react";
import Main from "@/components/templates/Main";
import { setProductArr } from "@/redux/features/productCartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  useGetStoreQuery,
  useStoreProductsMutation,
} from "@/redux/services/ecommerceApi";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: string; // Ensure the 'id' type is correct as per your usage
}

interface Product {
  UserId: string;
  products: any;
}

export default function Home() {
  const dispatch = useAppDispatch();
  const cookies = new Cookies();
  const token = cookies.get("token_user");
  const user_id = token ? (jwtDecode(token) as JwtPayload).id ?? null : null;
  const {
    data: productArrBD = [] as Product[],
    isLoading: isLoading2,
    isError: isError2,
  } = useGetStoreQuery(); // Obtener el array del estado en BD
  const dataLoaded = useAppSelector((state) => state.setProduct.ids); // Obtener el array del estado

  useEffect(() => {
    if (
      token &&
      productArrBD &&
      productArrBD.length > 0 &&
      dataLoaded.length <= 0
    ) {
      // Verificar si hay algún producto del usuario en productArrBD
      const userProduct = (productArrBD as Product[]).find(
        (product) => product.UserId === user_id
      );

      if (userProduct) {
        const data = userProduct.products;
        data.forEach((e: any, i: number) => {
          dispatch(setProductArr(e));
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, productArrBD, token, user_id]);
  return (
    <main className="min-h-screen bg-rose-50">
      <div className="">
        <Main />
      </div>
    </main>
  );
}
