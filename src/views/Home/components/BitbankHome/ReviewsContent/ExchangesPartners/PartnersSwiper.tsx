import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
import Image from 'next/image'
import { useIsomorphicEffect, useMatchBreakpoints, Button } from '@pancakeswap/uikit'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { getMedia } from '../../styleds'

const SwiperWrap = styled.div`
  position: relative;
  width: 100%;
`
const StyledSwiper = styled(Swiper)`
  position: relative;
  width: 100%;
  &:hover {
    .swiper-button-prev,
    .swiper-button-next {
      opacity: 0.8;
    }
  }
  .swiper-button-prev {
    left: 0;
  }
  .swiper-button-next {
    right: 0;
  }
  .swiper-button-prev,
  .swiper-button-next {
    opacity: 0;
    display: ${getMedia(['none', 'block', 'block'])};
    cursor: pointer;
    font-family: inherit;
    font-weight: 600;
    line-height: 1;
    outline: 0px;
    transition: background-color 0.3s ease-in-out 0s, opacity 0.3s ease-in-out 0s, color 0.3s ease-in-out 0s;
    white-space: nowrap;
    width: 32px;
    height: 32px;
    padding: 0px 12px;
    font-size: 12px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.primary};
    color: rgb(255, 255, 255);
    transition: all 0.3s ease;
    &:hover {
      opacity: 1;
    }
    &:after {
      font-size: 12px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
  }
  .partner_item {
    .imgs {
      display: block;
      width: 100%;
      max-width: 160px;
      height: 46px;
      img {
        width: 100%;
        display: block;
      }
    }
    .gray_img {
      display: block;
    }
    .active_img {
      display: none;
    }
    &:hover {
      .gray_img {
        display: none;
      }
      .active_img {
        display: block;
      }
    }
  }
`
interface Props {
  swiperList: any[]
}
const PartnersSwiper: React.FC<React.PropsWithChildren<Props>> = ({ swiperList }) => {
  const [swiperRef, setSwiperRef] = useState<SwiperCore>(null)
  const [currentSlidesPerView, setCurrentSlidesPerView] = useState<number>(1)
  const [currentSpaceBetween, setCurrentSpaceBetween] = useState<number>(10)
  const { isMobile, isTablet, isDesktop } = useMatchBreakpoints()
  useEffect(() => {
    if (isMobile) {
      setCurrentSlidesPerView(3)
      setCurrentSpaceBetween(10)
    }
    if (isTablet) {
      setCurrentSlidesPerView(4)
      setCurrentSpaceBetween(20)
    }
    if (isDesktop) {
      setCurrentSlidesPerView(6)
      setCurrentSpaceBetween(30)
    }
    return undefined
  }, [isMobile, isTablet, isDesktop])
  useIsomorphicEffect(() => {
    if (swiperRef) {
      if (swiperList.length > 1 && !swiperRef.autoplay?.running) {
        swiperRef.autoplay?.start()
      } else if (swiperList.length <= 1 && swiperRef.autoplay?.running) {
        swiperRef.autoplay?.stop()
      }
    }
  }, [swiperList, swiperRef])
  return (
    <SwiperWrap>
      <StyledSwiper
        onSwiper={setSwiperRef}
        modules={[Autoplay]}
        autoplay={{
          delay: 100,
          disableOnInteraction: false,
        }}
        slidesPerView={currentSlidesPerView}
        spaceBetween={currentSpaceBetween}
        grabCursor
        speed={2000}
        loop
      >
        {swiperList.map((item, index) => {
          const childKey = `Banner${index}`
          return (
            <SwiperSlide key={childKey}>
              <div className="partner_item">
                <a href="https://nft.webxbank.pro" target="_blank" rel="noreferrer">
                  <div className="gray_img imgs">
                    <Image src={item.image} alt="item" width={160} height={40} />
                  </div>
                  <div className="active_img imgs">
                    <Image src={item.activeImage} alt="item" width={160} height={40} />
                  </div>
                </a>
              </div>
            </SwiperSlide>
          )
        })}
      </StyledSwiper>
    </SwiperWrap>
  )
}
export default PartnersSwiper
