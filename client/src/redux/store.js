import { configureStore } from '@reduxjs/toolkit';
import appDataSliceReducer from './appDataSlice';
import contractsAddressReducer from './contractsAddressSlice';
import txReducer from './txSlice';
import batchExternalDataReducer from './batchExternalDataSlice';

export const store = configureStore({
  reducer: {
    appData: appDataSliceReducer,
    contractsAddress: contractsAddressReducer,
    tx: txReducer,
    batchExternalData: batchExternalDataReducer,
  },
});
