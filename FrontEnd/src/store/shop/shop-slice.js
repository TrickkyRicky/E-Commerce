import { createSlice } from "@reduxjs/toolkit";

const filterProducts = (array, cat) => {
  return array
    .filter((prod) => {
      return prod.category.includes(cat);
    })
    .splice(0, 4);
};

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

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    allProducts: [],
    recentItems: [],
    productDetail: {
      _id: null,
      imageUrl: null,
      description: null,
      title: null,
      color: null,
      price: null,
      stock: { xsmall: 0, small: 0, medium: 0, large: 0, xlarge: 0 },
      sale: null,
      salePrice: null,
    },
    catProducts: [],
    tShirts: [],
    shorts: [],
    pants: [],
    hats: [],
    tops: [],
    dresses: [],
    skirts: [],
    leggings: [],
    viewSales: false,

    isLoading: false,
    hbm: false,
  },
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload.loading;
    },
    setSales(state, action) {
      state.viewSales = action.payload;
    },
    setAllProd(state, action) {
      state.allProducts = [...action.payload.products];
      state.recentItems = [...action.payload.products.splice(0, 4)];
    },
    setProduct(state, action) {
      state.productDetail = { ...action.payload.product };
    },
    setCatProd(state, action) {
      state.catProducts = [...action.payload.products];
    },
    setAllIndividual(state, action) {
      state.tShirts = filterProducts([...action.payload.products], "shirt");
      state.shorts = filterProducts([...action.payload.products], "shorts");
      state.pants = filterProducts([...action.payload.products], "pants");
      state.hats = filterProducts([...action.payload.products], "hats");
      state.tops = filterProducts([...action.payload.products], "tops");
      state.dresses = filterProducts([...action.payload.products], "dresses");
      state.skirts = filterProducts([...action.payload.products], "skirts");
      state.leggings = filterProducts([...action.payload.products], "leggings");
    },
    filterAllProd(state, action) {
      if (action.payload === "date") {
        state.allProducts = filterHelper("date", state.allProducts);
      }
      if (action.payload === "sale") {
        state.allProducts = filterHelper("sale", state.allProducts);
      }
      if (action.payload === "low") {
        state.allProducts = filterHelper("low", state.allProducts);
      }
      if (action.payload === "high") {
        state.allProducts = filterHelper("high", state.allProducts);
      }
    },
    filterCatProd(state, action) {
      if (action.payload === "date") {
        state.catProducts = filterHelper("date", state.catProducts);
      }
      if (action.payload === "sale") {
        state.catProducts = filterHelper("sale", state.catProducts);
      }
      if (action.payload === "low") {
        state.catProducts = filterHelper("low", state.catProducts);
      }
      if (action.payload === "high") {
        state.catProducts = filterHelper("high", state.catProducts);
      }
    },
    setHBM(state, action) {
      state.hbm = action.payload;
    },
  },
});

export const shopActions = shopSlice.actions;

export default shopSlice;
