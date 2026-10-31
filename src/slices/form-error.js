import { createSlice } from '@reduxjs/toolkit';

const formErrorSlice = createSlice({
  name: 'formError',
  initialState: null,
  reducers: {
    onFormError(state, action) {
      return action.payload;
    },
    onResetFormError() {
      return null;
    }
  }
});

export const { reducer: formErrorReducer } = formErrorSlice;
export const { onFormError, onResetFormError } = formErrorSlice.actions;
