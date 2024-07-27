import { createAction } from '@reduxjs/toolkit'

export const updatedOptionsInvitedAddress = createAction<{ optionsInvitedAddress: string }>(
  'options/optionsInvitedAddress',
)
export const updatedOptionsShowSamllNav = createAction<{ optionsShowSamllNav: boolean }>('options/optionsShowSamllNav')
