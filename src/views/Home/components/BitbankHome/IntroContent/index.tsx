import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@pancakeswap/wagmi'
import { Text, Input, Button, useToast } from '@pancakeswap/uikit'
import { copyText } from '@pancakeswap/utils/copyText'
import Link from 'next/link'
import { CommonWrapper, getMedia } from '../styleds'
import CommonBox from './../CommonBox'
import CommonItem from './../CommonItem'

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
    .input_wrap {
      margin-bottom: 22px;
      input {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .button_wrap {
      width: 100%;
      padding: 0 20%;
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
  .invite_content {
    margin-top: 12px;
    span {
      font-size: ${getMedia(['14px', '16px', '18px'])};
      display: block;
      margin-bottom: 14px;
      em {
        color: rgba(2, 196, 244, 1);
        font-style: normal;
      }
    }
  }
`

export default function IntroContent() {
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
            <p>
              项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目
            </p>
          </div>
          <div className="swap_wrap">
            <div className="swap">
              <CommonBox>
                <Link href="/" passHref>
                  SWAP
                </Link>
              </CommonBox>
            </div>
            <div className="swap">
              <CommonBox>
                <Link href="/" passHref>
                  流动性
                </Link>
              </CommonBox>
            </div>
          </div>
        </div>
        <div className="con_wrap">
          <CommonItem title={'邀请'} imgName={'invite_icon'} recordHref={'/'} recordText={'邀请记录'}>
            <div className="invite_content">
              <span>
                已邀请人数：<em>1</em>
              </span>
            </div>
            <div className="input_wrap">
              <Input
                disabled
                style={{
                  borderRadius: '10px',
                  backgroundColor: '#384767',
                  borderColor: '#384767',
                  color: '#FFFFFF',
                  padding: '10px 16px',
                }}
                value={!account ? '' : inviteCode}
                placeholder="请链接钱包"
              />
            </div>
            <div className="button_wrap">
              <Button as="a" scale="md" onClick={handleClick} style={{ width: '100%', borderRadius: '0' }}>
                复制链接
              </Button>
            </div>
          </CommonItem>
          <CommonItem title={'合作伙伴'} imgName={'relate_icon'}>
            <img src="/images/seai/relate_img.png" alt="" />
          </CommonItem>
        </div>
      </CommonWrapper>
    </IntroWraper>
  )
}
