import { useMemo, useEffect, useState, useCallback } from 'react'
import { Flex, Text, useToast, useMatchBreakpoints, Input, Button } from '@pancakeswap/uikit'
import { useWeb3LibraryContext, useWeb3React } from '@pancakeswap/wagmi'
import { Contract } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import { useTranslation } from '@pancakeswap/localization'
import { getContract } from 'utils/contractHelpers'
import { formatUnits } from '@ethersproject/units'
import { useSigner } from 'wagmi'
import { NFT_ADDRESS, NFT_DIVIDENDS_ADDRESS } from '@pancakeswap/sdk'
import { ROUTER_ADDRESS } from 'config/constants/exchange'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useOptionsNftList } from 'state/options/hooks'
import nftABI from 'config/abi/nftABI.json'
import nftDividendsABI from 'config/abi/nftDividends.json'
import { http } from './https/index'
import { BodyWrap } from './style'
import CommonBox from '../Home/components/BitbankHome/CommonBox'
import CommonItem from '../Home/components/BitbankHome/CommonItem'
import { formatTime, formatNumMin } from '../Invited/formatTime'

export default function Invited() {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const { isMobile } = useMatchBreakpoints()
  const { account } = useWeb3React()
  const { data: signer } = useSigner()
  const { toastError, toastSuccess } = useToast()
  const [remaining, setRemaining] = useState(0)
  const [rewardInfo, setRewardInfo] = useState([])
  const nftAddres = NFT_ADDRESS[chainId] || NFT_ADDRESS[-1]
  const nftdividendsAddres = NFT_DIVIDENDS_ADDRESS[chainId] || NFT_DIVIDENDS_ADDRESS[-1]
  const [optionsNftList, setOptionsNftList] = useOptionsNftList()
  const nftPoolContract = useMemo(() => {
    return getContract({ abi: nftABI, address: nftAddres, signer })
  }, [signer, nftAddres])
  const nftDividendsContract = useMemo(() => {
    return getContract({ abi: nftDividendsABI, address: nftdividendsAddres, signer })
  }, [signer, nftdividendsAddres])

  useEffect(() => {
    if (nftPoolContract && account) {
      nftPoolContract
        .balanceOf(account)
        .then((result) => {
          const length = +result.toString()
          const array = []
          if (length && length > 0) {
            for (let i = 0; i <= length - 1; i++) {
              array.push({ image: '', name: '', symbol: '', tokenId: i })
              nftPoolContract
                .tokenOfOwnerByIndex(account, i)
                .then((number) => {
                  const tokendId = number.toString()
                  nftPoolContract
                    .tokenURI(tokendId)
                    .then((url) => {
                      http({
                        method: 'get',
                        url,
                        isEmpty: true,
                        dataType: 'json',
                      })
                        .then((data) => {
                          // const nextArtists = [
                          //   // Items before the insertion point:
                          //   ...array.slice(0, insertAt),
                          //   // New item:
                          //   { id: nextId++, name: name },
                          //   // Items after the insertion point:
                          //   ...artists.slice(insertAt)
                          // ];
                          const myNextList = [...array]
                          const artwork = myNextList.find((a) => a.tokenId === i)
                          artwork.image = data.image
                          artwork.name = data.name
                          artwork.symbol = data.symbol
                          setTimeout(() => {
                            setOptionsNftList(myNextList)
                          }, 1000)
                        })
                        .catch((err) => {
                          if (err && err.image) {
                            const myNextList = [...array]
                            const artwork = myNextList.find((a) => a.tokenId === i)
                            artwork.image = err.image
                            artwork.name = err.name
                            artwork.symbol = err.symbol
                            setTimeout(() => {
                              setOptionsNftList(myNextList)
                            }, 1000)
                          }
                        })
                    })
                    .catch((err) => {
                      console.log('tokenURI', err)
                    })
                })
                .catch((err) => {
                  console.log('tokenOfOwnerByIndex', err)
                })
            }
          }
          // console.log('setMyInvitedList', array)
          setTimeout(() => {
            setOptionsNftList(array)
          }, 5000)
        })
        .catch((err) => {
          console.log('setMyInvitedList', err)
        })
    }
  }, [nftPoolContract, account, setOptionsNftList])

  const getRemaining = useCallback(() => {
    nftDividendsContract
      .getRemainingDividends('0xc0F9d945107c33CeDB822e21Ba334A54534c40CB')
      .then((result) => {
        const valuue = +formatUnits(result.toString(), 18).toString()
        setRemaining(+valuue.toFixed(5))
      })
      .catch((err) => {
        console.log('getRemainingDividends', err)
      })
  }, [])
  useEffect(() => {
    if (nftDividendsContract && account) {
      getRemaining()
      nftDividendsContract
        .getTokenRewardInfoOfAddress(account)
        .then((result) => {
          console.log('result.length', result.length)
          const value = []
          for (let i = 0; i < result.length; i++) {
            value.push({ amount: 0, time: '' })
            const forma = formatUnits(result[i].amount.toString(), 18).toString()
            value[i].amount = formatNumMin(forma)
            value[i].time = formatTime(result[i].time.toString() * 1000)
            console.log('value', value)
          }
          setRewardInfo(value.reverse())
          console.log('getTokenRewardInfoOfAddress', result)
        })
        .catch((err) => {
          console.log('getTokenRewardInfoOfAddress', err)
        })
    }
  }, [nftDividendsContract, account, setOptionsNftList, getRemaining])
  const receiveClick = () => {
    nftDividendsContract
      .withdraw()
      .then((result) => {
        result
          .wait()
          .then((res: any) => {
            getRemaining()
            toastSuccess(t('Confirm'))
          })
          .catch((err: any) => {
            toastError(t('Cancel'))
          })
      })
      .catch((err) => {
        toastError(t('Cancel'))
      })
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
        {optionsNftList.map((items) => (
          <div className="nft_list" key={items.name}>
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
            <i>{remaining}</i>
            <em>USDT</em>
          </div>
        </div>
        <div className="button_wrap">
          <Button
            as="a"
            scale="md"
            disabled={!remaining}
            onClick={receiveClick}
            style={{ width: '100%', borderRadius: '0' }}
          >
            领取
          </Button>
        </div>
        {/* <span className="note">邀请奖励：1级返0.1%，2级返0.05%</span> */}
      </CommonItem>
      <CommonItem title="NFT分红领取记录" imgName="invite_record">
        <div className="invite_list_nft">
          <div className="list">
            <span>金额</span>
            <span>时间</span>
          </div>{' '}
          {rewardInfo.map((items, index) => (
            <div className="list" key={items?.amount}>
              {/* <span>{items}</span> */}
              <span>{items?.amount}</span>
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
