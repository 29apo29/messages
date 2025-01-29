import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { passwordInputsControl } from "../controls/passwordControl";
import { getToken } from "../../helper/auth";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

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

export const passwordUpdateFetch = createAsyncThunk(
  "passwordSlice/passwordUpdateFetch",
  async (args, { getState, rejectWithValue }) => {
    const state = getState().password;
    const { token } = args;
    const refreshToken = getToken();
    try {
      const res = await axios.post(
        `${REACT_APP_API_URL}api/user/passwordupdate`,
        { password: state.values.password, token: refreshToken },
        {
          headers: {
            Authorization: `Bearer: ${token}`,
          },
        }
      );
      const result = await res.data;
      return result;
    } catch (err) {
      return rejectWithValue(err.response); //if err bla bla
    }
  }
);

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

      state.values = {
        ...state.values,
        ...passwordInputsControl(state.values),
      };
      return state;
    },
    resetFetch: (state) => {
      state = { ...current(state) };
      return { ...state, forFetch: initialState.forFetch };
    },
    reset: ()=>{
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(passwordUpdateFetch.pending, (state) => {
      state.forFetch.isLoading = true;
      state.forFetch.error = null;
    });
    builder.addCase(passwordUpdateFetch.fulfilled, (state, action) => {
      state.forFetch.data = action.payload;
      state.forFetch.error = null;
      state.forFetch.isLoading = false;
    });
    builder.addCase(passwordUpdateFetch.rejected, (state, action) => {
      state.forFetch.error = action.payload;
      state.forFetch.data = null;
      state.forFetch.isLoading = false;
    });
  },
});

export const { change } = passwordSlice.actions;
export default passwordSlice.reducer;
