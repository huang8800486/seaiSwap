import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useIsomorphicEffect, useMatchBreakpoints } from '@pancakeswap/uikit'
import SwiperCore, { Autoplay } from 'swiper'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import Link from 'next/link'
import { useTranslation } from '@pancakeswap/localization'
import { getMedia } from '../styleds'

const MarketWrapper = styled.div`
  position: relative;
  color: #fff;
`
const StyledSwiper = styled(Swiper)`
  position: relative;
  .swiper-slide {
    opacity: 1 !important;
    overflow: hidden;
  }
`

export default function OurBenefits() {
  const [swiperRef, setSwiperRef] = useState<SwiperCore>(null)
  const [loop, setLoop] = useState<boolean>(true)
  const [currentSlidesPerView, setCurrentSlidesPerView] = useState<number>(1)
  const [currentSlidesPerGroup, setCurrentSlidesPerGroup] = useState<number>(5)
  const [currentSpaceBetween, setCurrentSpaceBetween] = useState<number>(10)
  const { isMobile, isTablet, isDesktop } = useMatchBreakpoints()
  useEffect(() => {
    if (isMobile) {
      setCurrentSlidesPerView(3)
      setCurrentSlidesPerGroup(3)
      setCurrentSpaceBetween(10)
    }
    if (isTablet) {
      setCurrentSlidesPerView(4)
      setCurrentSlidesPerGroup(4)
      setCurrentSpaceBetween(15)
    }
    if (isDesktop) {
      setCurrentSlidesPerView(5)
      setCurrentSlidesPerGroup(5)
      setCurrentSpaceBetween(20)
    }
    return undefined
  }, [isMobile, isTablet, isDesktop])
  const MarketList = [
    {
      image: '/images/bitbank/usdt.png',
      title: 'USDT',
      name: '泰达币',
    },
    {
      image: '/images/bitbank/usdt.png',
      title: 'USDT',
      name: '泰达币',
    },
    {
      image: '/images/bitbank/usdt.png',
      title: 'USDT',
      name: '泰达币',
    },
    {
      image: '/images/bitbank/usdt.png',
      title: 'USDT',
      name: '泰达币',
    },
    {
      image: '/images/bitbank/usdt.png',
      title: 'USDT',
      name: '泰达币',
    },
    {
      image: '/images/bitbank/usdt.png',
      title: 'USDT',
      name: '泰达币',
    },
    {
      image: '/images/bitbank/usdt.png',
      title: 'USDT',
      name: '泰达币',
    },
    {
      image: '/images/bitbank/usdt.png',
      title: 'USDT',
      name: '泰达币',
    },
    {
      image: '/images/bitbank/usdt.png',
      title: 'USDT',
      name: '泰达币',
    },
  ]
  useIsomorphicEffect(() => {
    if (swiperRef) {
      if (MarketList.length > 1 && !swiperRef.autoplay?.running) {
        swiperRef.autoplay?.start()
      } else if (MarketList.length <= 1 && swiperRef.autoplay?.running) {
        swiperRef.autoplay?.stop()
      }
    }
  }, [MarketList, swiperRef])
  return (
    <>
      <StyledSwiper
        onSwiper={setSwiperRef}
        modules={[Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        slidesPerView={currentSlidesPerView}
        slidesPerGroup={currentSlidesPerGroup}
        spaceBetween={currentSpaceBetween}
        grabCursor
        speed={1000}
        loop={loop}
        pagination={{ clickable: true }}
      >
        {MarketList.map((item, index) => {
          const childKey = `item${index}`
          return (
            <SwiperSlide key={childKey}>
              <div className="market_item">
                <div className="market_icon">
                  <img src="/images/bitbank/usdt.png" alt="" />
                </div>
                <div className="market_text">
                  <span>USDT</span>
                  <p>泰达币</p>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </StyledSwiper>
    </>
  )
}
