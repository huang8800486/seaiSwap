import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import SwiperCore, { Autoplay, EffectFade, Pagination } from 'swiper'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import Link from 'next/link'
import { useTranslation } from '@pancakeswap/localization'
import { OurBenefitsWrapper, TotalWrapper } from './styleds'
import { getMedia } from '../../styleds'

const FarmWrapper = styled.div`
  position: relative;
  color: #fff;
`
const StyledSwiper = styled(Swiper)`
  position: relative;
  width: 100%;
  border-radius: 16px;
  padding-bottom: 30px;
  .swiper-slide {
    opacity: 1 !important;
    border-radius: 16px;
    overflow: hidden;
    img {
      margin: 0 auto;
      display: block;
    }
  }
  .our_item {
    width: 100%;
    text-align: center;
    font-size: 12px;
    h3 {
      margin: 17px 0 7px;
      font-size: 16px;
    }
    p {
      color: #878787;
      line-height: 16px;
    }
  }
  .swiper-pagination {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    bottom: 0;
    z-index: 10;
    display: ${getMedia(['block', 'block', 'none'])};
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

export default function OurBenefits() {
  const [swiperRef, setSwiperRef] = useState<SwiperCore>(null)
  const [loop, setLoop] = useState<boolean>(false)
  const [currentSlidesPerView, setCurrentSlidesPerView] = useState<number>(1)
  const [currentSpaceBetween, setCurrentSpaceBetween] = useState<number>(10)
  const { isMobile, isTablet, isDesktop } = useMatchBreakpoints()
  useEffect(() => {
    if (isMobile) {
      setLoop(true)
      setCurrentSlidesPerView(1)
      setCurrentSpaceBetween(10)
    }
    if (isTablet) {
      setLoop(true)
      setCurrentSlidesPerView(2)
      setCurrentSpaceBetween(15)
    }
    if (isDesktop) {
      setLoop(false)
      setCurrentSlidesPerView(4)
      setCurrentSpaceBetween(20)
    }
    return undefined
  }, [isMobile, isTablet, isDesktop])
  const newBannerList = [
    {
      image: '/images/bitbank/our_01.png',
      title: 'High LP Reward',
      text: 'Be a liquidity provider and earn LP rewards from trading fees. 75% of the commission from each trade is allocated to stimulate liquidity providers.',
    },
    {
      image: '/images/bitbank/our_02.png',
      title: 'The Lowest Exchange Fee',
      text: 'Safely buy and sell your cryptocurrency with the lowest exchange fee in the DeFi space.',
    },
    {
      image: '/images/bitbank/our_03.png',
      title: 'Trade Fee Reimbursement',
      text: 'Make a swap on WebxBank at no cost. Up to 50% of the trading fee returned in BTH tokens.',
    },
    {
      image: '/images/bitbank/our_04.png',
      title: 'Multi-type Referral Program',
      text: 'Invite your friends & earn up to 20% commission reward every time they make a swap on WebxBank and gain crypto in Farms, Launchpools, Lottery.',
    },
  ]
  const TotalList = [
    {
      image: '/images/bitbank/nft_marketplace_01.png',
      title: 'Total Volume',
      value: '$159.31 M',
    },
    {
      image: '/images/bitbank/nft_marketplace_02.png',
      title: '24H Volume',
      value: '$159.31 M',
    },
    {
      image: '/images/bitbank/nft_marketplace_03.png',
      title: 'Active users',
      value: '$159.31 M',
    },
    {
      image: '/images/bitbank/nft_marketplace_04.png',
      title: 'Trade Fee Saved',
      value: '$159.31 M',
    },
    {
      image: '/images/bitbank/nft_marketplace_05.png',
      title: 'LP Earned',
      value: '$159.31 M',
    },
  ]
  return (
    <>
      <OurBenefitsWrapper>
        <h2>Our Benefits</h2>
        <StyledSwiper
          onSwiper={setSwiperRef}
          modules={[Pagination]}
          slidesPerView={currentSlidesPerView}
          spaceBetween={currentSpaceBetween}
          grabCursor
          speed={1000}
          loop={loop}
          pagination={{ clickable: true }}
        >
          {newBannerList.map((item, index) => {
            const childKey = `item${index}`
            return (
              <SwiperSlide key={childKey}>
                {/* {item} */}
                {/* <img src={competitionImage} alt="" /> */}
                <div className="our_item">
                  <Image src={item.image} alt="item" width={86} height={86} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </SwiperSlide>
            )
          })}
        </StyledSwiper>
      </OurBenefitsWrapper>
      <TotalWrapper>
        <div className="stutas_list_wrap">
          {TotalList.map((item, index) => {
            const childKey = `item${index}`
            return (
              <div className="status_item_wrap" key={childKey}>
                <div className="status_item">
                  <h3>{item.title}</h3>
                  <span>{item.value}</span>
                  <Image src={item.image} alt="item" width={86} height={86} />
                </div>
              </div>
            )
          })}
        </div>
      </TotalWrapper>
    </>
  )
}
