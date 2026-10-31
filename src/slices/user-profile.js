import { createSlice } from '@reduxjs/toolkit';

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: null,
  reducers: {
    onReceiveUserProfile(state, action) {
      return action.payload;
    }
  }
});

export const { reducer: userProfileReducer } = userProfileSlice;
export const { onReceiveUserProfile } = userProfileSlice.actions;
