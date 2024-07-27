import styled, { css } from 'styled-components'
import { getMedia } from '../../styleds'

export const OurBenefitsWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-top: ${getMedia(['20px', '25px', '30px'])};
  h2 {
    width: 100%;
    position: relative;
    text-align: center;
    font-size: ${getMedia(['18px', '20px', '24px'])};
    margin-bottom: 30px;
  }
`
export const TotalWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-top: ${getMedia(['32px', '42px', '52px'])};
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .total_item {
    width: ${getMedia(['50%', '32%', '18%'])};
  }
  .stutas_list_wrap {
    width: calc(100% + 20px);
    display: flex;
    margin-top: -10px;
    padding-bottom: 28px;
    flex-wrap: wrap;
    margin-left: -10px;

    .status_item_wrap {
      width: ${getMedia(['50%', '33%', '20%'])};
      margin-bottom: 10px;
      padding: 0 10px;
      .status_item {
        width: 100%;
        padding: 18px 0 7px;
        background-color: ${({ theme }) => theme.colors.bitBox};
        border-radius: 10px;
        text-align: center;
      }

      h3 {
        width: 100%;
        text-align: center;
        font-size: ${getMedia(['14px', '15px', '16px'])};
        font-family: Arial-Bold, Arial;
        font-weight: bold;
        margin-bottom: 7px;
      }

      span {
        width: 100%;
        text-align: center;
        display: block;
        margin-bottom: 3px;
        color: #878787;
      }

      img {
        width: 86px;
        height: 86px;
        margin: 0 auto;
        display: inline-block;
      }
    }
  }
`
