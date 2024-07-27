import { useMemo, useEffect, useState } from 'react'
import { Flex, Text, Box, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useWeb3LibraryContext, useWeb3React } from '@pancakeswap/wagmi'
import { Contract } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import { useTranslation } from '@pancakeswap/localization'
import { getContract } from 'utils/contractHelpers'
import { useSigner } from 'wagmi'
import { ROUTER_ADDRESS } from 'config/constants/exchange'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import IPancakeRouter02 from 'config/abi/IPancakeRouter02.json'
import { BodyWrap, InviterdWrap, InviterdTitle, InviterdText, InviterdList, InviterdItem } from './style'

export default function Invited() {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const { isMobile } = useMatchBreakpoints()
  const { account } = useWeb3React()
  const { data: signer } = useSigner()
  const [mySuperior, setMySuperior] = useState('')
  const [myInvitedList, setMyInvitedList] = useState([])
  const invitedPoolContract = useMemo(() => {
    return getContract({ abi: IPancakeRouter02, address: ROUTER_ADDRESS[chainId], signer })
  }, [signer, chainId])
  useEffect(() => {
    if (invitedPoolContract) {
      invitedPoolContract
        .playerInfo(account)
        .then((result) => {
          setMySuperior(result.referrer)
        })
        .catch((err) => {
          console.log('playerInfo', err)
        })
      invitedPoolContract
        .getDirectRecommendAddressList(account)
        .then((result) => {
          console.log('getDirectRecommendAddressList', result)
          setMyInvitedList(result)
        })
        .catch((err) => {
          console.log('getDirectRecommendAddressList', err)
        })
    }
  }, [invitedPoolContract, account])
  console.log('invitedPoolContract', invitedPoolContract)
  return (
    <BodyWrap isMobile={isMobile}>
      <InviterdWrap>
        <InviterdTitle isMobile={isMobile}>
          <Box mr="10px">{t('My superior')}: </Box>
          <Box>{mySuperior}</Box>
        </InviterdTitle>
        <InviterdTitle isMobile={isMobile}>
          <Box mr="10px">{t('My number of invites')}: </Box>
          <Box>{myInvitedList.length}</Box>
        </InviterdTitle>
        <InviterdText isMobile={isMobile}>{t('Invitation address list')}</InviterdText>
        <InviterdList isMobile={isMobile}>
          {myInvitedList.map((item) => (
            <InviterdItem key={item} isMobile={isMobile}>
              {item}
            </InviterdItem>
          ))}
        </InviterdList>
      </InviterdWrap>
    </BodyWrap>
  )
}
