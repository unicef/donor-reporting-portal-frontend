import { createSlice } from '@reduxjs/toolkit';

const reportsSlice = createSlice({
  name: 'reports',
  initialState: [],
  reducers: {
    onReceiveReports(state, action) {
      return action.payload;
    }
  }
});

export const { reducer: reports } = reportsSlice;
export const { onReceiveReports } = reportsSlice.actions;
