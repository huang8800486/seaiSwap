import { useMemo, useEffect, useState } from 'react'
import { Flex, Text, Box, useMatchBreakpoints, Input, Button } from '@pancakeswap/uikit'
import { useWeb3LibraryContext, useWeb3React } from '@pancakeswap/wagmi'
import { Contract } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import { useTranslation } from '@pancakeswap/localization'
import { getContract } from 'utils/contractHelpers'
import { useSigner } from 'wagmi'
import { ROUTER_ADDRESS } from 'config/constants/exchange'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import IPancakeRouter02 from 'config/abi/IPancakeRouter02.json'
import { BodyWrap, InviterdWrap } from './style'
import CommonInvite from '../Home/components/BitbankHome/CommonInvite'
import CommonItem from '../Home/components/BitbankHome/CommonItem'

export default function Invited() {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const { isMobile } = useMatchBreakpoints()
  const { account } = useWeb3React()
  const { data: signer } = useSigner()
  const [mySuperior, setMySuperior] = useState('')
  const [myInvitedList, setMyInvitedList] = useState([])
  // const invitedPoolContract = useMemo(() => {
  //   return getContract({ abi: IPancakeRouter02, address: ROUTER_ADDRESS[chainId], signer })
  // }, [signer, chainId])
  // useEffect(() => {
  //   if (invitedPoolContract) {
  //     invitedPoolContract
  //       .playerInfo(account)
  //       .then((result) => {
  //         setMySuperior(result.referrer)
  //       })
  //       .catch((err) => {
  //         console.log('playerInfo', err)
  //       })
  //     invitedPoolContract
  //       .getDirectRecommendAddressList(account)
  //       .then((result) => {
  //         console.log('getDirectRecommendAddressList', result)
  //         setMyInvitedList(result)
  //       })
  //       .catch((err) => {
  //         console.log('getDirectRecommendAddressList', err)
  //       })
  //   }
  // }, [invitedPoolContract, account])
  const receiveClick = () => {}
  const [inviteList, setInviteList] = useState([
    {
      time: '2023-7-23 14:00:00',
      address: '0x3wec...6731',
    },
    {
      time: '2023-7-23 14:00:00',
      address: '0x3wec...6731',
    },
    {
      time: '2023-7-23 14:00:00',
      address: '0x3wec...6731',
    },
  ])
  return (
    <BodyWrap>
      <InviterdWrap>
        <div className="con_wrap">
          <CommonItem>
            <div className="invite_content">
              <span>可领取交易邀请数量奖励</span>
            </div>
            <div className="receive_content">
              <div className="receive_text">
                <i>2634.00</i>
                <em>BNB</em>
              </div>
            </div>
            <div className="button_wrap">
              <Button as="a" scale="md" onClick={receiveClick} style={{ width: '100%', borderRadius: '0' }}>
                领取
              </Button>
            </div>
            <span className="note">邀请奖励：1级返0.1%，2级返0.05%</span>
          </CommonItem>
          <CommonInvite isNotRecord={true} />
        </div>
        <CommonItem title={'邀请记录'} imgName={'invite_record'}>
          <div className="invite_list">
            {inviteList.map((items) => (
              <div className="list">
                <span>{items?.time}</span>
                <span>{items?.address}</span>
              </div>
            ))}
          </div>
        </CommonItem>
      </InviterdWrap>
    </BodyWrap>
  )
}
