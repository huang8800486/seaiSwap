import { useMemo, useEffect, useState } from 'react'
import { Flex, Text, Box, useMatchBreakpoints, Input, Button } from '@pancakeswap/uikit'
import { useWeb3LibraryContext, useWeb3React } from '@pancakeswap/wagmi'
import { Contract } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import { formatUnits } from '@ethersproject/units'
import { useTranslation } from '@pancakeswap/localization'
import { getContract } from 'utils/contractHelpers'
import { useSigner } from 'wagmi'
import { INVITED_ADDRESS } from '@pancakeswap/sdk'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import seaiInvited from 'config/abi/seaiInvited.json'
import { BodyWrap, InviterdWrap } from './style'
import CommonInvite from '../Home/components/BitbankHome/CommonInvite'
import CommonItem from '../Home/components/BitbankHome/CommonItem'
import { formatTime } from './formatTime'

export default function Invited() {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const { isMobile } = useMatchBreakpoints()
  const { account } = useWeb3React()
  const { data: signer } = useSigner()
  const [mySuperior, setMySuperior] = useState('')
  const [myInvitedList, setMyInvitedList] = useState([])
  const [awardList, setAwardList] = useState([])
  const invitedAddres = INVITED_ADDRESS[chainId] || INVITED_ADDRESS[-1]
  // console.log('invitedAddres', chainId, invitedAddres)
  const invitedPoolContract = useMemo(() => {
    return getContract({ abi: seaiInvited, address: invitedAddres, signer })
  }, [signer, chainId])
  useEffect(() => {
    if (invitedPoolContract && account) {
      invitedPoolContract
        .getAgentSubordinateAddress(account)
        .then((result) => {
          setMyInvitedList(result)
        })
        .catch((err) => {
          console.log('getAgentSubordinateAddress')
          // setMyInvitedList([])
        })
      invitedPoolContract
        .getTokenRewardList(account)
        .then((result) => {
          console.log('result.TokenRewardInfo', result, result.TokenRewardInfo)
          const array = []
          for (let i = 0; i < result.length - 1; i++) {
            const address = result[i].from
              ? `${result[i].from.substring(0, 2)}...${result[i].from.substring(result[i].from.length - 4)}`
              : ''
            array.push({
              addres: address,
              amount: formatUnits(result[i].amount.toString(), result[i].tokenDecimals.toString()).toString(),
              tokenName: result[i].tokenName.toString(),
              time: formatTime(result[i].time.toString() * 1000, 'yyyy-MM-dd'),
            })
          }
          console.log('array', array)
          setAwardList(array)
        })
        .catch((err) => {
          // setAwardList([])
          console.log('getTokenRewardList')
        })
      // console.log('invitedPoolContract', invitedPoolContract)
    }
  }, [invitedPoolContract, account])
  const receiveClick = () => {
    console.log('1')
  }
  return (
    <BodyWrap>
      <InviterdWrap>
        <div className="con_wrap">
          {/* <CommonItem>
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
          </CommonItem> */}
          <CommonInvite isNotRecord />
        </div>
        <CommonItem title="邀请记录" imgName="invite_record">
          <div className="invite_list">
            {myInvitedList.map((items) => (
              <div className="list">
                <span>{items ? `${items.substring(0, 10)}...${items.substring(items.length - 10)}` : ''}</span>
              </div>
            ))}
          </div>
        </CommonItem>
        <CommonItem title="奖励记录" imgName="invite_record">
          <div className="invite_listaward">
            <div className="list">
              <span>用户</span>
              <span>金额</span>
              <span>代币符号</span>
              <span>时间</span>
            </div>{' '}
            {awardList.map((items) => (
              <div className="list">
                {/* <span>{items}</span> */}
                <span>{items?.addres}</span>
                <span>{items?.amount}</span>
                <span>{items?.tokenName}</span>
                <span>{items?.time}</span>
              </div>
            ))}
          </div>
        </CommonItem>
      </InviterdWrap>
    </BodyWrap>
  )
}
