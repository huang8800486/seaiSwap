import { createReducer } from '@reduxjs/toolkit'
import { defaultReferrerAddress } from './types'
import {
  updatedOptionsInvitedAddress,
  updatedOptionsShowSamllNav,
  updatedOptionsCurrentBlockNumber,
  updatedOptionsNftList,
} from './actions'

export interface AddressState {
  optionsInvitedAddress: string
  optionsShowSamllNav: boolean
  optionsCurrentBlockNumber: number
  optionsNftList: any
}

export const initialState: AddressState = {
  optionsInvitedAddress: defaultReferrerAddress, // 默认地址
  optionsCurrentBlockNumber: -1,
  optionsShowSamllNav: false,
  optionsNftList: [],
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updatedOptionsInvitedAddress, (state, action) => {
      state.optionsInvitedAddress = action.payload.optionsInvitedAddress
    })
    .addCase(updatedOptionsCurrentBlockNumber, (state, action) => {
      state.optionsCurrentBlockNumber = action.payload.optionsCurrentBlockNumber
    })
    .addCase(updatedOptionsShowSamllNav, (state, action) => {
      state.optionsShowSamllNav = action.payload.optionsShowSamllNav
    })
    .addCase(updatedOptionsNftList, (state, action) => {
      state.optionsNftList = action.payload.optionsNftList
    }),
)
