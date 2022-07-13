import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  urlExternal: '',
  batchNoExternal: '',
  nextActionExternal: '',
  messageExternal: '',
  readyToAddExternal: false,
};

export const batchExternalDataSlice = createSlice({
  name: 'batchExternalData',
  initialState,
  reducers: {
    setUrlExternal: (state, action) => {
      state.urlExternal = action.payload;
    },
    setBatchNoExternal: (state, action) => {
      state.batchNoExternal = action.payload;
    },
    setNextActionExternal: (state, action) => {
      state.nextActionExternal = action.payload;
    },
    setMessageExternal: (state, action) => {
      state.messageExternal = action.payload;
    },
    setReadyToAddExternal: (state, action) => {
      state.readyToAddExternal = action.payload;
    },
  },
});

export const { setUrlExternal, setBatchNoExternal, setNextActionExternal, setMessageExternal, setReadyToAddExternal } =
  batchExternalDataSlice.actions;

export const urlExternalSelector = createSelector(
  (state) => state.batchExternalData,
  (batchExternalData) => batchExternalData.urlExternal
);

export const batchNoExternalSelector = createSelector(
  (state) => state.batchExternalData,
  (batchExternalData) => batchExternalData.batchNoExternal
);

export const nextActionExternalSelector = createSelector(
  (state) => state.batchExternalData,
  (batchExternalData) => batchExternalData.nextActionExternal
);

export const messageExternalSelector = createSelector(
  (state) => state.batchExternalData,
  (batchExternalData) => batchExternalData.messageExternal
);

export const readyToAddExternalSelector = createSelector(
  (state) => state.batchExternalData,
  (batchExternalData) => batchExternalData.readyToAddExternal
);

export default batchExternalDataSlice.reducer;
