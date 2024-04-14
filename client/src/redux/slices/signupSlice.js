import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { signupInputControls } from "../controls/signupInputControls";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  values: {
    name: "",
    username: "",
    email: "",
    password: "",
    passwordAgain: "",
    isReady: false,
    wrongInputs: ["name", "username", "email", "password", "passwordAgain"],
  },
  forFetch: {
    data: null,
    isLoading: false,
    error: null,
  },
};

export const signupFetch = createAsyncThunk(
  "signupSlice/signupFetch",
  async (args, { getState, rejectWithValue }) => {
    const state = getState().signup;
    const value = { ...state.values };
    delete value.isReady;
    delete value.wrongInputs;
    try {
      const res = await axios.post(
        `${REACT_APP_API_URL}api/auth/signup`,
        value
      ); // post bla bla
      const result = await res.data;
      return result;
    } catch (err) {
      return rejectWithValue(err.response); //if err bla bla
    }
  }
);

const signupSlice = createSlice({
  name: "signupSlice",
  initialState,
  reducers: {
    setSignupState: (state, action) => {
      state = current(state);
      let newState = { ...state };
      const { name, value } = action.payload;
      const updatedValues =
        newState.values[name] !== undefined
          ? { ...newState.values, [name]: value }
          : { ...newState.values };
      const controls = signupInputControls(updatedValues);
      return {
        ...newState,
        values: {
          ...updatedValues,
          isReady: controls.isReady,
          wrongInputs: controls.wrongInputs,
        },
      };
    },
    resetSignupValueState: (state) => {
      state = current(state);
      return {
        ...state,
        values: { ...initialState.values },
      };
    },
    resetSignupFetchState: (state) => {
      // fetch state reseting
      state = current(state);
      return {
        ...state,
        forFetch: initialState.forFetch,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupFetch.pending, (state) => {
      state.forFetch.isLoading = true;
      state.forFetch.error = null;
    });
    builder.addCase(signupFetch.fulfilled, (state, action) => {
      state.forFetch.data = action.payload;
      state.forFetch.error = null;
      state.forFetch.isLoading = false;
      state.values = { ...initialState.values };
    });
    builder.addCase(signupFetch.rejected, (state, action) => {
      state.forFetch.data = null;
      state.forFetch.error = action.payload;
      state.forFetch.isLoading = false;
    });
  },
});

//exporting
export const { setSignupState, resetSignupFetchState, resetSignupValueState } =
  signupSlice.actions;
export default signupSlice.reducer;
