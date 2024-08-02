import React from 'react'
import styled, { useTheme } from 'styled-components'
import Link from 'next/link'
import { Button, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { Wrapper } from '../styleds'
import { BannerWrapper } from './styleds'
import CommonBox from '../CommonBox'

export default function BitBanner() {
  const { t } = useTranslation()
  const { isMobile, isTablet, isDesktop } = useMatchBreakpoints()
  return (
    <Wrapper>
      <BannerWrapper>
        <CommonBox>
          <div className="banner_cover_wrap">
            <div className="banner_cover">
              <div className="banner_img">
                <img src="/images/seai/banner.png" alt="" />
              </div>
              <div className="banner_text">
                <h2>SKAI</h2>
                <span>The game is changing, wealth is rising! </span>
                <Link href="/" passHref className="joinus">
                  JOIN US
                </Link>
              </div>
            </div>
          </div>
        </CommonBox>
      </BannerWrapper>
    </Wrapper>
  )
}
