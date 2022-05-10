import { createSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
    coffeAddress: '0x',
    userAddress: '0x',
}

export const contractsAddressSlice = createSlice({
  name: 'contractsAddress',
  initialState,
  reducers: {

    setCoffeAddress: (state, action) => {
        state.coffeAddress = action.payload;
    },

    setUserAddress: (state, action) => {
        state.userAddress = action.payload;
    }

  }
})

export const coffeAddressSelector = createSelector( state => state.contractsAddress , contractsAddress => contractsAddress.coffeAddress)
export const userAddressSelector = createSelector( state => state.contractsAddress , contractsAddress => contractsAddress.userAddress)

export const { setCoffeAddress, setUserAddress } = contractsAddressSlice.actions

export default contractsAddressSlice.reducer