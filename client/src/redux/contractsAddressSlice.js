import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  coffeAddress1: '0x',
  coffeAddress2: '0x',
  userAddress: '0x',
};

export const contractsAddressSlice = createSlice({
  name: 'contractsAddress',
  initialState,
  reducers: {
    setCoffeAddress1: (state, action) => {
      state.coffeAddress1 = action.payload;
    },

    setCoffeAddress2: (state, action) => {
      state.coffeAddress2 = action.payload;
    },

    setUserAddress: (state, action) => {
      state.userAddress = action.payload;
    },
  },
});

export const coffeAddress1Selector = createSelector(
  (state) => state.contractsAddress,
  (contractsAddress) => contractsAddress.coffeAddress1
);
export const coffeAddress2Selector = createSelector(
  (state) => state.contractsAddress,
  (contractsAddress) => contractsAddress.coffeAddress2
);
export const userAddressSelector = createSelector(
  (state) => state.contractsAddress,
  (contractsAddress) => contractsAddress.userAddress
);

export const { setCoffeAddress1, setCoffeAddress2, setUserAddress } = contractsAddressSlice.actions;

export default contractsAddressSlice.reducer;
