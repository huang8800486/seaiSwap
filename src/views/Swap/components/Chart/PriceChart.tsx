import { useState, useEffect, useMemo } from 'react'
import {
  // Button,
  ExpandIcon,
  Flex,
  IconButton,
  ShrinkIcon,
  SyncAltIcon,
  Text,
  // TradingViewIcon,
  // LineGraphIcon,
  // useMatchBreakpoints,
} from '@pancakeswap/uikit'
import { CurrencyLogo, DoubleCurrencyLogo } from 'components/Logo'
import { FACTORY_ADDRESS, Pair } from '@pancakeswap/sdk'
import bitfactoryAbi from 'config/abi/bitfactory.json'
import { getContract } from 'utils/contractHelpers'
import { useSigner } from 'wagmi'
import { useWeb3React } from '@pancakeswap/wagmi'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCurrency } from 'hooks/Tokens'
import { usePair } from 'hooks/usePairs'
// import { TradingViewLabel } from 'components/TradingView'
// import { useTranslation } from '@pancakeswap/localization'
import { ChartViewMode } from 'state/user/actions'
import { useDerivedSwapInfo, useSwapState } from 'state/swap/hooks'
import { useExchangeChartViewManager } from 'state/user/hooks'
import { Field } from 'state/swap/actions'
import { currencyId } from 'utils/currencyId'
// import { Pair } from '../../../../../packages/swap-sdk/src/entities/pair'
// import styled from 'styled-components'
import BasicChart from './BasicChart'
import { StyledPriceChart } from './styles'
// import TradingViewChart from './TradingViewChart'
// import PairPriceDisplay from '../../../../components/PairPriceDisplay'

// const ChartButton = styled(Button)`
//   background-color: ${({ $active, theme }) => $active && `${theme.colors.primary}0f`};
//   padding: 4px 8px;
//   border-radius: 6px;
// `

const PriceChart = ({
  inputCurrency,
  outputCurrency,
  onSwitchTokens,
  isDark,
  isChartExpanded,
  setIsChartExpanded,
  isMobile,
  isFullWidthContainer,
  token0Address,
  token1Address,
  currentSwapPrice,
}) => {
  // const { isDesktop } = useMatchBreakpoints()
  const toggleExpanded = () => setIsChartExpanded((currentIsExpanded) => !currentIsExpanded)
  const [chartView] = useExchangeChartViewManager()
  // const [chartView, setChartView] = useExchangeChartViewManager()
  // const [twChartSymbol, setTwChartSymbol] = useState('')
  const [bitInstan, setBitInstan] = useState<any>(null)
  // const { t } = useTranslation()

  // const handleTwChartSymbol = useCallback((symbol) => {
  //   setTwChartSymbol(symbol)
  // }, [])
  const [curentAddress, setCurentAddress] = useState('')
  const { data: signer } = useSigner()
  const { chainId } = useActiveWeb3React()
  const { account } = useWeb3React()
  const {
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState()
  const currencyA = useCurrency(inputCurrencyId)
  const currencyB = useCurrency(outputCurrencyId)
  const bitPoolContract = useMemo(() => {
    return getContract({ abi: bitfactoryAbi, address: FACTORY_ADDRESS, signer })
  }, [signer])
  useEffect(() => {
    if (bitPoolContract && token0Address && token1Address) {
      console.log('getPairtoken0Address, ', token0Address)
      console.log('getPairtoken1Address, ', token1Address)
      bitPoolContract
        .getPair(token0Address, token1Address)
        .then((result) => {
          console.log('getPair', result)
          setCurentAddress(result)
        })
        .catch((err) => {
          console.log('getPairErroer', err)
        })
    }
  }, [bitPoolContract, token0Address, token1Address])
  return (
    <StyledPriceChart
      height={chartView === ChartViewMode.TRADING_VIEW ? '100%' : '70%'}
      overflow={chartView === ChartViewMode.TRADING_VIEW ? 'hidden' : 'unset'}
      $isDark={isDark}
      $isExpanded={isChartExpanded}
      $isFullWidthContainer={isFullWidthContainer}
    >
      <iframe
        id="dextools-widget"
        title="DEXTools Trading Chart"
        width="100%"
        height="100%"
        src={`https://www.dextools.io/widget-chart/cn/bnb/pe-light/${curentAddress}?theme=light&chartType=1&chartResolution=30&drawingToolbars=false`}
      />
      {/* {chartView === ChartViewMode.TRADING_VIEW && (
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          height={isMobile ? '100%' : isChartExpanded ? 'calc(100% - 48px)' : '458px'}
          pt="12px"
        >
          <Flex justifyContent="space-between" alignItems="baseline" flexWrap="wrap">
            <PairPriceDisplay
              value={currentSwapPrice?.[token0Address]}
              inputSymbol={inputCurrency?.symbol}
              outputSymbol={outputCurrency?.symbol}
              mx="24px"
            />
            {twChartSymbol && <TradingViewLabel symbol={twChartSymbol} />}
          </Flex>
          <TradingViewChart
            // unmount the whole component when symbols is changed
            key={`${inputCurrency?.symbol}-${outputCurrency?.symbol}`}
            inputSymbol={inputCurrency?.symbol}
            outputSymbol={outputCurrency?.symbol}
            isDark={isDark}
            onTwChartSymbol={handleTwChartSymbol}
          />
        </Flex>
      ) */}
    </StyledPriceChart>
  )
}

export default PriceChart
