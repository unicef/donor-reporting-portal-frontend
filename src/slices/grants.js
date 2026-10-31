import {
  createSlice
} from '@reduxjs/toolkit';

const grantsSlice = createSlice({
  name: 'grants',
  initialState: [],
  reducers: {
    onReceiveGrants(state, action) {
      return action.payload;
    }
  }
});

export const {
  reducer: grants
} = grantsSlice;
export const {
  onReceiveGrants
} = grantsSlice.actions;
