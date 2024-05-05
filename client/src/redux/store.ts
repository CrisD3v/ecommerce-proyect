import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import isClickedSlice from "./features/isClickedSlice"; // Importa el reducer raíz de tu aplicación
import openModal  from "./features/modalSlice"; // Importa el reducer raíz de tu aplicación
import openMenu  from "./features/isClickedMenuSide"; // Importa el reducer raíz de tu aplicación
import openMenuCart from "./features/isClickedSideCart"; // Importa el reducer raíz de tu aplicación
import productCart from "./features/productCartSlice"; // Importa el reducer raíz de tu aplicación
import { ecommerceApi } from "./services/ecommerceApi"; // Importa el reducer raíz de tu aplicación
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    isClicked: isClickedSlice,
    openModal: openModal,
    openMenu: openMenu,
    openMenuCart: openMenuCart,
    setProduct: productCart,
    [ecommerceApi.reducerPath]: ecommerceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([ecommerceApi.middleware]),
  // Pasamos el reducer raíz a configureStore
  // Aquí puedes configurar cualquier middleware que desees utilizar
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
