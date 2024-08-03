import React, { useState, memo } from "react";
import { useRouter } from "next/router";
import { Link, useToast } from "@pancakeswap/uikit";
import { useTranslation } from "@pancakeswap/localization";
import { useOptionsShowSamllNav } from "state/options/hooks";
import { useWeb3React } from "@pancakeswap/wagmi";
import ConnectWalletButton from "components/ConnectWalletButton";
import StyledBottomNav from "./styles";
import { BottomNavProps } from "./types";
import { Overlay } from "../Overlay";

const BottomNav: React.FC<React.PropsWithChildren<BottomNavProps>> = ({
  items = [],
  activeItem = "",
  activeSubItem = "",
  ...props
}) => {
  const router = useRouter();
  const { account } = useWeb3React();
  const { t } = useTranslation();
  const { toastError, toastSuccess } = useToast();
  const [menuOpenByIndex, setMenuOpenByIndex] = useState({});
  const isBottomMenuOpen = Object.values(menuOpenByIndex).some((acc) => acc);
  const [optionsShowSamllNav, setOptionsShowSamllNav] = useOptionsShowSamllNav();
  return (
    <>
      {isBottomMenuOpen && <Overlay />}
      <StyledBottomNav {...props}>
        {items.map(
          (
            { label, items: menuItems, href, icon, fillIcon, showOnMobile = true, showItemsOnMobile = true, disabled },
            index
          ) => {
            const statusColor = menuItems?.find((menuItem) => menuItem.status !== undefined)?.status?.color;
            // console.log("router.asPath", router.asPath);
            return (
              showOnMobile && (
                <Link
                  href={href}
                  key={label}
                  onClick={(event) => {
                    setOptionsShowSamllNav(false);
                    if (href === "/pledge") {
                      event.preventDefault();
                      toastError(t("Coming Soon!"));
                    }
                  }}
                  className={router.asPath === href ? "active" : ""}
                >
                  <h3>
                    <img src={icon.src} alt="" />
                  </h3>
                  <p>{label}</p>
                  <span>
                    <img src="/images/icons/arrow-right.png" alt="" />
                  </span>
                </Link>
              )
            );
          }
        )}
        {!account && (
          <div className="wallet_wrap">
            <div className="wallet_box">
              <h3>
                <img src="/images/icons/wallet.png" alt="" />
              </h3>
              <p>WEB3钱包</p>
              <span>
                <img src="/images/icons/arrow-right.png" alt="" />
              </span>
              <ConnectWalletButton mt="24px" />
            </div>
          </div>
        )}
      </StyledBottomNav>
    </>
  );
};

export default memo(BottomNav);
