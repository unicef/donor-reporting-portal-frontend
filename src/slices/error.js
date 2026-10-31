import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: 'error',
  initialState: null,
  reducers: {
    setError(state, action) {
      return action.payload;
    }
  }
});

export const { reducer: errorReducer } = errorSlice;
export const { setError } = errorSlice.actions;
