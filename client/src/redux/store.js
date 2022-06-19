import { configureStore } from '@reduxjs/toolkit';
import appDataSliceReducer from './appDataSlice';
import contractsAddressReducer from './contractsAddressSlice';
import txReducer from './txSlice';
import batchQRDataReducer from './batchQRDataSlice';

export const store = configureStore({
  reducer: {
    appData: appDataSliceReducer,
    contractsAddress: contractsAddressReducer,
    tx: txReducer,
    batchQRData: batchQRDataReducer,
  },
});
