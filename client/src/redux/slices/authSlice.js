import { createSlice, current } from "@reduxjs/toolkit";
import { openJwt } from "../../helper/auth";

const initialState = {
  name: "",
  username: "",
  email: "",
  profilephoto: "",
  accessToken: "",
  bio:"",
  exp: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      const { jwt } = payload;
      const { name, username, email, exp, profilephoto, bio } = openJwt(jwt);
      const newState = { name, username, accessToken: jwt, email, exp, profilephoto, bio };
      state = { ...newState };
      return newState;
    },
    refresh: (state, { payload }) => {
      state = { ...current(state) };
      state.accessToken = payload.token;
      state.exp = openJwt(payload).exp;
      return state;
    },
    editInfo:(state,{payload})=>{
      state = { ...current(state) };
      let code = Object.keys(payload)[0];
      state[code] = payload[code];
      return state;
    },
    exit: () => {
      return initialState;
    },
  },
});

export const { login, refresh, exit,editInfo } = authSlice.actions;
export default authSlice.reducer;
