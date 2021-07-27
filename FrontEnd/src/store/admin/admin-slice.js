import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    modal: false,
    products: [],
    editProduct: [],
    isLoading: false,
  },
  reducers: {
    setModal(state, action) {
      state.modal = action.payload;
    },

    successCreation(state, action) {
      console.log(action.payload);
    },
    successEdit(state, action) {
      console.log(action.payload);
    },
    successDelete(state, action) {
      console.log(action.payload);
    },

    setUserProducts(state, action) {
      console.log(action.payload.products);
      state.products = [...action.payload.products];
    },
    setEditProduct(state, action) {
      state.editProduct = [...action.payload.product];
    },
    setLoading(state, action) {
      console.log(action.payload);
      state.isLoading = action.payload;
    },
  },
});

export const adminActions = adminSlice.actions;

export default adminSlice;
