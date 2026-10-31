import { createSlice } from '@reduxjs/toolkit';

const donorSlice = createSlice({
  name: 'donor',
  initialState: '',
  reducers: {
    currentDonorSelected(state, action) {
      return action.payload || '';
    }
  }
});

export const { reducer: donorReducer } = donorSlice;

export const { currentDonorSelected } = donorSlice.actions;
