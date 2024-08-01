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
import { BodyWrap } from './style'
import CommonBox from '../Home/components/BitbankHome/CommonBox'
import CommonItem from '../Home/components/BitbankHome/CommonItem'

export default function Invited() {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const { isMobile } = useMatchBreakpoints()
  const { account } = useWeb3React()
  const { data: signer } = useSigner()
  const [mySuperior, setMySuperior] = useState('')
  const [myInvitedList, setMyInvitedList] = useState([])
  const receiveClick = () => {
    console.log('1')
  }
  const [nftlist, setNftlist] = useState([
    {
      img: '...',
      name: 'NFT1',
    },
    {
      img: '...',
      name: 'NFT2',
    },
    {
      img: '...',
      name: 'NFT3',
    },
    {
      img: '...',
      name: 'NFT4',
    },
  ])
  const [currentPage, setCurrentPage] = useState(1)
  const prevClick = () => {
    if (currentPage === 1) return
    setCurrentPage(currentPage - 1)
  }
  const nexClick = () => {
    if (currentPage === nftlist.length - 1) return
    setCurrentPage(currentPage + 1)
  }
  return (
    <BodyWrap>
      <div className="nft_list_wrap">
        {nftlist.map((items) => (
          <div className="nft_list">
            <CommonBox>
              <div className="nft_img">
                <img src="/images/seai/banner.png" alt="" />
              </div>
            </CommonBox>
            <h3>{items?.name}</h3>
          </div>
        ))}
      </div>
      <div className="nft_pagination_wrap">
        <div className="nft_page">
          <Button onClick={prevClick}>-</Button>
          <span>{currentPage}</span>
          <Button onClick={nexClick}>+</Button>
        </div>
      </div>
    </BodyWrap>
  )
}
