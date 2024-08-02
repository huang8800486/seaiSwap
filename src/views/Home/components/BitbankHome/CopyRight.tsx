import styled, { css } from 'styled-components'
import { useMatchBreakpoints } from '@pancakeswap/uikit'

export const getMedia = (value: string[]) => () => {
  const { isMobile, isTablet } = useMatchBreakpoints()
  return isMobile ? value[0] : isTablet ? value[1] : value[2]
}
export const CommonContent = styled.div`
  .realtive_box_seai {
    .relate_box {
      display: flex;
      justify-content: center;
      .rela {
        margin: 0 7px;
        width: 26px;
        height: 26px;
        img {
          width: 100%;
          display: block;
        }
      }
    }
    span {
      font-size: ${getMedia(['16px', '18px', '20px'])};
      display: block;
      margin: ${getMedia(['16px 0 4px', '16px 0 10px;', '16px 0 14px;'])};
    }
    p {
      color: #999999;
      font-size: ${getMedia(['12px', '14px', '16px'])};
    }
  }
`
const CopyRight: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <CommonContent>
        <div className="realtive_box_seai">
          <div className="relate_box">
            <a href="/" className="rela" target="_blank" rel="noreferrer">
              <img src="/images/icons/facebook.png" alt="" />
            </a>
            <a href="https://x.com/SEAI_ai66" className="rela" target="_blank" rel="noreferrer">
              <img src="/images/icons/twite.png" alt="" />
            </a>
            <a href="https://t.me/SEAI_ai" className="rela" target="_blank" rel="noreferrer">
              <img src="/images/icons/telegram.png" alt="" />
            </a>
          </div>
          <span>SEAI TOKEN @2024</span>
          <p>Based on Binance Smart Chain</p>
        </div>
      </CommonContent>
    </>
  )
}

export default CopyRight
