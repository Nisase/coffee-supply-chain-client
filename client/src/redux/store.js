import { configureStore } from '@reduxjs/toolkit';
import appDataSliceReducer from './appDataSlice';
import contractsAddressReducer from './contractsAddressSlice';
import txReducer from './txSlice';
import batchExternalDataReducer from './batchExternalDataSlice';
import locationDataReducer from './locationDataSlice';
import locationDataSecReducer from './locationDataSecSlice';

export const store = configureStore({
  reducer: {
    appData: appDataSliceReducer,
    contractsAddress: contractsAddressReducer,
    tx: txReducer,
    batchExternalData: batchExternalDataReducer,
    locationData: locationDataReducer,
    locationDataSec: locationDataSecReducer,
  },
});
