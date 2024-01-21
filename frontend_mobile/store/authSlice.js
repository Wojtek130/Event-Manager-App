import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  user: null,
  authTokens: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.authTokens = JSON.stringify(action.payload.authTokens);
      state.user = jwtDecode(action.payload.authTokens).username;
    },
    clearUser: (state) => {
      state.user = null;
      state.authTokens = null;
    },
  },
});

export const selectUser = (state) => state.auth.user;
export const selectAuthTokens = (state) => state.auth.authTokens;
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
