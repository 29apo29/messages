import { configureStore } from '@reduxjs/toolkit';
import signupSlice from './signupSlice';

export default configureStore({
  reducer: {
    signup: signupSlice
  }
});