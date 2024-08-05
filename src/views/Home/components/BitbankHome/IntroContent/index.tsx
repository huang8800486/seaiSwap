import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@pancakeswap/wagmi'
import { Text, Input, Button, useToast } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { copyText } from '@pancakeswap/utils/copyText'
import Link from 'next/link'
import { CommonWrapper, getMedia } from '../styleds'
import CommonBox from '../CommonBox'
import CommonItem from '../CommonItem'
import CommonInvite from '../CommonInvite'
import CopyRight from '../CopyRight'

const IntroWraper = styled.div`
  width: 100%;
  position: relative;
  margin-top: ${getMedia(['18px', '28px', '38px'])};
  .intro_bg {
    position: absolute;
    z-index: 0;
    top: -40%;
    width: 100%;
    left: 0;
    img {
      width: 100%;
      display: block;
    }
  }
  .con_wrap {
    width: 100%;
    overflow: hidden;
    > div {
      width: ${getMedia(['100%', '48%', '48%'])};
      &:nth-of-type(1) {
        float: ${getMedia(['none', 'left', 'left'])};
      }
      &:nth-of-type(2) {
        float: ${getMedia(['none', 'right', 'right'])};
      }
    }
  }
  .intro_content {
    margin-bottom: 30px;
    position: relative;
    h2 {
      display: flex;
      justify-content: center;
      font-size: ${getMedia(['18px', '28px', '38px'])};
      margin-bottom: ${getMedia(['14px', '24px', '34px'])};
      img {
        width: ${getMedia(['18px', '28px', '38px'])};
        margin-right: ${getMedia(['8px', '18px', '28px'])};
      }
    }
    .text {
      color: #cccccc;
      font-size: ${getMedia(['13px', '17px', '23px'])};
      line-height: 1.5;
      text-align: justify;
    }
    .swap_wrap {
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      margin-top: ${getMedia(['24px', '34px', '44px'])};
      .swap {
        flex: 1;
        &:nth-of-type(1) {
          margin-right: ${getMedia(['8px', '14px', '20px'])};
          a {
            color: #fff;
            background: rgba(39, 51, 77, 0.7);
          }
        }
        &:nth-of-type(2) {
          margin-left: ${getMedia(['8px', '14px', '20px'])};
          a {
            color: #333333;
            background: #02c4f4;
          }
        }
        a {
          display: block;
          width: 100%;
          font-size: ${getMedia(['16px', '18px', '20px'])};
          padding: ${getMedia(['12px 0', '16px 0', '20px 0'])};
          text-align: center;
          font-weight: bold;
        }
      }
    }
  }

  .footer_wrap {
    // width: 100%;
    // display: flex;
    // justify-content: center;
    text-align: center;
    overflow: hidden;
    position: relative;
    padding: ${getMedia(['20px 0 62px', '60px 0 62px', '80px 0 62px'])};
    margin-bottom: 90px;
    .footer_bg {
      position: absolute;
      top: -62px;
      width: 100%;
      left: 0;
    }
  }
`

export default function IntroContent() {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const [inviteCode, setInviteCode] = useState('')
  useEffect(() => {
    setInviteCode(`${window.location.protocol}//${window.location.host}?inviteCode=${account}`)
  }, [account])
  const { toastError, toastSuccess } = useToast()
  const handleClick = () => {
    copyText(inviteCode, () => {
      toastSuccess('复制成功')
    })
  }
  return (
    <IntroWraper>
      <CommonWrapper>
        <div className="intro_bg">
          <img src="/images/seai/intro_bg.png" alt="" />
        </div>
        <div className="intro_content">
          <h2>
            <img src="/images/icons/intro.png" alt="" />
            <span>项目介绍</span>
          </h2>
          <div className="text">
            <p>SKAI黑洞币本位挖矿鼻祖全力打造生态，全新NFT卡牌暴力分红，Swap生态分红。</p>
          </div>
          <div className="swap_wrap">
            <div className="swap">
              <CommonBox>
                <Link href="/swap" passHref>
                  SWAP
                </Link>
              </CommonBox>
            </div>
            <div className="swap">
              <CommonBox>
                <Link href="/liquidity" passHref>
                  流动性
                </Link>
              </CommonBox>
            </div>
          </div>
        </div>
        <div className="con_wrap">
          <CommonInvite />
          <CommonItem title="合作伙伴" imgName="relate_icon">
            <img src="/images/seai/relate_img.png" alt="" />
          </CommonItem>
        </div>
      </CommonWrapper>
      <div className="footer_wrap">
        <img className="footer_bg" src="/images/seai/footer_bg.png" alt="" />
        <CopyRight />
      </div>
    </IntroWraper>
  )
}
