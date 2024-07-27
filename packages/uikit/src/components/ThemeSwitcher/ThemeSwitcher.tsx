import { memo } from "react";
import { SunIcon, MoonIcon } from "../Svg";
import { Toggle } from "../Toggle";

export interface Props {
  isDark: boolean;
  toggleTheme: (isDark: boolean) => void;
}

const ThemeSwitcher: React.FC<React.PropsWithChildren<Props>> = ({ isDark, toggleTheme }) => (
  <Toggle
    checked={isDark}
    defaultColor="textDisabled"
    checkedColor="textDisabled"
    onChange={() => toggleTheme(!isDark)}
    scale="md"
    startIcon={(isActive = false) => <SunIcon />}
    endIcon={(isActive = false) => <MoonIcon />}
  />
);

export default memo(ThemeSwitcher, (prev, next) => prev.isDark === next.isDark);
