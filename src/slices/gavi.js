import {createSlice} from '@reduxjs/toolkit';

const gaviSlice = createSlice({
  name: 'gavi',
  initialState: [],
  reducers: {
    onReceiveGavi(state, action) {
      return action.payload;
    }
  }
});

export const {reducer: gavi} = gaviSlice;
export const {onReceiveGavi} = gaviSlice.actions;
