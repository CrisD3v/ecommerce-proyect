import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenModal: (state) => {
      state.openModal = !state.openModal;
    },
  },
});

export const { setOpenModal } = modalSlice.actions;

export default modalSlice.reducer;
