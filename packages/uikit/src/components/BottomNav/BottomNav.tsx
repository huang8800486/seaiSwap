import React, { useState, memo } from "react";
import BottomNavItem from "../BottomNavItem";
import StyledBottomNav from "./styles";
import { Link } from "@pancakeswap/uikit";
import { useOptionsShowSamllNav } from "state/options/hooks";
import { Box } from "../Box";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { BottomNavProps } from "./types";
import { NotificationDot } from "../NotificationDot";
import { Overlay } from "../Overlay";

const BottomNav: React.FC<React.PropsWithChildren<BottomNavProps>> = ({
  items = [],
  activeItem = "",
  activeSubItem = "",
  ...props
}) => {
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
            return (
              showOnMobile && (
                <Link
                  href={href}
                  onClick={() => {
                    setOptionsShowSamllNav(false);
                  }}
                  className={activeItem === href ? 'active' : ''}
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
      </StyledBottomNav>
    </>
  );
};

export default memo(BottomNav);
