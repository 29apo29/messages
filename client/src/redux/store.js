import { configureStore } from '@reduxjs/toolkit';
import signupSlice from './slices/signupSlice';
import loginSlice from './slices/loginSlice';
import authSlice from './slices/authSlice';
import refreshSlice from './slices/refreshSlice';
import passwordSlice from './slices/passwordSlice';

export default configureStore({
  reducer: {
    signup: signupSlice,
    login: loginSlice,
    auth:authSlice,
    refresh:refreshSlice,
    password:passwordSlice
  }
});