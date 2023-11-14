import { createSlice } from "@reduxjs/toolkit";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    userInfo: getCookie("userInfo") ? getCookie("userInfo") : {},
  },
  reducers: {
    login: (state, action) => {
      setCookie("userInfo", action.payload);
      console.log(action.payload);
      state.userInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login } = counterSlice.actions;

export default counterSlice.reducer;
