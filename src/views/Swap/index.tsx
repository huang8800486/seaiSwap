import { useEffect, useMemo, useState } from 'react'
import { ChainId, Currency } from '@pancakeswap/sdk'
import Router from 'next/router'
import { Box, Flex, BottomDrawer, useMatchBreakpoints } from '@pancakeswap/uikit'
import Footer from 'components/Menu/Footer'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { EXCHANGE_DOCS_URLS } from 'config/constants'
import { useDefaultsFromURLSearch } from 'state/limitOrders/hooks'
import { AppBody } from 'components/App'

import { useCurrency } from '../../hooks/Tokens'
import { Field } from '../../state/swap/actions'
import { useSwapState, useSingleTokenSwapInfo } from '../../state/swap/hooks'
import { useExchangeChartManager } from '../../state/user/hooks'
import Page from '../Page'
import PriceChartContainer from './components/Chart/PriceChartContainer'

import SwapForm from './components/SwapForm'
import StableSwapFormContainer from './StableSwap'
import { StyledInputCurrencyWrapper, StyledSwapContainer } from './styles'
import SwapTab, { SwapType } from './components/SwapTab'
import SwapNavTitle from './components/SwapNavTitle'
import SwapTitle from './components/SwapTitle/index'
import Liquidity from '../../pages/liquidity'

const CHART_SUPPORT_CHAIN_IDS = [ChainId.BSC]
export const ACCESS_TOKEN_SUPPORT_CHAIN_IDS = [ChainId.BSC]

const STABLE_SUPPORT_CHAIN_IDS = [ChainId.BSC_TESTNET]

export default function Swap() {
  const { isMobile } = useMatchBreakpoints()
  const [isChartExpanded, setIsChartExpanded] = useState(false)
  const [userChartPreference, setUserChartPreference] = useExchangeChartManager(isMobile)
  const [isChartDisplayed, setIsChartDisplayed] = useState(userChartPreference)

  useDefaultsFromURLSearch()

  useEffect(() => {
    setUserChartPreference(isChartDisplayed)
  }, [isChartDisplayed, setUserChartPreference])

  const { chainId } = useActiveWeb3React()

  // swap state & price data
  const {
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState()
  const inputCurrency = useCurrency(inputCurrencyId)
  const outputCurrency = useCurrency(outputCurrencyId)

  const currencies: { [field in Field]?: Currency } = {
    [Field.INPUT]: inputCurrency ?? undefined,
    [Field.OUTPUT]: outputCurrency ?? undefined,
  }

  const singleTokenPrice = useSingleTokenSwapInfo(inputCurrencyId, inputCurrency, outputCurrencyId, outputCurrency)

  const isChartSupported = useMemo(
    () =>
      // avoid layout shift, by default showing
      !chainId || CHART_SUPPORT_CHAIN_IDS.includes(chainId),
    [chainId],
  )

  const isStableSupported = useMemo(() => !chainId || STABLE_SUPPORT_CHAIN_IDS.includes(chainId), [chainId])

  const isAccessTokenSupported = useMemo(() => ACCESS_TOKEN_SUPPORT_CHAIN_IDS.includes(chainId), [chainId])
  const [currentIndex, setCurrentIndex] = useState(0)
  const changeCurrent = (index) => {
    setCurrentIndex(index)
    console.log(index)
  }
  return (
    <>
      <SwapTitle />
      <Page isSwapBg removePadding={isChartExpanded} hideFooterOnDesktop={isChartExpanded}>
        <Flex width="100%" justifyContent="center" position="relative">
          {!isMobile && isChartSupported && (
            <PriceChartContainer
              inputCurrencyId={inputCurrencyId}
              inputCurrency={currencies[Field.INPUT]}
              outputCurrencyId={outputCurrencyId}
              outputCurrency={currencies[Field.OUTPUT]}
              isChartExpanded={isChartExpanded}
              setIsChartExpanded={setIsChartExpanded}
              isChartDisplayed={isChartDisplayed}
              currentSwapPrice={singleTokenPrice}
            />
          )}
          {isChartSupported && (
            <BottomDrawer
              content={
                <PriceChartContainer
                  inputCurrencyId={inputCurrencyId}
                  inputCurrency={currencies[Field.INPUT]}
                  outputCurrencyId={outputCurrencyId}
                  outputCurrency={currencies[Field.OUTPUT]}
                  isChartExpanded={isChartExpanded}
                  setIsChartExpanded={setIsChartExpanded}
                  isChartDisplayed={isChartDisplayed}
                  currentSwapPrice={singleTokenPrice}
                  isMobile
                />
              }
              isOpen={isChartDisplayed}
              setIsOpen={setIsChartDisplayed}
            />
          )}
          <Flex flexDirection="column">
            <StyledSwapContainer $isChartExpanded={isChartExpanded}>
              <StyledInputCurrencyWrapper mt={isChartExpanded ? '24px' : '0'}>
                <AppBody>
                  <SwapNavTitle currentIndex={currentIndex} changeCurrent={changeCurrent} />
                  {currentIndex === 0 && (
                    <SwapTab showStable={isStableSupported}>
                      {(swapTypeState) =>
                        swapTypeState === SwapType.STABLE_SWAP ? (
                          <StableSwapFormContainer
                            setIsChartDisplayed={setIsChartDisplayed}
                            isChartDisplayed={isChartDisplayed}
                          />
                        ) : (
                          <SwapForm
                            isAccessTokenSupported={isAccessTokenSupported}
                            setIsChartDisplayed={setIsChartDisplayed}
                            isChartDisplayed={isChartDisplayed}
                          />
                        )
                      }
                    </SwapTab>
                  )}
                  {currentIndex === 1 && <Liquidity />}
                  {currentIndex === 2 && (
                    <div>
                      <h2>Recent transactions</h2>
                      <p>Please connect your wallet to view your recent transactions</p>
                    </div>
                  )}
                  {/* {currentIndex === 3 && (
                    <div>
                      <h2>Buy and Sell crypto</h2>
                    </div>
                  )} */}
                </AppBody>
              </StyledInputCurrencyWrapper>
            </StyledSwapContainer>
            {isChartExpanded && (
              <Box display={['none', null, null, 'block']} width="100%" height="100%">
                <Footer variant="side" helpUrl={EXCHANGE_DOCS_URLS} />
              </Box>
            )}
          </Flex>
        </Flex>
      </Page>
    </>
  )
}
