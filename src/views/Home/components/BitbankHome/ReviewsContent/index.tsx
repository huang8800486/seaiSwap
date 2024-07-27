import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
import Image from 'next/image'
import { useMatchBreakpoints, Button } from '@pancakeswap/uikit'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { getMedia } from '../styleds'
import RightSvg from './RightSvg'
import PrevSvg from './PrevSvg'
import PlaySvg from './PlaySvg'
import ExchangesPartners from './ExchangesPartners'
import YoutubeVideo from './YoutubeVideo'

const ReviewsContainer = styled.div`
  width: 100%;
  position: relative;
  background: #252525;
  font-family: Arial-Regular, Arial;
  color: #fff;
`
const ReviewsWrapper = styled.div`
  width: 100%;
  position: relative;
  max-width: 1132px;
  padding: 43px 16px 18px;
  margin: 0 auto;
`
const ReviewsSwiperWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`
const ReviewsTitle = styled.div`
  width: ${getMedia(['100%', '40%', '40%'])};
  position: relative;
  margin-bottom: 17px;
  h2 {
    font-size: ${getMedia(['24px', '28px', '32px'])};
    margin-bottom: 16px;
    line-height: 40px;
  }
  p {
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 20px;
  }
  .custom-button-wrap {
    width: 100%;
    display: flex;
    .custom-button {
      align-items: center;
      border: 0px;
      cursor: pointer;
      display: inline-flex;
      font-family: inherit;
      font-weight: 600;
      justify-content: center;
      line-height: 1;
      opacity: 1;
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
      margin-right: 8px;
      position: relative;
      opacity: 0.8;
      transition: all 0.3s ease;
      &:hover {
        opacity: 1;
      }
      svg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
      }
      &.custom-button-prev {
        svg {
          transform: translate3d(-50%, -50%, 0) rotate(-180deg);
        }
      }
    }
  }
`

const ReviewsSwiper = styled.div`
  width: ${getMedia(['100%', '55%', '55%'])};
  position: relative;
  &:before {
    display: ${getMedia(['none', 'block', 'block'])};
    content: '';
    background: linear-gradient(
      270.12deg,
      rgb(37, 37, 37) 0.11%,
      rgba(37, 37, 37, 0.74) 49.54%,
      rgba(37, 37, 37, 0) 99.89%
    );
    width: 76px;
    height: 100%;
    z-index: 2;
    position: absolute;
    top: 0px;
    right: 0px;
  }
`
const StyledSwiper = styled(Swiper)`
  position: relative;
  width: 100%;
  border-radius: 12px;
  .reviews_item {
    padding: 18px 24px 24px;
    background: linear-gradient(90deg, rgba(245, 166, 3, 0.31) 0%, rgba(245, 166, 3, 0.76) 100%);
    border-radius: 12px;
    height: 200px;
    font-size: 12px;
    position: relative;
    span {
      padding: 16px 0 12px;
      line-height: 16px;
    }
    .ast {
      color: #f5a603;
      display: flex;
      align-items: center;
      position: absolute;
      left: 24px;
      bottom: 24px;
      font-size: 16px;
      svg {
        margin-left: 6px;
      }
    }
  }
`
const InvestorTitle = styled.div`
  width: ${getMedia(['100%', '100%', '61%'])};
  padding: ${getMedia(['32px 24px', '32px 24px', '32px 64px;'])};
  h2 {
    font-size: ${getMedia(['24px', '28px', '32px'])};
    line-height: 40px;
    font-weight: 600;
    white-space: normal;
    margin-bottom: 16px;
  }
  p {
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 16px;
  }
  a {
    padding-right: 40px;
    padding-left: 40px;
    width: ${getMedia(['100%', 'auto', 'auto'])};
    &.binanceAcademy {
      background: #505050;
      img {
        height: 36px;
        display: block;
      }
    }
  }
`
const ReviewsInvestor = styled.div`
  display: flex;
  flex-direction: ${getMedia(['column-reverse', 'column-reverse', 'row'])};
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  background: linear-gradient(270deg, rgba(245, 166, 3, 0.31) 0%, rgba(245, 166, 3, 0.76) 100%);
  border-radius: 24px;
  margin-top: 70px;
  margin-bottom: 56px;
  .binanceImg {
    width: ${getMedia(['100%', '100%', '39%'])};
    max-width: 430px;
    height: auto;
  }
`
const VideoButton = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 64px;
  height: 64px;
  border-radius: 50px;
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: rgba(9, 12, 14, 0.24) 0px 6px 16px;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    transition: all 0.3s ease;
  }
  &:hover {
    width: 72px;
    height: 72px;
    box-shadow: none;
    svg {
      transform: scale(1.2);
    }
  }
`
const ReviewsBitwap = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 56px;
  .bitswap_content {
    width: 100%;
    position: relative;
    border: 1px solid #575757;
    border-radius: 24px;
    display: flex;
    justify-content: space-between;
    flex-direction: ${getMedia(['column-reverse', 'column-reverse', 'row'])};
    flex-wrap: wrap;
    .bitswap_title {
      width: ${getMedia(['100%', '100%', '58%'])};
    }
    .bitswap_video {
      width: ${getMedia(['100%', '100%', '42%'])};
      padding: ${getMedia(['24px', '28px', '32px 32px 32px 0 '])};
      cursor: pointer;
      .video_pad {
        width: 100%;
        padding-top: ${getMedia(['60%', '70%', '56%'])};
        border-radius: 20px;
        background: #fff;
        position: relative;
        overflow: hidden;
        iframe {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0%;
          top: 0;
        }
      }
    }
  }
