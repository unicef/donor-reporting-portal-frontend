import { createSlice } from '@reduxjs/toolkit';

const externalGrantsSlice = createSlice({
  name: 'externalGrants',
  initialState: [],
  reducers: {
    onReceiveExternalGrants(state, action) {
      return action.payload;
    }
  }
});

export const { reducer: externalGrants } = externalGrantsSlice;
export const { onReceiveExternalGrants } = externalGrantsSlice.actions;
