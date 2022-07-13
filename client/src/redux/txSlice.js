import { createSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
    txList: []
}

export const txSlice = createSlice({
  name: 'tx',
  initialState,
  reducers: {
    addTx: (state, action) => {
      state.txList.push(action.payload)
    },

    removeTx: (state, action) => {
      const txToRemove = action.payload
      state.txList = state.txList.filter((txItem) => !(txItem.tx === txToRemove.tx && txItem.type === txToRemove.type))
    }
  }
})

export const { addTx, removeTx } = txSlice.actions

export const txListSelector = createSelector( state => state.tx , tx => tx.txList)


export default txSlice.reducer