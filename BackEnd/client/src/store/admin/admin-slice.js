import { createSlice } from "@reduxjs/toolkit";

const filterHelper = (filterParam, arr) => {
  if (filterParam === "date") {
    return arr.sort((a, b) => {
      // return new Date(b.createdAt) - new Date(a.createdAt);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }
  if (filterParam === "sale") {
    return arr.sort((a, b) => {
      if (b.sale) {
        return 1;
      }
      if (a.sale) {
        return -1;
      }
      return 0;
    });
  }
  if (filterParam === "low") {
    let arrUpdate = [...arr];
    arrUpdate.forEach((item) => {
      item.testPrice = item.price;
      if (item.sale) {
        item.testPrice = item.salePrice;
      }
    });
    arrUpdate.sort((a, b) => {
      return +a.testPrice - +b.testPrice;
    });
    return (arr = arrUpdate);
  }
  if (filterParam === "high") {
    let arrUpdate = [...arr];
    arrUpdate.forEach((item) => {
      item.testPrice = item.price;
      if (item.sale) {
        item.testPrice = item.salePrice;
      }
    });
    arrUpdate.sort((a, b) => {
      return +b.testPrice - +a.testPrice;
    });
    return (arr = arrUpdate);
  }
};

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    modal: false,
    modalE: false,
    modalD: false,
    products: [{ prod: null }],
    editProduct: [],
    deleteProduct: [{ title: null }],
    isLoading: false,
    modalError: false,
    errorMsg: null,
    cart: [],
    total: `$0.00`,
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
    setModalError(state, action) {
      state.modalError = action.payload;
    },
    setErrorMsg(state, action) {
      state.errorMsg = action.payload;
      state.modalError = true;
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
    setDeleteProduct(state, action) {
      state.deleteProduct = [...action.payload.product];
    },
    setCart(state, action) {
      state.cart = [...action.payload.cart];
    },
    setTotal(state, action) {
      state.total = "$" + action.payload.total;
    },
    setLoading(state, action) {
      console.log(action.payload);
      state.isLoading = action.payload;
    },
    filterCatProd(state, action) {
      if (action.payload === "date") {
        state.products = filterHelper("date", state.products);
      }
      if (action.payload === "sale") {
        state.products = filterHelper("sale", state.products);
      }
      if (action.payload === "low") {
        state.products = filterHelper("low", state.products);
      }
      if (action.payload === "high") {
        state.products = filterHelper("high", state.products);
      }
    },
  },
});

export const adminActions = adminSlice.actions;

export default adminSlice;
