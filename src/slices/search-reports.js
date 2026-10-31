import {
  createSlice
} from '@reduxjs/toolkit';

const searchReportsSlice = createSlice({
  name: 'searchReports',
  initialState: {},
  reducers: {
    onReceiveSearchReports(state, action) {
      return action.payload;
    }
  }
});

export const {
  reducer: searchReports
} = searchReportsSlice;
export const {
  onReceiveSearchReports
} = searchReportsSlice.actions;
