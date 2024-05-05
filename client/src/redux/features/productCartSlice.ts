import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ids: [] as string[],
};

const productCart = createSlice({
  name: "id_product",
  initialState,
  reducers: {
    setProductArr: (state, action) => {
      state.ids.push(action.payload); // Añadir el nuevo id al array de ids
    },
    removeProductId: (state, action) => {
      state.ids = state.ids.filter((id) => id !== action.payload); // Filtrar el array para eliminar el id específico
    },
    removeProductCantId: (state, action) => {
      const indexToRemove = state.ids.indexOf(action.payload); // Encontrar el índice del id a eliminar
      console.log(action.payload)
      if (indexToRemove !== -1) {
        state.ids.splice(indexToRemove, 1); // Eliminar el id del array
      }
    },
  },
});

export const { setProductArr, removeProductId, removeProductCantId } =
  productCart.actions;

export default productCart.reducer;
