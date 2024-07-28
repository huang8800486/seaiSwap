import styled from 'styled-components'
import { Flex, Box } from '@pancakeswap/uikit'
import { useMatchBreakpoints } from '@pancakeswap/uikit'

export const getMedia = (value: string[]) => () => {
  const { isMobile, isTablet } = useMatchBreakpoints()
  return isMobile ? value[0] : isTablet ? value[1] : value[2]
}

export const BodyWrap = styled.div`
  max-width: 1000px;
  padding: ${getMedia(['10px 20px', '30px 20px', '50px 20px'])};
  min-height: 100vh;
  margin: 0 auto;
  color: #fff;
`
export const InviterdWrap = styled.div`
  width: 100%;
  position: relative;
  .receive_content {
    width: 100%;
    position: relative;
    padding: 29px 0 33px;
    text-align: center;
    .receive_text {
      color: #f8bc42;
      i {
        font-style: normal;
        font-weight: bold;
        font-size: 21px;
      }
      em {
        font-style: normal;
        font-size: 13px;
      }
    }
  }
  .button_wrap {
    width: 100%;
    padding: 0 20%;
    text-align: center;
  }
  .note {
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: #cccccc;
    display: block;
    margin-top: 10px;
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
  .invite_list {
    width: 100%;
    position: relative;
    min-height: 70px;
    .list {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: ${getMedia(['6px 0', '8px 0', '10px 0'])};
      span {
        font-size: ${getMedia(['14px', '16px', '18px'])};
        &:first-child {
          color: #979797;
        }
      }
    }
  }
`
export const InviterdTitle = styled.div``
