import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UUID } from "crypto";
import Cookies from "universal-cookie";

interface User {
  id: string;
}

interface Product {
  id: string;
  products: any;
}

interface Order {
  idUser: string;
  order: any;
}

interface Cart {
  idUser: UUID;
}

export const ecommerceApi = createApi({
  reducerPath: "eccomerceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3004/",
    prepareHeaders: (headers, { getState }) => {
      // Obtener el token JWT
      const cookies = new Cookies();
      const token = cookies.get("token_user");
      if (token) {
        // Si se encuentra un token, agregarlo a las cabeceras de la solicitud
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (post) => ({
        url: "/api/users/signin",
        method: "POST",
        body: post,
      }),
    }),
    getUser: builder.query<User, { id: string }>({
      query: ({ id }) => `api/users/getUser/${id}`,
    }),
    createCategory: builder.mutation({
      query: (post) => ({
        url: "/api/categories/create",
        method: "POST",
        body: post,
      }),
    }),
    getCategory: builder.query<string[], void>({
      query: () => `/api/categories/get`,
    }),
    createSubCategory: builder.mutation({
      query: (post) => ({
        url: "/api/subCategories/create",
        method: "POST",
        body: post,
      }),
    }),
    CreateProduct: builder.mutation({
      query: (post) => ({
        url: "/api/products/upProduct",
        method: "POST",
        body: post,
      }),
    }),
    getProducts: builder.query<string[], void>({
      query: () => `/api/products/getProducts`,
    }),
    getStore: builder.query<string[], void>({
      query: () => `/api/cart/get`,
    }),
    storeProducts: builder.mutation({
      query: (post) => ({
        url: "/api/cart/create",
        method: "POST",
        body: post,
      }),
    }),
    updateStoreProducts: builder.mutation<
      Product,
      { id: string; products: any }
    >({
      query: ({ id, products }) => ({
        url: `/api/cart/update/${id}`,
        method: "PUT",
        body: products,
      }),
    }),
    CreateOrder: builder.mutation<Order, { idUser: string; order: any }>({
      query: ({ idUser, order }) => ({
        url: `/api/orders/create/${idUser}`,
        method: "POST",
        body: order,
      }),
    }),
    getOrder: builder.query<string[], void>({
      query: () => `api/orders/get`,
    }),
    cancelOrder: builder.mutation<Order, { idUser: string }>({
      query: ({ idUser }) => ({
        url: `/api/orders/cancel/${idUser}`,
        method: "DELETE",
      }),
    }),
    finalizeOrder: builder.mutation<Order, { idUser: string }>({
      query: ({ idUser }) => ({
        url: `/api/orders/finalize/${idUser}`,
        method: "PUT",
      }),
    }),
    cleanCart: builder.mutation<Cart, { idUser: UUID }>({
      query: ({ idUser }) => ({
        url: `/api/cart/delete/${idUser}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSigninMutation,
  useGetUserQuery,
  useCreateCategoryMutation,
  useCreateSubCategoryMutation,
  useGetCategoryQuery,
  useCreateProductMutation,
  useGetProductsQuery,
  useGetStoreQuery,
  useStoreProductsMutation,
  useUpdateStoreProductsMutation,
  useCreateOrderMutation,
  useGetOrderQuery,
  useFinalizeOrderMutation,
  useCancelOrderMutation,
  useCleanCartMutation
} = ecommerceApi;
