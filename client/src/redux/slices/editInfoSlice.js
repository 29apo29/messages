import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../../helper/auth";
const { REACT_APP_API_URL } = process.env;

const initialState = { data: null, isLoading: false, error: null };

export const editInfoFetch = createAsyncThunk(
  "editInfoSlice/editInfoFetch",
  async (args, { getState, rejectWithValue }) => {
    const { token, code, value } = args;
    const refreshToken = getToken();
    try {
      const res = await axios.post(
        `${REACT_APP_API_URL}api/user/editinfo`,
        { [code]: value, token:refreshToken },
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

const editInfoSlice = createSlice({
  name: "editInfoSlice",
  initialState,
  reducers: {
    reset: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(editInfoFetch.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(editInfoFetch.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(editInfoFetch.rejected, (state, action) => {
      state.error = action.payload;
      state.data = null;
      state.isLoading = false;
    });
  },
});

export const { reset } = editInfoSlice.actions;
export default editInfoSlice.reducer;
