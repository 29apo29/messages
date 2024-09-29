import { createSlice, current } from "@reduxjs/toolkit";
import { passwordInputsControl } from "../controls/passwordControl";

const initialState = {
  values: {
    password: "",
    passwordAgain: "",
    wrongInputs: ["password", "passwordAgain"],
    isReady: false,
  },
  forFetch: {
    data: null,
    isLoading: false,
    error: null,
  },
};

const passwordSlice = createSlice({
  name: "passwordSlice",
  initialState,
  reducers: {
    change: (state, { payload }) => {
      state = { ...current(state) };
      const { name, value } = payload;
      state.values =
        state.values[name] !== undefined
          ? { ...state.values, [name]: value }
          : { ...state.values };

      state.values = { ...state.values, ...passwordInputsControl(state.values) };
      return state;
    },
  },
});

export const {change} = passwordSlice.actions;
export default passwordSlice.reducer;
