import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openMenuCart: false,
};

const menuCartSlice = createSlice({
  name: "menuCart",
  initialState,
  reducers: {
    setOpenMenuCart: (state) => {
      state.openMenuCart = !state.openMenuCart;
    },
  },
});

export const { setOpenMenuCart } = menuCartSlice.actions;

export default menuCartSlice.reducer;
