import styled from 'styled-components'
import { useMatchBreakpoints } from '@pancakeswap/uikit'

export const getMedia = (value: string[]) => () => {
  const { isMobile, isTablet } = useMatchBreakpoints()
  return isMobile ? value[0] : isTablet ? value[1] : value[2]
}

export const BodyWrap = styled.div`
  max-width: 1000px;
  padding: ${getMedia(['10px 10px', '30px 10px', '50px 10px'])};
  min-height: 100vh;
  margin: 0 auto;
  color: #fff;
  position: relative;
  .nft_list_wrap {
    width: 100%;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    max-height: ${getMedia(['500px', '500px', '400px'])};
    overflow-y: auto;
    .nft_list {
      width: ${getMedia(['50%', '50%', '25%'])};
      position: relative;
      padding: 0 10px;
      margin-bottom: ${getMedia(['20px', '30px', '40px'])};
      > div {
        margin-bottom: ${getMedia(['20px', '30px', '40px'])};
      }
      .nft_img {
        width: 100%;
        position: relative;
        background: #27334d;
        padding-top: 122.69%;
        img {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
      }
      h3 {
        width: 100%;
        position: relative;
        display: block;
        text-align: center;
        // margin-top: ${getMedia(['10px', '20px', '30px'])};
      }
    }
  }
  .nft_pagination_wrap {
    width: 100%;
    position: relative;
    padding: 40px 0;
    .nft_page {
      width: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-size: 24px;
        color: #fff;
        width: 72px;
        text-align: center;
      }
      button {
        background: none;
        border: 1px solid #fff;
        border-radius: 8px;
        color: #fff;
        font-weight: noraml;
      }
    }
  }
  .invite_list_nft {
    width: 100%;
    position: relative;
    min-height: 70px;
    max-height: 230px;
    overflow-y: auto;
    .list {
      width: 100%;
      padding: ${getMedia(['6px 0', '8px 0', '10px 0'])};
      overflow: hidden;
      span {
        float: left;
        width: 50%;
        font-size: ${getMedia(['14px', '16px', '18px'])};
        &:last-child {
          text-align: right;
        }
      }
    }
  }
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
        margin-left: 4px;
      }
    }
  }
  .button_wrap {
    width: 100%;
    padding: 0 20%;
    text-align: center;
  }
`
