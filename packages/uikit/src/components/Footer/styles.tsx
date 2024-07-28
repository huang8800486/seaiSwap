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
  background-color: #000000;
  color: #fff;
  // background-image: url("/images/seai/footer_bg.png");
  // background-position: top center;
  // background-size: cover;
  margin-bottom: 0;
  padding-bottom: 82px;
  margin-top: -30px;
  position: relative;
  .footer_bg {
    position: absolute;
    top: -43px;
    width: 100%;
  }
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
  justify-content: center;
  flex-wrap: wrap;
  .footer_wrap {
    // width: 100%;
    // display: flex;
    // justify-content: center;
    text-align: center;
    .relate_box {
      display: flex;
      justify-content: center;
      a {
        margin: 0 7px;
        width: 26px;
        height: 26px;
        img {
          width: 100%;
          display: block;
        }
      }
    }
    span {
      fotn-size: ${getMedia(["16px", "18px", "20px"])};
      display: block;
      margin: 16px 0 4px;
    }
    p {
      color: #999999;
      fotn-size: ${getMedia(["12px", "14px", "16px"])};
    }
  }
`;
