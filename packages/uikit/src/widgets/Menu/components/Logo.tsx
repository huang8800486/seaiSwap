import React, { useContext } from "react";
import { useOptionsShowSamllNav } from "state/options/hooks";
import { useTranslation } from "@pancakeswap/localization";
import styled, { keyframes } from "styled-components";
import Flex from "../../../components/Box/Flex";
import { LogoIcon, LogoWithTextIcon } from "../../../components/Svg";
import { MenuContext } from "../context";

interface Props {
  isDark: boolean;
  href: string;
}

const blink = keyframes`
  0%,  100% { transform: scaleY(1); }
  50% { transform:  scaleY(0.1); }
`;
// const StyledLink = styled("a")`
const StyledLink = styled("div")`
  display: flex;
  align-items: center;
  .mobile-icon {
    width: 32px;
    ${({ theme }) => theme.mediaQueries.lg} {
      display: none;
    }
  }
  .desktop-icon {
    width: 160px;
    display: none;
    ${({ theme }) => theme.mediaQueries.lg} {
      display: block;
    }
  }
  .eye {
    animation-delay: 20ms;
  }
  &:hover {
    .eye {
      transform-origin: center 60%;
      animation-name: ${blink};
      animation-duration: 350ms;
      animation-iteration-count: 1;
    }
  }
`;
const LogoImg = styled("div")`
  max-width: 60px;
`;
const MenuImg = styled("div")`
  width: 20px;
  margin-right: 9px;
  display: flex;
  align-items: center;
  img {
    width: 100%;
    display: block;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    display: none;
  }
`;

const Logo: React.FC<React.PropsWithChildren<Props>> = ({ isDark, href }) => {
  const { linkComponent } = useContext(MenuContext);
  const isAbsoluteUrl = href.startsWith("http");
  const { currentLanguage } = useTranslation();
  const [optionsShowSamllNav, setOptionsShowSamllNav] = useOptionsShowSamllNav();
  const innerLogo = (
    <>
      {/* <LogoWithTextIcon className="desktop-icon" isDark={isDark} /> */}
      <LogoImg>
        {currentLanguage.locale === "zh-CN" ? (
          <img src="/images/nav-title-dark.png" alt="" />
        ) : (
          <img src="/images/nav-title-light.png" alt="" />
        )}
        {/* <img src="/images/nav-title-light.png" alt="" /> */}
      </LogoImg>
    </>
  );
  return (
    <Flex>
      <MenuImg
        onClick={() => {
          setOptionsShowSamllNav(!optionsShowSamllNav);
        }}
      >
        <img src="/images/menu.png" alt="" />
      </MenuImg>
      {isAbsoluteUrl ? (
        <StyledLink as="a" aria-label="Pancake home page">
          {innerLogo}
        </StyledLink>
      ) : (
        <StyledLink aria-label="Pancake home page">{innerLogo}</StyledLink>
      )}
    </Flex>
  );
};

export default React.memo(Logo, (prev, next) => prev.isDark === next.isDark);
