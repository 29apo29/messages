import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../helper/auth";
import axios from "axios";
import getBrowserInfos, { removeRefresh } from "../../helper/browser";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

export const refreshFetch = createAsyncThunk(
  "refreshSlice/refreshFetch",
  async (args, { getState, rejectWithValue }) => {
    const token = getToken();
    if (token === 0) return;
    try {
      const info = getBrowserInfos();
      const res = await axios.post(`${REACT_APP_API_URL}api/auth/refresh`, {
        token,
        info,
      }); // post bla bla
      const result = await res.data;
      return result;
    } catch (err) {
      if (err.response.status === 401) {
        removeRefresh();
      }
      return rejectWithValue(err.response); //if err bla bla
    }
  }
);

const refreshSlice = createSlice({
  name: "refreshSlice",
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshFetch.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.data = null;
    });
    builder.addCase(refreshFetch.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(refreshFetch.rejected, (state, action) => {
      state.error = action.payload;
      state.data = null;
      state.isLoading = false;
    });
  },
});

export const { reset } = refreshSlice.actions;
export default refreshSlice.reducer;
