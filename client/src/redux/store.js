import { configureStore } from '@reduxjs/toolkit'
import appDataSliceReducer from './appDataSlice'
import contractsAddressReducer from './contractsAddressSlice'

export const store = configureStore({
    reducer: {
      appData: appDataSliceReducer,
      contractsAddress: contractsAddressReducer,
    },
  })