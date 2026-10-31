import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const userRolesSlice = createSlice({
  name: 'userRoles',
    initialState,
    reducers: {
        setUserRoles(state, action) {
            return action.payload;
        }
    }
});

export const { reducer: userRolesReducer } = userRolesSlice;

export const { setUserRoles } = userRolesSlice.actions;
