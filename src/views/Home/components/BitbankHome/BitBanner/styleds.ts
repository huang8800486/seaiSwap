import styled, { css } from 'styled-components'
import { getMedia } from '../styleds'

export const BannerWrapper = styled.div`
  width: 100%;
  position: relative;
  color: #fff;
  padding: 0 21px;
  .banner_cover_wrap {
    width: 100%;
    position: relative;
    padding-top: 57.01%;
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
        img {
          width: 100%;
        }
      }
    }
  }
`
