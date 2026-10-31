import { createReducer } from '@reduxjs/toolkit';
import { createUserSuccess, resetCreatedUser } from 'actions';

export const createdUserReducer = createReducer(null, builder =>
  builder
    .addCase(createUserSuccess, (state, action) => action.payload)
    .addCase(resetCreatedUser, () => null)
);
