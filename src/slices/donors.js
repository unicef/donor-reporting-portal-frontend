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
      // The profile endpoint no longer returns a donors collection. Keep the
      // list fetched via setDonors unless the profile actually provides one.
      return Array.isArray(action.payload?.donors) ? action.payload.donors : state;
    })
});

export const { reducer: donorsReducer } = donorsSlice;

export const { setDonors } = donorsSlice.actions;
