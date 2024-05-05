import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openMenu: true,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setOpenMenu: (state) => {
      state.openMenu = !state.openMenu;
    },
  },
});

export const { setOpenMenu } = menuSlice.actions;

export default menuSlice.reducer;
