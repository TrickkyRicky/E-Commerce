import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userIdLogin: null,
    jwtToken: null,
    cryptoToken: null,
    isAuth: false,
    userIdReset: null,
    isLoading: false,
    errorMsg: null,
  },
  reducers: {
    successfulSignup(state, action) {
      console.log(action.payload.result);
    },
    successLogin(state, action) {
      console.log(action.payload);
      state.jwtToken = action.payload.jwtToken;
      state.userIdLogin = action.payload.userIdLogin;
    },
    successReset(state, action) {
      console.log(action.payload);
    },
    successPassReset(state, action) {
      console.log(action.payload);
    },
    setTokenAndUser(state, action) {
      state.cryptoToken = action.payload.cryptoToken;
      state.userIdReset = action.payload.id;
    },
    setLoading(state, action) {
      console.log("Loading should be true here: ", action.payload.isLoading);
      state.isLoading = action.payload;
    },
    setAuth(state, action) {
      state.isAuth = action.payload;
    },
    unSetAuth(state, action) {
      state.jwtToken = action.payload.jwtToken;
      state.userIdLogin = action.payload.userIdLogin;
      state.isAuth = action.payload.isAuth;
    },
    setErrorMsg(state, action) {
      console.log(action.payload);
      state.errorMsg = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
