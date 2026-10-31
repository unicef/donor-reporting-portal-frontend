import {createSlice} from '@reduxjs/toolkit';

const groupsSlice = createSlice({
  name: 'userGroups',
  initialState: [],
  reducers: {
    setGroups: (state, action) => action.payload
  }
});
export const {reducer: groupsReducer} = groupsSlice;
export const {setGroups} = groupsSlice.actions;


const groupsMOUSlice = createSlice({
  name: 'userMOUGroups',
  initialState: [],
  reducers: {
    setMOUGroups: (state, action) => action.payload
  }
});
export const {reducer: groupsMOUReducer} = groupsMOUSlice;
export const {setMOUGroups} = groupsMOUSlice.actions;


const groupsGaviSlice = createSlice({
  name: 'userGaviGroups',
  initialState: null,
  reducers: {
    setGaviGroups: (state, action) => action.payload
  }
});
export const {reducer: groupsGaviReducer} = groupsGaviSlice;
export const {setGaviGroups} = groupsGaviSlice.actions;


const donorUserGroupsSlice = createSlice({
  name: 'donorUserGroups',
  initialState: [],
  reducers: {
    setDonorUserGroups: (state, action) => action.payload
  }
});
export const {reducer: donorUserGroupsReducer} = donorUserGroupsSlice;
export const {setDonorUserGroups} = donorUserGroupsSlice.actions;
