import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from '../index'
import { updatedOptionsInvitedAddress, updatedOptionsShowSamllNav, updatedOptionsCurrentBlockNumber } from './actions'

export function useOptionsInvitedAddress(): [string, (address: string) => void] {
  const dispatch = useAppDispatch()
  const optionsInvitedAddress = useSelector<AppState, AppState['options']['optionsInvitedAddress']>((state) => {
    return state.options.optionsInvitedAddress
  })

  const setOptionsInvitedAddress = useCallback(
    (address: string) => {
      dispatch(updatedOptionsInvitedAddress({ optionsInvitedAddress: address }))
    },
    [dispatch],
  )

  return [optionsInvitedAddress, setOptionsInvitedAddress]
}
export function useOptionsCurrentBlockNumber(): [number, (number: number) => void] {
  const dispatch = useAppDispatch()
  const optionsCurrentBlockNumber = useSelector<AppState, AppState['options']['optionsCurrentBlockNumber']>((state) => {
    return state.options.optionsCurrentBlockNumber
  })

  const setOptionsCurrentBlockNumber = useCallback(
    (number: number) => {
      dispatch(updatedOptionsCurrentBlockNumber({ optionsCurrentBlockNumber: number }))
    },
    [dispatch],
  )

  return [optionsCurrentBlockNumber, setOptionsCurrentBlockNumber]
}
export function useOptionsShowSamllNav(): [boolean, (flag: boolean) => void] {
  const dispatch = useAppDispatch()
  const optionsShowSamllNav = useSelector<AppState, AppState['options']['optionsShowSamllNav']>((state) => {
    return state.options.optionsShowSamllNav
  })

  const setOptionsShowSamllNav = useCallback(
    (flag: boolean) => {
      dispatch(updatedOptionsShowSamllNav({ optionsShowSamllNav: flag }))
    },
    [dispatch],
  )

  return [optionsShowSamllNav, setOptionsShowSamllNav]
}
