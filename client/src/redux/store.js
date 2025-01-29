import { configureStore } from '@reduxjs/toolkit';
import signupSlice from './slices/signupSlice';
import loginSlice from './slices/loginSlice';
import authSlice from './slices/authSlice';
import refreshSlice from './slices/refreshSlice';
import passwordSlice from './slices/passwordSlice';
import themeSlice from './slices/themeSlice';
import logoutSlice from './slices/logoutSlice';
import relatedSlice from './slices/relatedSlice';
import editInfoSlice from './slices/editInfoSlice';

export default configureStore({
  reducer: {
    signup: signupSlice,
    login: loginSlice,
    auth:authSlice,
    refresh:refreshSlice,
    password:passwordSlice,
    theme:themeSlice,
    logout:logoutSlice,
    related:relatedSlice,
    editInfo:editInfoSlice
  }
});