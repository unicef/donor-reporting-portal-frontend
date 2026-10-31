import { createSlice } from '@reduxjs/toolkit';

const themesSlice = createSlice({
  name: 'themes',
  initialState: [],
  reducers: {
    onReceivethemes(state, action) {
      return action.payload;
    }
  }
});

export const { reducer: themes } = themesSlice;
export const { onReceivethemes } = themesSlice.actions;
