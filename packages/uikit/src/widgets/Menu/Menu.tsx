import throttle from "lodash/throttle";
import React, { useEffect, useRef, useState } from "react";
import { ThemeSwitcher, Button } from "@pancakeswap/uikit";
import { useWeb3React } from "@pancakeswap/wagmi";
import { SamllNavIcon } from "@pancakeswap/uikit";
import Link from "next/link";
import styled from "styled-components";
import BottomNav from "../../components/BottomNav";
import { Box } from "../../components/Box";
import Flex from "../../components/Box/Flex";
import Footer from "../../components/Footer";
import MenuItems from "../../components/MenuItems/MenuItems";
import { SubMenuItems } from "../../components/SubMenuItems";
import { useOptionsShowSamllNav } from "state/options/hooks";
import { CSSTransition } from "react-transition-group";
import { useMatchBreakpoints } from "../../contexts";
import CakePrice from "../../components/CakePrice/CakePrice";
import Logo from "./components/Logo";
import { MENU_HEIGHT, MOBILE_MENU_HEIGHT, TOP_BANNER_HEIGHT, TOP_BANNER_HEIGHT_MOBILE } from "./config";
import { NavProps } from "./types";
import LangSelector from "../../components/LangSelector/LangSelector";
import { MenuContext } from "./context";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  background: url(/images/bitbank/trade.png) no-repeat center top;
  background-size: cover;
`;

const StyledNav = styled.nav<{ isMobile: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${({ isMobile }) => (isMobile ? "56px" : `${MENU_HEIGHT}px`)};
  // background-color: ${({ theme }) => theme.nav.background};
  background-color: #020b15;
  border-bottom: 1px solid #020b15;
  transform: translate3d(0, 0, 0);

  padding-left: 16px;
  padding-right: 16px;
`;

const FixedContainer = styled.div<{ showMenu: boolean; height: number }>`
  position: fixed;
  top: ${({ showMenu, height }) => (showMenu ? 0 : `-${height}px`)};
  left: 0;
  transition: top 0.2s;
  height: ${({ height }) => `${height}px`};
  width: 100%;
  z-index: 20;
`;

const TopBannerContainer = styled.div<{ height: number }>`
  height: ${({ height }) => `${height}px`};
  min-height: ${({ height }) => `${height}px`};
  max-height: ${({ height }) => `${height}px`};
  width: 100%;
`;

const BodyWrapper = styled(Box)`
  position: relative;
  display: flex;
`;

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  max-width: 100%;
`;
const SubNavLayer = styled.div<{ optionsShowSamllNav: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  display: ${({ optionsShowSamllNav }) => (optionsShowSamllNav ? 'block' : `none`)};
`;
const SubNavContent = styled.div<{ optionsShowSamllNav: boolean }>`
  position: fixed;
  top: 0;
  left: ${({ optionsShowSamllNav }) => (optionsShowSamllNav ? 0 : `-100%`)};
  width: 75.73%;
  height: 100%;
  transition: left 0.3s;
  background: rgba(2, 11, 21, 0.9);
`;
const AddressText = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 35px;
  color: #fff;
  padding: 80px 20px 0;
  h2 {
    font-size: 24px;
    margin-bottom: 7px;
  }
  p {
    font-size: 12px;
  }
