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
  width: ${getMedia(['300px', '328px', '392px'])};
  color: #fff;
  margin: 0 auto;
  padding-top: 54px;
  .swap_title_wrap {
    width: 100%;
    position: relative;
    text-align: center;
    margin-bottom: 23px;
    .swap_title {
      font-size: ${getMedia(['20px', '24px', '28px'])};
      margin-bottom: 14px;
    }
    p {
      font-size: 12px;
      line-height: 1.2;
    }
  }
`
export default function SwapTitle() {
  return (
    <Wrapper>
      {/* <div className="swap_title_wrap">
        <h2 className="swap_title">Get Fee Return for Swaps</h2>
        <p>
          Fee reimbursement of up to 50% in BTH tokens, 10% is credited to your BTH Boost. You can change the percentage.
        </p>
      </div> */}
    </Wrapper>
  )
}
