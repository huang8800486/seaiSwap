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
  a {
    width: 100%;
    display: block;
    padding: 16px 21px;
    position: relative;
    display:flex;
    &.active {
      p {
        color: ${({ theme }) => theme.colors.primary}
      }
    }
    h3 {
      margin-right: 12px;
      width: 20px;
      img {
        width: 100%;
        display:block;
      }
    }
    p {
      font-size: 14px;
      color: #fff;
    }
    span {
      position: absolute;
      right: 22px;
      top: 20px;
      img {
        width: 7px;
        display:block;
      }
    }
  }
`;

export default StyledBottomNav;
