import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  url: '',
  batchNoQR: '',
  nextAction: '',
  messageQR: '',
  readyToAdd: false,
};

export const batchQRDataSlice = createSlice({
  name: 'batchQRData',
  initialState,
  reducers: {
    setBatchNoQR: (state, action) => {
      state.batchNoQR = action.payload;
    },
    setNextAction: (state, action) => {
      state.nextAction = action.payload;
    },
    setMessageQR: (state, action) => {
      state.messageQR = action.payload;
    },
    setReadyToAdd: (state, action) => {
      state.readyToAdd = action.payload;
    },
  },
});

export const { setBatchNoQR, setNextAction, setMessageQR, setReadyToAdd } = batchQRDataSlice.actions;

export const batchNoQRSelector = createSelector(
  (state) => state.batchQRData,
  (batchQRData) => batchQRData.batchNoQR
);

export const nextActionSelector = createSelector(
  (state) => state.batchQRData,
  (batchQRData) => batchQRData.nextAction
);

export const messageQRSelector = createSelector(
  (state) => state.batchQRData,
  (batchQRData) => batchQRData.messageQR
);

export const readyToAddSelector = createSelector(
  (state) => state.batchQRData,
  (batchQRData) => batchQRData.readyToAdd
);

export default batchQRDataSlice.reducer;