`
const VideoWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  .you_video {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 0 10px;
    .you_pad {
      width: 100%;
      padding-top: 57%;
      position: relative;
      overflow: hidden;
      .you_text {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        > div {
          width: 100%;
          height: 100%;
          iframe {
            width: 100%;
            height: 100%;
          }
        }
        iframe {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
`
const YoutubeTeleport = ({ isOpen, onClose }) => {
  if (!isOpen) return null
  return ReactDOM.createPortal(
    <VideoWrapper onClick={onClose}>
      <div className="you_video">
        <div className="you_pad">
          <div className={['you_text', isOpen ? 'active' : ''].join(' ')}>
            <YoutubeVideo opts={{ videoId: 'mMeH3mmiefc' }} />
          </div>
        </div>
      </div>
    </VideoWrapper>,
    document.body,
  )
}

export default function ReviewsContent() {
  const [swiperRef, setSwiperRef] = useState<SwiperCore>(null)
  const [currentSlidesPerView, setCurrentSlidesPerView] = useState<number>(1)
  const [currentSpaceBetween, setCurrentSpaceBetween] = useState<number>(10)
  const { isMobile, isTablet, isDesktop } = useMatchBreakpoints()
  const ReviewsList = [
    {
      image: '/images/bitbank/bsc.png',
      text: 'Binance Labs Announces Strategic Investment in WebxBank. ',
    },
    {
      image: '/images/bitbank/BSCNews.png',
      text: 'WebxBank passes the 1 billion transactions milestone and is listed amongst the top DEXs on BSC in a mere few months after its launch. ',
    },
  ]
  useEffect(() => {
    if (isMobile) {
      setCurrentSlidesPerView(1.05)
      setCurrentSpaceBetween(10)
    }
    if (isTablet) {
      setCurrentSlidesPerView(2.2)
      setCurrentSpaceBetween(20)
    }
    if (isDesktop) {
      setCurrentSlidesPerView(2.3)
      setCurrentSpaceBetween(30)
    }
    return undefined
  }, [isMobile, isTablet, isDesktop])

  const [open, setOpen] = useState(false)
  return (
    <>
      <ReviewsContainer>
        <ReviewsWrapper>
          <ReviewsSwiperWrap>
            <ReviewsTitle>
              <h2>Reviews From Reputable Crypto Resources</h2>
              <p>Read more about the accomplishments of WebxBank on the most reputable crypto resources.</p>
              <div className="custom-button-wrap">
                <div className="custom-button-next custom-button">
                  <PrevSvg />
                </div>
                <div className="custom-button-prev custom-button">
                  <PrevSvg />
                </div>
              </div>
            </ReviewsTitle>
            <ReviewsSwiper>
              <StyledSwiper
                onSwiper={setSwiperRef}
                modules={[Navigation]}
                navigation={{
                  prevEl: '.custom-button-prev',
                  nextEl: '.custom-button-next',
                }}
                slidesPerView={currentSlidesPerView}
                spaceBetween={currentSpaceBetween}
                grabCursor
                speed={1000}
                loop
              >
                {ReviewsList.map((item, index) => {
                  const childKey = `Banner${index}`
                  return (
                    <SwiperSlide key={childKey}>
                      <div className="reviews_item">
                        <Image src={item.image} alt="item" width={160} height={40} />
                        <span>{item.text}</span>
                        <div className="ast">
                          <p>Read more</p>
                          <RightSvg />
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                })}
              </StyledSwiper>
            </ReviewsSwiper>
          </ReviewsSwiperWrap>
          <ReviewsInvestor>
            <InvestorTitle>
              <h2>Our Strategic Investor</h2>
              <p>
                Binance Labs, the venture capital and incubator of Binance, announced strategic investment in WebxBank.
                The synergy from two companies working together in tandem will bring new high-quality products &
                services, technology enhancement, and further worldwide
              </p>
              <Link href="/swap">
                <Button as="a">Details</Button>
              </Link>
            </InvestorTitle>
            <img className="binanceImg" src="/images/bitbank/illustration.png" alt="" />
          </ReviewsInvestor>
          <ReviewsBitwap>
            <div className="bitswap_content">
              <InvestorTitle className="bitswap_title">
                <h2>What Is WebxBank (BTH)?</h2>
                <p>
                  WebxBank is a decentralized exchange (DEX) that allows users to swap tokens on the BNB Smart Chain.
                  Besides having a novel referral system and low trading fees, WebxBank also offers an assortment of
                  products and services
                </p>
                <Link href="/swap">
                  <Button as="a" className="binanceAcademy">
                    <img src="/images/bitbank/binanceAcademy.png" alt="" />
                  </Button>
                </Link>
              </InvestorTitle>
              <div className="bitswap_video">
                <div className="video_pad">
                  <VideoButton className="video_button" onClick={() => setOpen(true)}>
                    <PlaySvg />
                  </VideoButton>
                  <YoutubeTeleport isOpen={open} onClose={() => setOpen(false)} />
                </div>
              </div>
            </div>
          </ReviewsBitwap>
          <ExchangesPartners />
        </ReviewsWrapper>
      </ReviewsContainer>
    </>
  )
}
