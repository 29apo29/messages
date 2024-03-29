import { configureStore } from '@reduxjs/toolkit';
import signupSlice from './slices/signupSlice';
import loginSlice from './slices/loginSlice';

export default configureStore({
  reducer: {
    signup: signupSlice,
    login: loginSlice
  }
});