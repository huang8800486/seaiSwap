import React from 'react'
import { useMatchBreakpoints, Link } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import styled, { css } from 'styled-components'

export const getMedia = (value: string[]) => () => {
  const { isMobile, isTablet } = useMatchBreakpoints()
  return isMobile ? value[0] : isTablet ? value[1] : value[2]
}
export const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #020b15;
  color: #fff;
  will-change: top;
  max-width: 436px;
  right: 0;
  margin: 0 auto;
  z-index: 10;
  .swap_nav_wrap_box {
    width: 100%;
    padding-bottom: env(safe-area-inset-bottom);
    html[data-useragent*='TokenPocket_iOS'] & {
      padding-bottom: 90px;
    }
  }
  .swap_nav_wrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px 30px;
    .swap_nav {
      a {
        color: #fff;
        flex-wrap: wrap;
        justify-content: center;
        font-size: 14px;
        img {
          width: 20px;
        }
        p {
          width: 100%;
          display: block;
          text-align: center;
        }
      }
    }
  }
`
export default function SwapNav() {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <div className="swap_nav_wrap_box">
        <div className="swap_nav_wrap">
          <div className="swap_nav">
            <Link href="/home">
              <h3>
                <img src="/images/icons/home.png" alt="" />
              </h3>
              <p>{t('Home')}</p>
            </Link>
          </div>
          <div className="swap_nav">
            <Link href="/liquidity">
              <h3>
                <img src="/images/icons/liquidity.png" alt="" />
              </h3>
              <p>{t('Liquidity')}</p>
            </Link>
          </div>
          <div className="swap_nav">
            <Link href="/nft">
              <h3>
                <img src="/images/icons/nft.png" alt="" />
              </h3>
              <p>{t('NFT')}</p>
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
