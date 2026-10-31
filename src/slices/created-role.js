import { createSlice } from '@reduxjs/toolkit';

const createdRoleSlice = createSlice({
  name: 'createdRole',
  initialState: null,
  reducers: {
    createRoleSuccess(state, action) {
      return action.payload;
    },
    resetCreatedRole() {
      return null;
    }
  }
});

export const { reducer: createdRoleReducer } = createdRoleSlice;
export const { createRoleSuccess, resetCreatedRole } = createdRoleSlice.actions;
