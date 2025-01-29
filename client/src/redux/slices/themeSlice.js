import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  isLight: true,
};

const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    setTheme: (state,action) => {
      state = {...current(state)};
      return { isLight: !state.isLight };
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
