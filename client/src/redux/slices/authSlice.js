import { createSlice, current } from "@reduxjs/toolkit";
import { openJwt } from "../../helper/auth";

const initialState = {
  name: "",
  username: "",
  email: "",
  accessToken: "",
  exp: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      console.log(payload);
      const { jwt } = payload;
      const { name, username, email, exp } = openJwt(jwt);
      const newState = { name, username, accessToken: jwt, email, exp };
      state = { ...newState };
      console.log(state);
      return newState;
    },
    refresh: (state, { payload }) => {
      state = { ...current(state) };
      state.accessToken = payload.token;
      state.exp = openJwt(payload).exp;
      return state;
    },
  },
});

export const { login, refresh } = authSlice.actions;
export default authSlice.reducer;
