import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModal: false,
};

const modalCategorySlice = createSlice({
  name: "modalCategory",
  initialState,
  reducers: {
    setOpenModalCategory: (state) => {
      state.openModal = !state.openModal;
    },
  },
});

export const { setOpenModalCategory } = modalCategorySlice.actions;

export default modalCategorySlice.reducer;
