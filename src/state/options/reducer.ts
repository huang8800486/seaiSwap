import { createReducer } from '@reduxjs/toolkit'
import { defaultReferrerAddress } from './types'
import { updatedOptionsInvitedAddress, updatedOptionsShowSamllNav } from './actions'

export interface AddressState {
  optionsInvitedAddress: string
  optionsShowSamllNav: boolean
}

export const initialState: AddressState = {
  optionsInvitedAddress: defaultReferrerAddress, // 默认地址
  optionsShowSamllNav: false,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updatedOptionsInvitedAddress, (state, action) => {
      state.optionsInvitedAddress = action.payload.optionsInvitedAddress
    })
    .addCase(updatedOptionsShowSamllNav, (state, action) => {
      state.optionsShowSamllNav = action.payload.optionsShowSamllNav
    }),
)
