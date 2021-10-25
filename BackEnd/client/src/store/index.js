import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth/auth-slice.js";
import shopSlice from "./shop/shop-slice.js";
import adminSlice from "./admin/admin-slice.js";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    shop: shopSlice.reducer,
    admin: adminSlice.reducer,
  },
});

export default store;
