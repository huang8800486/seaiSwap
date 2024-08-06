import React from 'react'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import SwiperCore, { Autoplay, EffectFade, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import styled, { css } from 'styled-components'
import CommonBox from '../../../Home/components/BitbankHome/CommonBox'

const StyledSwiper = styled(Swiper)`
  position: relative;
  width: 100%;
  border-radius: 12px;
`
export const getMedia = (value: string[]) => () => {
  const { isMobile, isTablet } = useMatchBreakpoints()
  return isMobile ? value[0] : isTablet ? value[1] : value[2]
}
export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  color: #fff;
  margin: 0 auto;
  padding: ${getMedia(['16px 16px 10px 16px', '0 0 16px 0 ', '0 0 16px 0'])};
  max-width: 436px;
  .swap_title_wrap {
    width: 100%;
    position: relative;
    padding-top: 40.29%;
    overflow: hidden;
  }
  .swap_title_box {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .swap_title {
    /* img {
      width: 100%;
      display: block;
      position: absolute;
      left: 0;
      top: 0;
    } */
    .text_wrap {
      width: 100%;
      height: 100%;
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      .text {
        width: 100%;
        text-align: center;
        padding: 0 9px;
        font-size: 12px;
      }
      h2 {
        position: relative;
        color: #e70d1f;
        font-size: 21px;
        text-align: center;
        margin-bottom: 17px;
        em {
          position: relative;
          padding: 0 24px;
          font-style: normal;
          i {
            position: absolute;
            top: 50%;
            transform: translate3d(0, -50%, 0);
            height: 19px;
            &:before {
              position: absolute;
              top: 50%;
              transform: translate3d(0, -50%, 0);
              content: '';
              width: 5px;
              height: 19px;
              background: #f8bc42;
              box-shadow: 0rem 0rem 5px 0rem #f8bc42;
              border-radius: 2px;
            }
            &:after {
              position: absolute;
              bottom: 0;
              content: '';
              width: 5px;
              height: 10px;
              background: #f8bc42;
              box-shadow: 0rem 0rem 5px 0rem #f8bc42;
              border-radius: 2px;
            }
          }
          .left {
            left: 0;
            &:before {
              left: 0;
            }
            &:after {
              left: 7px;
            }
          }
          .right {
            right: 0;
            &:before {
              right: 0;
            }
            &:after {
              right: 7px;
            }
          }
        }
      }
    }
  }
`
export default function SwapTitle() {
  const ReviewsList = [
    {
      image: '/images/seai/fen.png',
    },
    {
      image: '/images/seai/fen_02.jpg',
    },
    {
      image: '/images/seai/fen_03.jpg',
    },
  ]
  return (
    <Wrapper>
      <CommonBox isNoMargin>
        <div className="swap_title_wrap">
          <div className="swap_title_box">
            {/* <img src="/images/seai/fen.png" className="fen" alt="" />
            <div className="text_wrap">
              <div className="text">
                <h2>
                  <em>
                    <i className="left" />
                    风险提示
                    <i className="right" />
                  </em>
                </h2>
                <span>警惕陌生链接｜不给陌生地址转账｜管理不会私聊任何人</span>
              </div>
            </div> */}
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
                    <div className="swap_title">
                      {/* <Image src={item.image} alt="item" width={"100%"} height={40} /> */}
                      <img src={item.image} alt="" />
                      {/* <Image wi src={item.image} alt="banner" placeholder="blur" /> */}
                      {index < 1 && (
                        <div className="text_wrap">
                          <div className="text">
                            <h2>
                              <em>
                                <i className="left" />
                                风险提示
                                <i className="right" />
                              </em>
                            </h2>
                            <span>警惕陌生链接｜不给陌生地址转账｜管理不会私聊任何人</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                )
              })}
            </StyledSwiper>
          </div>
        </div>
      </CommonBox>
    </Wrapper>
  )
}
