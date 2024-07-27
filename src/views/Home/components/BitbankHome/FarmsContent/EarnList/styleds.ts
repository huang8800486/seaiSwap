import styled from 'styled-components'
import { getMedia } from '../../styleds'

export const EarnWrapper = styled.div`
  width: 100%;
  position: relative;
  .item_list_wrap {
    width: 100%;
    position: relative;
    font-size: ${getMedia(['12px', '14px', '16px'])};
    margin-bottom: 10px;
    &.earn_list_wrap {
      background-color: ${({ theme }) => theme.colors.bitBox};
      box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.05);
      border-radius: 13px;
    }
    &.lanuchpools_list_wrap {
      .item_box {
        background-color: ${({ theme }) => theme.colors.bitBox};
        box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.05);
        position: relative;
        margin-bottom: 10px;
        border-radius: 13px;
      }
    }
    .item_box {
      width: 100%;
      position: relative;
      display: flex;
      padding: 16px 12px;
      justify-content: space-between;
      align-items: center;
      .item_title {
        display: flex;
        align-items: center;
        .logo_img {
          width: 27px;
          height: 16px;
          position: relative;
          margin-right: 10px;
          img {
            width: 16px;
            display: block;
            &:last-child {
              position: absolute;
              right: 0;
              top: 0;
            }
          }
        }
        .logos_img {
          width: ${getMedia(['26px', '36px', '46px'])};
          height: ${getMedia(['26px', '36px', '46px'])};
          margin-right: 10px;
        }
        .tits {
          p {
            color: #878787;
            margin-top: 4px;
          }
        }
      }
      .item_center {
        .apy_box {
          display: flex;
          align-items: center;
          color: #878787;
        }
        .question_box {
          display: flex;
          align-items: center;
          color: ${({ theme }) => theme.colors.primary};
        }
        .item_apy {
          cursor: pointer;
          line-height: 1;
        }
        .item_question {
          cursor: pointer;
          svg {
            fill: #878787;
            margin-top: 3px;
          }
        }
        img {
          margin-left: 4px;
          width: 11px;
        }
      }
      .item_button {
        a {
          padding: ${getMedia(['5px 5px', '8px 15px', '10px 18px'])};
          background-color: ${({ theme }) => theme.colors.startFram};
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: ${({ theme }) => theme.colors.primary};
          transition: all 0.3s ease;
          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }
`
