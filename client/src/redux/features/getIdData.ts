import SubCategory from "@/components/items/modal/SubCategory";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: null,
  SubCategory: null,
};

const getIdData = createSlice({
  name: "getData",
  initialState,
  reducers: {
    idCategory: (state, action) => {
      state.category = action.payload;
    },
    idSubCategory: (state, action) =>  {
       state.SubCategory = action.payload;
    }
  },
});

export const { idCategory, idSubCategory } = getIdData.actions;

export default getIdData.reducer;
