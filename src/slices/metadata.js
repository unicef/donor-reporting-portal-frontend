import {
  createSlice
} from '@reduxjs/toolkit';

export const metadataInitialState = {
  report_type: [],
  rp_status: [],
  recertified: [],
  donor_document: [],
  donor_reporting_category: [],
  award_type: [],
  vaccine_type: []
};

const metadataSlice = createSlice({
  name: 'metadata',
  initialState: metadataInitialState,
  reducers: {
    onReceiveMetadata(state, action) {
      let metadata = {
        report_type: [],
        rp_status: [],
        recertified: [],
        donor_document: [],
        donor_reporting_category: [],
        award_type: [],
        vaccine_type: []
      }
      action.payload.forEach(element => {
        let assetDupe = {
          ...element
        };
        delete assetDupe.category;
        metadata[element.category].push(assetDupe);
      });

      return metadata;
    }
  }
});

export const {
  reducer: metadata
} = metadataSlice;
export const {
  onReceiveMetadata
} = metadataSlice.actions;
