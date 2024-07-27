import { useMatchBreakpoints } from "@pancakeswap/uikit";
import styled from "styled-components";
import { darkColors } from "../../theme/colors";
import { Box, Flex } from "../Box";
import SocialLinks from "./Components/SocialLinks";

export const getMedia = (value: string[]) => () => {
  const { isMobile, isTablet } = useMatchBreakpoints();
  return isMobile ? value[0] : isTablet ? value[1] : value[2];
};
export const getMedia2 = (value: string[]) => () => {
  const { isXl, isLg, isMd, isXs, isSm, isXxl } = useMatchBreakpoints();
  let result = "";
  if (isXxl) {
    result = value[5];
  } else if (isXl) {
    result = value[4];
  } else if (isLg) {
    result = value[3];
  } else if (isMd) {
    result = value[2];
  } else if (isXs) {
    result = value[1];
  } else if (isSm) {
    result = value[0];
  }
  return result;
};
export const StyledFooter = styled(Flex)`
  background: #000000;
  color: #fff;
`;

export const StyledList = styled.ul`
  list-style: none;
  margin-bottom: 40px;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 0px;
  }
`;

export const StyledListItem = styled.li`
  margin-bottom: 8px;
  line-height: 18px;
  a {
    font-size: 14px;
  }
  &:first-child {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    font-size: 16px;
  }
`;

export const StyledIconMobileContainer = styled(Box)`
  margin-bottom: 24px;
`;

export const StyledToolsContainer = styled(Flex)`
  border-color: ${darkColors.cardBorder};
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-style: solid;
  padding: 24px 0;
  margin-bottom: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    border-top-width: 0;
    border-bottom-width: 0;
    padding: 0 0;
    margin-bottom: 0;
  }
`;

export const StyledSocialLinks = styled(SocialLinks)`
  // border-bottom: 1px solid ${darkColors.cardBorder};
  display: flex;
  flex-wrap: wrap;
  a {
    margin-right: 22px;
    margin-bottom: 16px;
  }
  > div {
    margin-right: 22px;
    margin-bottom: 16px;
  }
  svg {
    margin-right: 0;
  }
`;

export const StyledText = styled.span`
  color: ${darkColors.text};
`;
export const StyledFootContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .coin_detail {
    width: ${getMedia2(["100%", "100%", "100%", "50%", "424px", "424px"])};
    background: rgba(255, 255, 255, 0.1);
    border-radius: 7px;
    padding: 24px;
    margin-bottom: 24px;
    .coin_wrapper {
      width: 100%;
      position: relative;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .coin_price {
        width: ${getMedia(["100%", "100%", "30%"])};
        display: flex;
        margin-bottom: 24px;
        .coin_img {
          width: 38px;
          height: 38px;
        }
        .price_box {
          margin-left: 11px;
          span {
            color: #828282;
            display: block;
            margin-bottom: 2px;
          }
          p {
            font-size: 16px;
          }
        }
      }
      .coin_total_list {
        width: ${getMedia(["100%", "100%", "55%"])};
        .coin_list {
          font-size: 12px;
          margin-bottom: 16px;
          width: 100%;
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          p {
            color: #828282;
          }
        }
      }
      .coin_buy {
        position: ${getMedia(["absolute", "absolute", "relative"])};
        right: ${getMedia(["0", "0", "auto"])};
        margin-top: ${getMedia(["0", "0", "24px"])};
        display: flex;
        align-items: center;
        .add_coin {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          &:hover {
            opacity: 0.6;
          }
          img {
            width: 24px;
            display: block;
          }
        }
      }
    }
  }
  .relate_detail {
    width: ${getMedia2(["100%", "100%", "100%", "45%", "49%", "57%"])};
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    .about_box {
      display: flex;
      justify-content: space-between;
      width: ${getMedia2(["100%", "100%", "100%", "100%", "100%", `calc(100% - 172px)`])};
      font-size: 12px;
      padding-right: ${getMedia(["0", "40px", "60px"])};
      ul {
        margin-bottom: 0;
      }
    }
    .communlty_box {
      width: ${getMedia2(["100%", "100%", "100%", "100%", "100%", `172px`])};
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      h2 {
        margin-bottom: 16px;
        width: 100%;
        position: relative;
        font-size: 16px;
        line-height: 18px;
        color: ${({ theme }) => theme.colors.primary};
      }
      .communlty_icon {
        width: ${getMedia2(["100%", "100%", "50%", "100%", "100%", `100%`])};
      }
      .communlty_txt {
        width: ${getMedia2(["100%", "100%", "50%", "100%", "100%", `100%`])};
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .txt_box {
          width: ${getMedia2(["48%", "48%", "48%", "48%", "48%", `100%`])};
          position: relative;
          border-radius: 7px;
          background: rgba(255, 255, 255, 0.1);
          margin-bottom: 16px;
        }
        .certik {
          padding: 8px 16px;
        }
        .marketplace {
          padding: 8px;
          display: flex;
          font-size: 14px;
          align-items: center;
          .market_box {
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(136.03deg, rgb(18, 99, 241) -7.36%, rgb(246, 61, 94) 131.43%);
            border-radius: 6px;
            margin-right: 6px;
            img {
              width: 19px;
            }
          }
        }
      }
    }
  }
`;