`;

const Menu: React.FC<React.PropsWithChildren<NavProps>> = ({
  linkComponent = "a",
  banner,
  rightSide,
  isDark,
  toggleTheme,
  currentLang,
  setLang,
  cakePriceUsd,
  links,
  subLinks,
  footerLinks,
  activeItem,
  activeSubItem,
  langs,
  buyCakeLabel,
  children,
}) => {
  const { isMobile, isMd } = useMatchBreakpoints();
  const { account } = useWeb3React();
  const accountEllipsis = account ? `${account.substring(0, 8)}...${account.substring(account.length - 5)}` : null;
  const [optionsShowSamllNav] = useOptionsShowSamllNav();
  const [showMenu, setShowMenu] = useState(true);
  const ref = useRef(null);
  const refPrevOffset = useRef(typeof window === "undefined" ? 0 : window.pageYOffset);
  const topBannerHeight = isMobile ? TOP_BANNER_HEIGHT_MOBILE : TOP_BANNER_HEIGHT;

  const totalTopMenuHeight = isMobile ? 56 : banner ? MENU_HEIGHT + topBannerHeight : MENU_HEIGHT;

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current || currentOffset <= totalTopMenuHeight) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [totalTopMenuHeight]);

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === "Home");

  const subLinksWithoutMobile = subLinks?.filter((subLink) => !subLink.isMobileOnly);
  const subLinksMobileOnly = subLinks?.filter((subLink) => subLink.isMobileOnly);
  const { trade } = SamllNavIcon();
  return (
    <MenuContext.Provider value={{ linkComponent }}>
      <Wrapper>
        <FixedContainer showMenu={showMenu} height={totalTopMenuHeight}>
          {banner && <TopBannerContainer height={topBannerHeight}>{banner}</TopBannerContainer>}
          <StyledNav isMobile={isMobile}>
            <Flex>
              <Logo isDark={isDark} href={homeLink?.href ?? "/"} />
              {!isMobile && <MenuItems items={links} activeItem={activeItem} activeSubItem={activeSubItem} ml="24px" />}
              {/* {!isMobile && (
                <Flex alignItems="center">
                  <a href="https://nft.webxbank.pro/" target="_blank" rel="noreferrer">
                    <Button height={36} as="a">
                      NFT
                    </Button>
                  </a>
                </Flex>
              )} */}
            </Flex>
            <Flex alignItems="center" height="100%">
              {/* {!isMobile && !isMd && (
                <Box mr="12px">
                  <CakePrice showSkeleton={false} cakePriceUsd={cakePriceUsd} />
                </Box>
              )} */}

              {rightSide}
              <Box mt="4px">
                <LangSelector
                  currentLang={currentLang}
                  langs={langs}
                  setLang={setLang}
                  buttonScale="xs"
                  color="textSubtle"
                  hideLanguage
                />
              </Box>
              {/* <Box mr="8px">
                <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} />
              </Box> */}
            </Flex>
          </StyledNav>
        </FixedContainer>
        {subLinks && (
          <Flex justifyContent="space-around">
            <SubMenuItems items={subLinksWithoutMobile} mt={`${totalTopMenuHeight}px`} activeItem={activeSubItem} />

            {subLinksMobileOnly?.length > 0 && (
              <SubMenuItems
                items={subLinksMobileOnly}
                mt={`${totalTopMenuHeight}px`}
                activeItem={activeSubItem}
                isMobileOnly
              />
            )}
          </Flex>
        )}
        <BodyWrapper mt={!subLinks ? `${totalTopMenuHeight}px` : "0"}>
          <Inner isPushed={false} showMenu={showMenu}>
            {children}
            <Footer
              items={footerLinks}
              isDark={isDark}
              toggleTheme={toggleTheme}
              langs={langs}
              setLang={setLang}
              currentLang={currentLang}
              cakePriceUsd={cakePriceUsd}
              buyCakeLabel={buyCakeLabel}
              mb={[`${MOBILE_MENU_HEIGHT}px`, null, "0px"]}
            />
          </Inner>
        </BodyWrapper>
        {isMobile && (
          <SubNavLayer optionsShowSamllNav={optionsShowSamllNav}>
            <SubNavContent optionsShowSamllNav={optionsShowSamllNav}>
              <AddressText>
                <h2>Address</h2>
                <p>{accountEllipsis}</p>
              </AddressText>
              <BottomNav items={links} activeItem={activeItem} activeSubItem={activeSubItem} />
            </SubNavContent>
          </SubNavLayer>
        )}
      </Wrapper>
    </MenuContext.Provider>
  );
};

export default Menu;
