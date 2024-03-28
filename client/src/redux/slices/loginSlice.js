import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';
import loginInputsControl from './loginInputsControl';


const initialState = {
  values: {
    username: '',
    password: '',
    rememberme:false,
    isReady: false,
    wrongInputs: ['username', 'password']
  },
  forFetch: {
    data: null,
    isLoading: false,
    error: null
  }
}


export const loginFetch = createAsyncThunk("loginSlice/loginFetch", async (args, { getState, rejectWithValue }) => {
  const state = getState().login; // getting login state 

  const value = { ...state.values }; // storing state value in new variable
  delete value.isReady; // deleting unnecesarry values
  delete value.wrongInputs;

  try {
    const res = await axios.post("POST URL", { value }); // post bla bla
    const result = await res.data;
    return result;
  } catch (err) {
    return rejectWithValue(err.response); //if err bla bla
  }
})

const loginSlice = createSlice({
  name: 'loginSlice', // slice name
  initialState,
  reducers: {
    setLoginState: (state, action) => { // setting state with input values
      state = current(state);
      let newState = { ...state };
      const { name, value } = action.payload;
      const updatedValues = newState.values[name] !== undefined ? { ...newState.values, [name]: value } : { ...newState.values };
      const controls = loginInputsControl(updatedValues);
      return {
        ...newState,
        values: {
          ...updatedValues,
          isReady: controls.isReady,
          wrongInputs: controls.wrongInputs
        }
      };
    },
    resetLoginFetchState: (state) => { // fetch state reseting
      state = current(state);
      let updatedValues = {
        ...state,
        forFetch: initialState.forFetch
      }
      return updatedValues;
    },
    resetLoginValuesState: (state) => { // inputs state reseting
      state = current(state);
      let updatedValues = {
        ...state,
        values: initialState.values
      }
      return updatedValues;
    }
  },
  extraReducers: (builder) => { // extrareducers for fetch action ....
    builder.addCase(loginFetch.pending, state => {
      state.forFetch.isLoading = true;
      state.forFetch.error = null;
    })
    builder.addCase(loginFetch.fulfilled, (state, action) => {
      state.forFetch.data = action.payload;
      state.forFetch.error = null;
      state.forFetch.isLoading = false;
    })
    builder.addCase(loginFetch.rejected, (state, action) => {
      state.forFetch.error = action.payload;
      state.forFetch.data = null;
      state.forFetch.isLoading = false;
    })
  }
})

//exporting
export const { setLoginState, resetLoginFetchState, resetLoginValuesState } = loginSlice.actions;
export default loginSlice.reducer;