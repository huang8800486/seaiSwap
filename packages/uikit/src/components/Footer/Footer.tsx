import React, { useState, useEffect, useMemo } from "react";
import { useWeb3LibraryContext, useWeb3React } from "@pancakeswap/wagmi";
import { ROUTER_ADDRESS } from "config/constants/exchange";
import { getContract } from "utils/contractHelpers";
import { useSigner } from "wagmi";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import IPancakeRouter02 from "config/abi/IPancakeRouter02.json";
import { bscTokens } from "@pancakeswap/tokens";
import { formatUnits } from "@ethersproject/units";
import { vars } from "@pancakeswap/ui/css/vars.css";
import { Box, Flex } from "../Box";
import { Link } from "../Link";
import { StyledFooter, StyledFootContent } from "./styles";

import { Button } from "../Button";
import CakePrice from "../CakePrice/CakePrice";

import LangSelector from "../LangSelector/LangSelector";
import { ArrowForwardIcon, LogoWithTextIcon } from "../Svg";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { FooterProps } from "./types";

const MenuItem: React.FC<React.PropsWithChildren<FooterProps>> = ({
  items,
  isDark,
  toggleTheme,
  currentLang,
  langs,
  setLang,
  cakePriceUsd,
  buyCakeLabel,
  ...props
}) => {
  const [curentPrice, setCurentPrice] = useState<any>("");
  const { chainId } = useActiveWeb3React();
  const { account } = useWeb3React();
  const { data: signer } = useSigner();
  // console.log("ROUTER_ADDRESS", ROUTER_ADDRESS[chainId]);
  // const pricePoolContract = useMemo(() => {
  //   return getContract({ abi: IPancakeRouter02, address: ROUTER_ADDRESS[chainId], signer });
  // }, [signer, chainId]);
  // useEffect(() => {
  //   console.log("pricePoolContract", pricePoolContract);
  //   console.log("ROUTER_ADDRESS[chainId]", ROUTER_ADDRESS[chainId]);
  //   console.log("bscTokens.bth", bscTokens.bth.address);
  //   console.log("bscTokens.usdt", bscTokens.usdt.address);
  //   if (pricePoolContract) {
  //     pricePoolContract
  //       .getAmountsOut("1000000000000000000", [bscTokens.bth.address, bscTokens.usdt.address])
  //       .then((result: any) => {
  //         console.log("playerInfo", result);
  //         const value = formatUnits(result[1], 18);
  //         setCurentPrice((+value).toFixed(3));
  //       })
  //       .catch((err: any) => {
  //         console.log("playerInfo", err);
  //       });
  //   }
  // }, [pricePoolContract, account, chainId]);
  return (
    // <StyledFooter data-theme="dark" p={["40px 16px", null, "56px 40px 32px 40px"]} {...props} justifyContent="center">
    //   <img className="footer_bg" src="/images/seai/footer_bg.png" alt="" />
    //   <Flex flexDirection="column" width={["100%", null, "1120px;"]}>
    //     <StyledFootContent>
    //       <div className="footer_wrap">
    //         <div className="relate_box">
    //           <Link href="https://styled-system.com/api" target="_blank">
    //             <img src="/images/icons/facebook.png" alt="" />
    //           </Link>
    //           <Link href="https://styled-system.com/api" target="_blank">
    //             <img src="/images/icons/twite.png" alt="" />
    //           </Link>
    //           <Link href="https://styled-system.com/api" target="_blank">
    //             <img src="/images/icons/telegram.png" alt="" />
    //           </Link>
    //         </div>
    //         <span>SKAI TOKEN @2024</span>
    //         <p>Based on Binance Smart Chain</p>
    //       </div>
    //     </StyledFootContent>
    //   </Flex>
    // </StyledFooter>
    <></>
  );
};

export default MenuItem;
