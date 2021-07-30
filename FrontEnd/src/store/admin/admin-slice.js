import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    modal: false,
    modalE: false,
    modalD: false,
    products: [],
    editProduct: [],
    isLoading: false,
  },
  reducers: {
    setModal(state, action) {
      state.modal = action.payload;
    },
    setModalE(state, action) {
      console.log(action.payload);
      state.modalE = action.payload;
    },
    setModalD(state, action) {
      state.modalD = action.payload;
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
