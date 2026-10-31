import { createSlice } from '@reduxjs/toolkit';
import { onReceiveUserProfile } from './user-profile';

const initialState = [];

const donorsSlice = createSlice({
  name: 'donors',
  initialState,
  reducers: {
    setDonors(state, action) {
      return action.payload;
    }
  },
  extraReducers: builder =>
    builder.addCase(onReceiveUserProfile, (state, action) => {
      return action.payload.donors;
    })
});

export const { reducer: donorsReducer } = donorsSlice;

export const { setDonors } = donorsSlice.actions;
