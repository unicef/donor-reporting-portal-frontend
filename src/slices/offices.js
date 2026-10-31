import { createSlice } from '@reduxjs/toolkit';

export const officesSlice = createSlice({
  name: 'offices',
  initialState: [],
  reducers: {
    onReceiveOffices(state, action) {
      return action.payload;
    }
  }
});

export const { reducer: offices } = officesSlice;
export const { onReceiveOffices } = officesSlice.actions;
