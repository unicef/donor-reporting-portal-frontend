import { createSlice } from '@reduxjs/toolkit';

const successSlice = createSlice({
  name: 'success',
  initialState: null,
  reducers: {
    actionSucceeded(state, action) {
      return action.payload;
    },
    successCleared() {
      return null;
    }
  }
});

export const { reducer: successReducer } = successSlice;
export const { actionSucceeded, successCleared } = successSlice.actions;
