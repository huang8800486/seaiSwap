/* eslint-disable @typescript-eslint/no-explicit-any */
import { createElement, memo } from "react";
import styled, { DefaultTheme } from "styled-components";
import { useTranslation } from "@pancakeswap/localization";
import { useToast } from "@pancakeswap/uikit";
import { Flex } from "../Box";
import isTouchDevice from "../../util/isTouchDevice";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import MenuItem from "../MenuItem/MenuItem";
import { MenuItemsProps } from "./types";

export const EnptyedownMenu = styled.div`
  padding-top: 4px;
  padding-bottom: 4px;
`;
export const EnptyeButton = styled.div`
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: #fff;
  font-size: 16px;
  opacity: 1;
  padding: 0 16px;
  height: 48px;
  cursor: pointer;
`;
const MenuItems: React.FC<React.PropsWithChildren<MenuItemsProps>> = ({
  items = [],
  activeItem,
  activeSubItem,
  ...props
}) => {
  const { t } = useTranslation();
  const { toastError, toastSuccess } = useToast();
  const enpty = () => {
    toastError(t("Coming Soon!"));
  };
  return (
    <Flex {...props}>
      {items.map(({ label, items: menuItems = [], href, icon, disabled }) => {
        const statusColor = menuItems?.find((menuItem) => menuItem.status !== undefined)?.status?.color;
        const isActive = activeItem === href;
        const linkProps = isTouchDevice() && menuItems && menuItems.length > 0 ? {} : { href };
        const Icon = icon;
        return (
          <>
            {!disabled ? (
              <DropdownMenu
                key={`${label}#${href}`}
                items={menuItems}
                py={1}
                activeItem={activeSubItem}
                isDisabled={disabled}
              >
                <MenuItem {...linkProps} isActive={isActive} statusColor={statusColor} isDisabled={disabled}>
                  {label || (icon && createElement(Icon as any, { color: isActive ? "secondary" : "textSubtle" }))}
                </MenuItem>
              </DropdownMenu>
            ) : (
              <EnptyedownMenu>
                <EnptyeButton onClick={enpty}>{label}</EnptyeButton>
              </EnptyedownMenu>
            )}
          </>
        );
      })}
    </Flex>
  );
};

export default memo(MenuItems);
