import styled, { css } from 'styled-components'
import { getMedia } from '../styleds'

export const BannerWrapper = styled.div`
  width: 100%;
  position: relative;
  // background-image: url('/images/bitbank/banner.png');
  // background-position: center top;
  // background-repeat: no-repeat;
  // background-size: cover;
  min-height: 300px;
  color: #fff;
  .banner_video {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    .poster {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-position: left top;
      background-repeat: no-repeat;
      background-size: cover;
      background-image: ${getMedia(["url('/images/bitbank/small-0.jpg')", "url('/images/bitbank/small-0.jpg')", "url('/images/bitbank/poster.jpg')"])};
    }

    video {
      width: 100%;
      position: relative;
    }
  }
  .banner_market_list_wrap {
    width: 100%;
    position: relative;
    max-width: 1132px;
    padding: 0 16px;
    margin: 0 auto;
    padding-top: ${getMedia(['32px', '42px', '52px'])};
    padding-bottom: ${getMedia(['32px', '22px', '32px'])};
  }
  .banner_market_list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: ${getMedia(['column-reverse', 'row', 'row'])};
    .market_list {
      width: ${getMedia(['100%', '90%', '90%'])};
      display: flex;
      flex-wrap: wrap;
      height: 55px;
      overflow: hidden;
      .market_item {
        // width: ${getMedia(['50%', '25%', '20%'])};
        padding: 10px 0;
        display: flex;
        .market_icon {
          width: 35px;
          margin-right: 8px;
          img {
            display: block;
            width: 100%;
          }
        }
        .market_text {
          flex: 1;
          font-size: 12px;
          span {
            font-size: 15px;
            margin-bottom: 1px;
            display: block;
          }
          p {
            color: #878787;
          }
        }
      }
    }
    .market_all {
      width: ${getMedia(['100%', '10%', '10%'])};
      display: ${getMedia(['none', 'none', 'flex'])};
      justify-content: right;
      a {
        color: #fff;
        display: flex;
        align-items: center;
        font-size: 13px;
        cursor: pointer;
        img {
          width: 13px;
        }
      }
    }
  }
  .banner_exchange_title {
    width: 100%;
    max-width: 1132px;
    padding: 0 16px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    margin-top: ${getMedia(['29px', '49px', '59px'])};
    .exchange_list {
      background: rgba(0, 0, 0, 0.26);
      border-radius: 7px;
      width: 100%;
      position: relative;
      padding: ${getMedia(['18px 10px 18px 10px', '18px 31px 18px 25px', '18px 31px 18px 25px'])};
      display: flex;
      justify-content: space-between;
      align-items: center;
      .bnb_logo {
        width: 35px;
        margin-right: 16px;
      }
      .bnb_text {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-size: 11px;
          color: #878787;
        }
        span {
          font-size: 15px;
          color: #ffffff;
          margin-top: 8px;
          display: block;
        }
        .txt1 {
          padding-right: ${getMedia(['20px', '20px', '39px'])};
        }
        .txt2 {
          padding-left: ${getMedia(['20px', '20px', '39px'])};
          position: relative;
          &:before {
            content: '';
            position: absolute;
            left: 0;
            width: 1px;
            height: 100%;
            background: #b1b1b1;
            top: 50%;
            left: 0;
            transform: translate3d(0, -50%, 0);
          }
        }
      }
    }
    .exchange_box {
      width: ${getMedia(['100%', '55%', '55%'])};
      display: flex;
      flex-wrap: wrap;
      .exch_item {
        width: ${getMedia(['50%', '50%', '50%'])};
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        .exch_icon {
          width: ${getMedia(['24px', '36px', '48px'])};
          margin-right: 13px;
          img {
            width: 100%;
            display: block;
          }
        }
        .exch_text {
          font-size: 13px;
          color: #ffffff;
          flex: 1;
          h2 {
            width: ${getMedia(['100%', '100%', '100%'])};
            margin-bottom: 9px;
            line-height: 1.2;
          }
          span {
            font-size: 17px;
            font-family: Arial-Bold, Arial;
            font-weight: bold;
            color: #ffff00;
          }
        }
      }
    }
    .exchange_list {
      width: ${getMedia(['100%', '45%', '45%'])};
    }
  }
  .banner_text {
    width: ${getMedia(['100%', '100%', '1132px'])};
    margin: 0 auto;
    position: relative;
    display: flex;
    justify-content: space-between;
    padding-top: ${getMedia(['40px', '67px', '67px'])};
    padding-left: ${getMedia(['16px', '20px', '25px'])};
    padding-right: ${getMedia(['16px', '20px', '25px'])};
    flex-wrap: wrap;

    .b_text {
      width: ${getMedia(['100%', '50%', '50%'])};

      h1 {
        font-size: ${getMedia(['24px', '28px', '34px'])};
        font-weight: bold;
        line-height: 1.2;
        margin-bottom: ${getMedia(['10px', '10px', '16px'])};
      }

      .p_list {
        width: 100%;
        position: relative;
        line-height: 1.5;
        font-size: ${getMedia(['16px', '20px', '22px'])};
      }

      .start_trade {
        margin-top: ${getMedia(['20px', '20px', '30px'])};
        display: ${getMedia(['block', 'inline-block', 'inline-block'])};

        .base_components_button_layout {
          width: 100%;
          font-size: ${getMedia(['14px', '16px', '19px'])};
        }
      }
    }

    .b_img {
      width: ${getMedia(['100%', '100%', '50%'])};
      margin: 0 auto;
      padding-top: ${getMedia(['30px', '50px', '0'])};
      margin-top: ${getMedia(['-32px', '-52px', '-72px'])};
      position: relative;
      min-height: 1px;
      display: ${getMedia(['none', 'block', 'block'])};

      img {
        display: block;
        max-width: inherit;
        width: 100%;
      }
    }
  }
`
