import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../../helper/auth";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

export const logoutFetch = createAsyncThunk(
  "logoutSlice/logoutFetch",
  async (args, { getState, rejectWithValue }) => {
    const {token} = args; 
    try {
      const res = await axios.post(
        `${REACT_APP_API_URL}api/auth/logout`,
        {
          token: getToken(),
        },
        {
          headers: {
            Authorization: `Bearer: ${token}`,
          },
        }
      ); // post bla bla
      const result = await res.data;
      return result;
    } catch (err) {
      return rejectWithValue(err.response); //if err bla bla
    }
  }
);

const logoutSlice = createSlice({
  name: "logoutSlice", // slice name
  initialState,
  reducers: {
    resetLogoutState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // extrareducers for fetch action ....
    builder.addCase(logoutFetch.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(logoutFetch.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = null;
      state.isLoading = false;
      state.values = { ...initialState.values };
    });
    builder.addCase(logoutFetch.rejected, (state, action) => {
      state.error = action.payload;
      state.data = null;
      state.isLoading = false;
    });
  },
});

//exporting
export const { resetLogoutState } = logoutSlice.actions;
export default logoutSlice.reducer;
