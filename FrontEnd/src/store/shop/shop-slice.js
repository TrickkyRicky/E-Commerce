import { createSlice } from "@reduxjs/toolkit";

const filterProducts = (array, cat) => {
  return array.filter((prod) => {
    return prod.category.includes(cat);
  });
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
  },
});

export const shopActions = shopSlice.actions;

export default shopSlice;
