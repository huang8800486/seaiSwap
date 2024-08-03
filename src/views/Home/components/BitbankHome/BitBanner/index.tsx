import React from 'react'
import styled, { useTheme } from 'styled-components'
import Link from 'next/link'
import SwiperCore, { Autoplay, EffectFade, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Button, Image, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Wrapper } from '../styleds'
import { BannerWrapper } from './styleds'
import CommonBox from '../CommonBox'

const StyledSwiper = styled(Swiper)`
  position: relative;
  width: 100%;
  border-radius: 12px;
`
export default function BitBanner() {
  const { t } = useTranslation()
  const { isMobile, isTablet, isDesktop } = useMatchBreakpoints()
  const ReviewsList = [
    {
      image: '/images/seai/banner.png',
    },
    {
      image: '/images/seai/banner_02.png',
    },
    {
      image: '/images/seai/banner_03.png',
    },
    {
      image: '/images/seai/banner_04.jpg',
    },
    {
      image: '/images/seai/banner_05.jpg',
    },
  ]
  return (
    <Wrapper>
      <BannerWrapper>
        <CommonBox>
          <div className="banner_cover_wrap">
            <div className="banner_cover">
              <div className="banner_img">
                {/* <img src="/images/seai/banner.png" alt="" /> */}
                <StyledSwiper
                  modules={[Autoplay]}
                  navigation={{
                    prevEl: '.custom-button-prev',
                    nextEl: '.custom-button-next',
                  }}
                  grabCursor
                  autoplay={{ delay: 3000, pauseOnMouseEnter: true, disableOnInteraction: false }}
                  speed={1000}
                  loop
                >
                  {ReviewsList.map((item, index) => {
                    const childKey = `Banner${index}`
                    return (
                      <SwiperSlide key={childKey}>
                        <div className="reviews_item">
                          {/* <Image src={item.image} alt="item" width={"100%"} height={40} /> */}
                          <img src={item.image} alt="" />
                          {/* <Image wi src={item.image} alt="banner" placeholder="blur" /> */}
                        </div>
                        {index < 3 && (
                          <div className="banner_text">
                            <h2>SKAI</h2>
                            <span>The game is changing, wealth is rising! </span>
                            <Link href="/" passHref className="joinus">
                              JOIN US
                            </Link>
                          </div>
                        )}
                      </SwiperSlide>
                    )
                  })}
                </StyledSwiper>
              </div>
            </div>
          </div>
        </CommonBox>
      </BannerWrapper>
    </Wrapper>
  )
}
