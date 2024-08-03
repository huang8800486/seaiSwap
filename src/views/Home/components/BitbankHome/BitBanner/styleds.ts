import styled, { css } from 'styled-components'
import { getMedia, getMedia2 } from '../styleds'

export const BannerWrapper = styled.div`
  width: 100%;
  position: relative;
  color: #fff;
  padding: 0 21px;
  max-width: 1340px;
  margin: 0 auto;
  .banner_cover_wrap {
    width: 100%;
    position: relative;
    padding-top: 57.01%;
    z-index: 2;
    overflow: hidden;
    .banner_cover {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      .banner_img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        .reviews_item {
          width: 100%;
          height: 100%;
        }
      }
      .banner_text {
        position: absolute;
        left: 0;
        top: 0;
        padding-top: ${getMedia(['55px', '10%', '15%'])};
        padding-left: ${getMedia(['16px', '10%', '15%'])};
        z-index: 2;
        h2 {
          font-size: ${getMedia(['30px', '60px', '80px'])};
          color: #ffffff;
          margin-bottom: 0.3em;
        }
        span {
          width: 11em;
          font-size: ${getMedia(['12px', '24px', '36px'])};
          margin-bottom: ${getMedia(['10px', '20px', '40px'])};
          display: block;
          line-height: 1.2;
        }
        a {
          display: inline-block;
          font-size: ${getMedia(['15px', '20px', '25px'])};
          background: linear-gradient(90deg, #02f9c1 0%, #1a5bed 100%);
          border-radius: 23px;
          border-image: linear-gradient(161deg, rgba(159, 160, 171, 1), rgba(31, 33, 46, 1)) 0.01 0.01;
          padding: ${getMedia(['7px 12px', '10px 15px', '17px 26px'])};
          color: #000000;
        }
      }
    }
  }
`
