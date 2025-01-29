import axios from "axios";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
const { REACT_APP_API_URL } = process.env;

const initialState = {
  forFetch: {
    data: null,
    isLoading: false,
    error: null,
  },
  values: {
    users: null,
  },
};

export const relatedFetch = createAsyncThunk(
  "relatedSlice/relatedFetch",
  async (args, { rejectWithValue }) => {
    const { token } = args;
    try {
      const res = await axios.get(`${REACT_APP_API_URL}api/user/related`, {
        headers: {
          Authorization: `Bearer: ${token}`,
        },
      });
      const result = await res.data;
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const relatedSlice = createSlice({
  name: "relatedSlice",
  initialState,
  reducers: {
    resetRelatedValues: (state) => {
      state = current(state);
      return { ...state, values: initialState.values };
    },
    resetRelatedfetch: (state) => {
      state = current(state);
      return { ...state, forFetch: initialState.forFetch };
    },
    resetRelated: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(relatedFetch.pending, (state) => {
      state.forFetch.isLoading = true;
      state.forFetch.error = null;
    });
    builder.addCase(relatedFetch.fulfilled, (state, action) => {
      state.forFetch.data = action.payload;
      state.forFetch.error = null;
      state.forFetch.isLoading = false;
      state.values.users = action.payload.users;
    });
    builder.addCase(relatedFetch.rejected, (state, action) => {
      state.forFetch.error = action.payload;
      state.forFetch.data = null;
      state.forFetch.isLoading = false;
    });
  },
});

export const { resetRelated, resetRelatedValues, resetRelatedfetch } =
  relatedSlice.actions;
export default relatedSlice.reducer;
