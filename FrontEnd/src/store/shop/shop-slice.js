import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    allProducts: [],
    recentItems: [],
    shirts: [],
    shorts: [],
    pants: [],
    hats: [],
    tops: [],
    dresses: [],
    skirts: [],
    leggings: [],
    isLoading: false,
  },
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload.loading;
    },
    setAllProd(state, action) {
      state.allProducts = [...action.payload.products];
      state.recentItems = [...action.payload.products.splice(0, 4)];
    },
  },
});

export const shopActions = shopSlice.actions;

export default shopSlice;
