import { useState, useEffect } from 'react'
import styled from 'styled-components'
import SwiperCore, { Autoplay, EffectFade, Pagination } from 'swiper'
import Image from 'next/image'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { getMedia } from '../../styleds'
import banner01 from '../../../../../../../public/images/bitbank/swi_01.png'
import banner02 from '../../../../../../../public/images/bitbank/swi_02.png'
import banner03 from '../../../../../../../public/images/bitbank/swi_03.png'

const FarmWrapper = styled.div`
  position: relative;
  color: #fff;
`
const StyledSwiper = styled(Swiper)`
  position: relative;
  width: 100%;
  border-radius: 16px;
  padding-bottom: 20px;
  .swiper-slide {
    opacity: 1 !important;
    border-radius: 16px;
    overflow: hidden;
  }
  .swiper-pagination {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    bottom: 0;
    z-index: 10;
  }
  .swiper-pagination-bullet {
    background-color: ${({ theme }) => theme.colors.bitColor};
    border-radius: 0px;
    width: 4px;
    height: 4px;
    border: 0px;
    box-shadow: none;
    border-radius: 50%;
    padding: 0px;
    margin-right: 8px;
    cursor: pointer;
    display: inline-block;
    &.swiper-pagination-bullet-active {
      background: ${({ theme }) => theme.colors.primary};
    }
  }
`

export default function SwiperList() {
  const [swiperRef, setSwiperRef] = useState<SwiperCore>(null)
  const [currentSlidesPerView, setCurrentSlidesPerView] = useState<number>(1)
  const [currentSpaceBetween, setCurrentSpaceBetween] = useState<number>(10)
  const { isMobile, isTablet, isDesktop } = useMatchBreakpoints()
  useEffect(() => {
    if (isMobile) {
      setCurrentSlidesPerView(1.05)
      setCurrentSpaceBetween(10)
    }
    if (isTablet) {
      setCurrentSlidesPerView(2)
      setCurrentSpaceBetween(15)
    }
    if (isDesktop) {
      setCurrentSlidesPerView(3)
      setCurrentSpaceBetween(20)
    }
    return undefined
  }, [isMobile, isTablet, isDesktop])
  const newBannerList = [banner01, banner02, banner03]
  return (
    <FarmWrapper>
      <StyledSwiper
        onSwiper={setSwiperRef}
        modules={[Pagination]}
        slidesPerView={currentSlidesPerView}
        spaceBetween={currentSpaceBetween}
        grabCursor
        speed={1000}
        loop
        pagination={{ clickable: true }}
      >
        {newBannerList.map((banner, index) => {
          const childKey = `Banner${index}`
          return (
            <SwiperSlide key={childKey}>
              {/* {banner} */}
              {/* <img src={competitionImage} alt="" /> */}
              <Image src={banner} alt="banner" placeholder="blur" />
            </SwiperSlide>
          )
        })}
      </StyledSwiper>
    </FarmWrapper>
  )
}
