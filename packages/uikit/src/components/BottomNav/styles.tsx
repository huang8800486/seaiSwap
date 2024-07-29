import styled from "styled-components";
import { Flex } from "../Box";

const StyledBottomNav = styled.div`
  width: 100%;
  height: 100%;
  // background: ${({ theme }) => theme.colors.backgroundAlt};
  // border-top: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding-bottom: env(safe-area-inset-bottom);
  html[data-useragent*="TokenPocket_iOS"] & {
    padding-bottom: 45px;
  }
  z-index: 20;
  .wallet_box,
  a {
    width: 100%;
    display: block;
    padding: 16px 21px;
    position: relative;
    display: flex;
    align-items: center;
    &.active {
      p {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
    h3 {
      margin-right: 12px;
      width: 20px;
      img {
        width: 100%;
        display: block;
      }
    }
    p {
      font-size: 14px;
      color: #fff;
      position: relative;
    }
    span {
      position: absolute;
      right: 22px;
      top: 20px;
      img {
        width: 7px;
        display: block;
      }
    }

    button {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      width: 100%;
    }
  }
  .wallet_wrap {
    width: 100%;
    position: relative;
    button {
      margin-top: 0;
    }
  }
`;

export default StyledBottomNav;
