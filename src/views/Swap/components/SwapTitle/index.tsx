import React from 'react'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import styled, { css } from 'styled-components'

export const getMedia = (value: string[]) => () => {
  const { isMobile, isTablet } = useMatchBreakpoints()
  return isMobile ? value[0] : isTablet ? value[1] : value[2]
}
export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  color: #fff;
  margin: 0 auto;
  padding: ${getMedia(['16px 16px 10px 16px', '0 0 16px 0 ', '0 0 16px 0'])};
  max-width: 436px;
  .swap_title {
    width: 100%;
    position: relative;
    padding-top: 40.29%;
    overflow: hidden;
    img {
      width: 100%;
      display: block;
      position: absolute;
      left: 0;
      top: 0;
    }
    .text_wrap {
      width: 100%;
      height: 100%;
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      .text {
        width: 100%;
        text-align: center;
        padding: 0 9px;
        font-size: 12px;
      }
      h2 {
        position: relative;
        color: #e70d1f;
        font-size: 21px;
        text-align: center;
        margin-bottom: 17px;
        em {
          position: relative;
          padding: 0 24px;
          font-style: normal;
          i {
            position: absolute;
            top: 50%;
            transform: translate3d(0, -50%, 0);
            height: 19px;
            &:before {
              position: absolute;
              top: 50%;
              transform: translate3d(0, -50%, 0);
              content: '';
              width: 5px;
              height: 19px;
              background: #f8bc42;
              box-shadow: 0rem 0rem 5px 0rem #f8bc42;
              border-radius: 2px;
            }
            &:after {
              position: absolute;
              bottom: 0;
              content: '';
              width: 5px;
              height: 10px;
              background: #f8bc42;
              box-shadow: 0rem 0rem 5px 0rem #f8bc42;
              border-radius: 2px;
            }
          }
          .left {
            left: 0;
            &:before {
              left: 0;
            }
            &:after {
              left: 7px;
            }
          }
          .right {
            right: 0;
            &:before {
              right: 0;
            }
            &:after {
              right: 7px;
            }
          }
        }
      }
    }
  }
`
export default function SwapTitle() {
  return (
    <Wrapper>
      <div className="swap_title_wrap">
        <div className="swap_title">
          <img src="/images/seai/fen.png" className="fen" alt="" />
          <div className="text_wrap">
            <div className="text">
              <h2>
                <em>
                  <i className="left" />
                  风险提示
                  <i className="right" />
                </em>
              </h2>
              <span>警惕陌生链接｜不给陌生地址转账｜管理不会私聊任何人</span>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
