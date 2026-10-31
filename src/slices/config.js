import {
  createSlice
} from '@reduxjs/toolkit';

export const configInitialState = {
  tracker: {},
  source_id: {}
};

const configSlice = createSlice({
  name: 'config',
  initialState: configInitialState,
  reducers: {
    onReceiveConfig(state, action) {
      return action.payload;
    }
  }
});

export const {
  reducer: config
} = configSlice;
export const {
  onReceiveConfig
} = configSlice.actions;
