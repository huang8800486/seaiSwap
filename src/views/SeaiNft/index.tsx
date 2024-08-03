import { useMemo, useEffect, useState } from 'react'
import { Flex, Text, Box, useMatchBreakpoints, Input, Button } from '@pancakeswap/uikit'
import { useWeb3LibraryContext, useWeb3React } from '@pancakeswap/wagmi'
import { Contract } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import { useTranslation } from '@pancakeswap/localization'
import { getContract } from 'utils/contractHelpers'
import { useSigner } from 'wagmi'
import { NFT_ADDRESS } from '@pancakeswap/sdk'
import { ROUTER_ADDRESS } from 'config/constants/exchange'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import nftABI from 'config/abi/nftABI.json'
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
  const nftAddres = NFT_ADDRESS[chainId] || NFT_ADDRESS[-1]
  const nftPoolContract = useMemo(() => {
    return getContract({ abi: nftABI, address: nftAddres, signer })
  }, [signer, nftAddres])
  const fetchMyAPI = async () => {
    const balanceOf = await nftPoolContract.balanceOf(account)
    const length = +balanceOf.toString()
    const collectionList = []
    // const ayya = [
    //   {
    //     name: 'SKAISwapNFT #0',
    //     symbol: 'SKAISwapNFT',
    //     description: 'SKAISwapNFT limited edition of 333 pieces, unique feature Swap bonus.',
    //     image: 'https://nft.seaiswap.ai/img/robot/0.jpg',
    //     attributes: [{}],
    //   },
    //   {
    //     name: 'SKAISwapNFT #1',
    //     symbol: 'SKAISwapNFT',
    //     description: 'SKAISwapNFT limited edition of 333 pieces, unique feature Swap bonus.',
    //     image: 'https://nft.seaiswap.ai/img/robot/0.jpg',
    //     attributes: [{}],
    //   },
    // ]
    if (length && length > 0) {
      setMyInvitedList([])
      // console.log('length', length)
      for (let i = 0; i <= length - 1; i++) {
        nftPoolContract
          .tokenOfOwnerByIndex(account, i)
          .then((data) => {
            const tokendId = data.toString()
            nftPoolContract
              .tokenURI(tokendId)
              .then(async (url) => {
                const res = await fetch(url.toString())
                const json = await res.json()
                collectionList.push(json)
              })
              .catch((err) => {
                console.log('tokenURI', err)
                // setMyInvitedList([])
              })

            // collectionList.push(ayya[i])
          })
          .catch((err) => {
            console.log('tokenOfOwnerByIndex', err)
            // setMyInvitedList([])
          })
      }
    }
    setMyInvitedList(collectionList)
  }

  useEffect(() => {
    if (nftPoolContract && account) {
      console.log('nftPoolContract', nftPoolContract)
      fetchMyAPI()
    }
  }, [nftPoolContract, account])
  const receiveClick = () => {
    console.log('1')
  }
  const [nftlist, setNftlist] = useState([
    {
      name: '0',
      time: '2024-8-02',
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
        {myInvitedList.map((items) => (
          <div className="nft_list" key={items.symbol}>
            <CommonBox>
              <div className="nft_img">
                <img src={items.image} alt="" />
              </div>
            </CommonBox>
            <h3>{items?.name}</h3>
          </div>
        ))}
      </div>
      <CommonItem>
        <div className="invite_content">
          <span>可领取分红</span>
        </div>
        <div className="receive_content">
          <div className="receive_text">
            <i>0</i>
            <em>USDT</em>
          </div>
        </div>
        <div className="button_wrap">
          <Button as="a" scale="md" onClick={receiveClick} style={{ width: '100%', borderRadius: '0' }}>
            领取
          </Button>
        </div>
        {/* <span className="note">邀请奖励：1级返0.1%，2级返0.05%</span> */}
      </CommonItem>
      <CommonItem title="NFT分红" imgName="invite_record">
        <div className="invite_list_nft">
          <div className="list">
            <span>金额</span>
            <span>时间</span>
          </div>{' '}
          {nftlist.map((items, index) => (
            <div className="list" key={items?.name}>
              {/* <span>{items}</span> */}
              <span>{items?.name}</span>
              <span>{items?.time}</span>
            </div>
          ))}
        </div>
      </CommonItem>

      {/* <div className="nft_pagination_wrap">
        <div className="nft_page">
          <Button onClick={prevClick}>-</Button>
          <span>{currentPage}</span>
          <Button onClick={nexClick}>+</Button>
        </div>
      </div> */}
    </BodyWrap>
  )
}
