import { SetStateAction, useCallback, useEffect, useState, Dispatch, useMemo } from 'react'
import styled from 'styled-components'
import { Currency, CurrencyAmount } from '@pancakeswap/sdk'
import {
  Button,
  Text,
  ArrowDownIcon,
  Box,
  IconButton,
  ArrowUpDownIcon,
  ArrowNewDowIcon,
  Skeleton,
} from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { formatUnits } from '@ethersproject/units'
import { useIsTransactionUnsupported } from 'hooks/Trades'
import UnsupportedCurrencyFooter from 'components/UnsupportedCurrencyFooter'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from '@pancakeswap/localization'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { useSwapActionHandlers } from 'state/swap/useSwapActionHandlers'
// import AccessRisk from 'views/Swap/components/AccessRisk'

import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { CommonBasesType } from 'components/SearchModal/types'
import { AutoRow, RowBetween } from 'components/Layout/Row'
import { AutoColumn } from 'components/Layout/Column'

import { useCurrency } from 'hooks/Tokens'
import { ApprovalState, useApproveCallbackFromTrade } from 'hooks/useApproveCallback'
import useWrapCallback, { WrapType } from 'hooks/useWrapCallback'

import { Field } from 'state/swap/actions'
import { useDerivedSwapInfo, useSwapState } from 'state/swap/hooks'
import { useExpertModeManager, useUserSlippageTolerance } from 'state/user/hooks'

import replaceBrowserHistory from '@pancakeswap/utils/replaceBrowserHistory'
import { currencyId } from 'utils/currencyId'

import { useCurrencyBalance } from '../../../state/wallet/hooks'
import CurrencyInputHeader from './CurrencyInputHeader'
import SwapCommitButton from './SwapCommitButton'
import useWarningImport from '../hooks/useWarningImport'
import useRefreshBlockNumberID from '../hooks/useRefreshBlockNumber'
import AddressInputPanel from './AddressInputPanel'
import AdvancedSwapDetailsDropdown from './AdvancedSwapDetailsDropdown'
import TradePrice from './TradePrice'
// import GasSettings from '../../../components/Menu/GlobalSettings/GasSettings'
import { ArrowWrapper, Wrapper } from './styleds'

const Label = styled(Text)`
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.secondary};
`

const SwitchIconButton = styled(IconButton)`
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1);
  .icon-up-down {
    display: none;
  }
  background: none !important;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    .icon-down {
      display: none;
      fill: white;
    }
    .icon-up-down {
      display: block;
      fill: white;
    }
  }
`

interface SwapForm {
  isChartExpanded: boolean
  isChartDisplayed: boolean
  setIsChartDisplayed: Dispatch<SetStateAction<boolean>>
}

export default function SwapForm({ setIsChartDisplayed, isChartDisplayed, isAccessTokenSupported }) {
  const { t } = useTranslation()
  const { refreshBlockNumber, isLoading } = useRefreshBlockNumberID()
  const warningSwapHandler = useWarningImport()

  const { account, chainId } = useActiveWeb3React()

  // for expert mode
  const [isExpertMode] = useExpertModeManager()

  // get custom setting values for user
  const [allowedSlippage] = useUserSlippageTolerance()
  // max
  const [currentMax, setCurrentMax] = useState(-1)
  const maxList = [
    { text: '10%', value: 10 },
    { text: '25%', value: 25 },
    { text: '50%', value: 50 },
    { text: '75%', value: 75 },
    { text: 'Max', value: 100 },
  ]
  // swap state & price data
  const {
    independentField,
    typedValue,
    recipient,
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState()
  const inputCurrency = useCurrency(inputCurrencyId)
  const outputCurrency = useCurrency(outputCurrencyId)

  const currencies: { [field in Field]?: Currency } = useMemo(
    () => ({
      [Field.INPUT]: inputCurrency ?? undefined,
      [Field.OUTPUT]: outputCurrency ?? undefined,
    }),
    [inputCurrency, outputCurrency],
  )
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currencies[Field.INPUT] ?? undefined)

  const {
    v2Trade,
    currencyBalances,
    parsedAmount,
    inputError: swapInputError,
  } = useDerivedSwapInfo(independentField, typedValue, inputCurrency, outputCurrency, recipient)
  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const trade = showWrap ? undefined : v2Trade

  const parsedAmounts = showWrap
    ? {
        [Field.INPUT]: parsedAmount,
        [Field.OUTPUT]: parsedAmount,
      }
    : {
        [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
        [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
      }

  const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()

  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput],
  )
  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value)
    },
    [onUserInput],
  )

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }
  // console.log('formattedAmounts', typedValue, independentField, Field.INPUT, parsedAmounts)
  // console.log('parsedAmounts[independentField]?.toExact()', parsedAmounts[independentField]?.toExact())
  // console.log('parsedAmounts[dependentField]?.toSignificant(6))', parsedAmounts[dependentField]?.toSignificant(6))

  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage, chainId)

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted])

  const maxAmountInput: CurrencyAmount<Currency> | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const atMaxAmountInput = Boolean(maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput))

  // errors
  const [showInverted, setShowInverted] = useState<boolean>(false)

  const handleInputSelect = useCallback(
    (currencyInput) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, currencyInput)

      warningSwapHandler(currencyInput)

      replaceBrowserHistory('inputCurrency', currencyId(currencyInput))
    },
    [onCurrencySelection, warningSwapHandler],
  )

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      // console.log('maxAmountInput.toExact()', maxAmountInput.toExact())
      onUserInput(Field.INPUT, maxAmountInput.toExact())
    }
  }, [maxAmountInput, onUserInput])

  const onSetMax = useCallback(
    (sliderPercent: number, index: number) => {
      // console.log('maxAmountInput', selectedCurrencyBalance?.toSignificant(selectedCurrencyBalance?.currency?.decimals))
      if (maxAmountInput) {
        const amount = new BigNumber(
          selectedCurrencyBalance?.toSignificant(selectedCurrencyBalance?.currency?.decimals),
        )
        const bigs = amount.dividedBy(100).multipliedBy(sliderPercent)
        // console.log('value', selectedCurrencyBalance?.toSignificant(selectedCurrencyBalance?.currency.decimals))
        const value = bigs.toFixed(selectedCurrencyBalance?.currency?.decimals)
        // console.log('value', value)
        onUserInput(Field.INPUT, `${value}`)
      }
      setCurrentMax(index)
    },
    [maxAmountInput, onUserInput, selectedCurrencyBalance],
  )

  const handleOutputSelect = useCallback(
    (currencyOutput) => {
      onCurrencySelection(Field.OUTPUT, currencyOutput)
      warningSwapHandler(currencyOutput)

      replaceBrowserHistory('outputCurrency', currencyId(currencyOutput))
    },

    [onCurrencySelection, warningSwapHandler],
  )

  const swapIsUnsupported = useIsTransactionUnsupported(currencies?.INPUT, currencies?.OUTPUT)

  const hasAmount = Boolean(parsedAmount)

  const onRefreshPrice = useCallback(() => {
    if (hasAmount) {
      refreshBlockNumber()
    }
  }, [hasAmount, refreshBlockNumber])

  const isShowAccessToken = useMemo(() => {
    return isAccessTokenSupported && !currencies[Field.OUTPUT]?.isNative
  }, [isAccessTokenSupported, currencies])

  return (
    <>
      <>
        <CurrencyInputHeader
          title={t('Swap')}
          subtitle={t('Trade tokens in an instant')}
          setIsChartDisplayed={setIsChartDisplayed}
          isChartDisplayed={isChartDisplayed}
          hasAmount={hasAmount}
          onRefreshPrice={onRefreshPrice}
        />
        <Wrapper id="swap-page" style={{ minHeight: '388px' }}>
          <AutoColumn gap="sm">
            <CurrencyInputPanel
              label={independentField === Field.OUTPUT && !showWrap && trade ? t('From (estimated)') : t('From')}
              value={formattedAmounts[Field.INPUT]}
              showMaxButton={!atMaxAmountInput}
              currency={currencies[Field.INPUT]}
              onUserInput={handleTypeInput}
              onMax={handleMaxInput}
              onCurrencySelect={handleInputSelect}
              otherCurrency={currencies[Field.OUTPUT]}
              id="swap-currency-input"
              showCommonBases
              commonBasesType={CommonBasesType.SWAP_LIMITORDER}
            />

            {account && currencies[Field.INPUT] && (
              <Box style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                {maxList.map((item, index) => (
                  <Button
                    ml="5px"
                    scale="xs"
                    onClick={() => onSetMax(item.value, index)}
                    style={{
                      textTransform: 'uppercase',
                      borderRadius: '12px',
                      color: '#CCCCCC',
                      background: '#27334d',
                      padding: '0 11px',
                      border: '1px solid #384767',
                      borderColor: currentMax === index ? '#02C4F4' : '#384767',
                      boxShadow: 'none',
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
                {/* <Button scale="xs" variant="secondary" style={{ textTransform: 'uppercase' }}>
                  10%
                </Button>
                <Button scale="xs" variant="secondary" style={{ textTransform: 'uppercase' }}>
                  25%
                </Button>
                <Button scale="xs" variant="secondary" style={{ textTransform: 'uppercase' }}>
                  50%
                </Button>
                <Button scale="xs" variant="secondary" style={{ textTransform: 'uppercase' }}>
                  75%
                </Button>
                <Button scale="xs" variant="secondary" style={{ textTransform: 'uppercase' }}>
                  {t('Max')}
                </Button> */}
              </Box>
            )}
            <AutoColumn justify="space-between">
              <AutoRow justify={isExpertMode ? 'space-between' : 'center'} style={{ padding: '0 1rem' }}>
                <SwitchIconButton
                  variant="light"
                  scale="sm"
                  onClick={() => {
                    setApprovalSubmitted(false) // reset 2 step UI for approvals
                    onSwitchTokens()
                  }}
                >
                  <Box width="24px">
                    <img src="/images/icons/switch_icon.png" alt="" />
                  </Box>
                  {/* <ArrowDownIcon
                    className="icon-down"
                    color={currencies[Field.INPUT] && currencies[Field.OUTPUT] ? 'primary' : 'text'}
                  />
                  <ArrowUpDownIcon
                    className="icon-up-down"
                    color={currencies[Field.INPUT] && currencies[Field.OUTPUT] ? 'primary' : 'text'}
                  /> */}
                </SwitchIconButton>
                {recipient === null && !showWrap && isExpertMode ? (
                  <Button variant="text" id="add-recipient-button" onClick={() => onChangeRecipient('')}>
                    {t('+ Add a send (optional)')}
                  </Button>
                ) : null}
              </AutoRow>
            </AutoColumn>
            <CurrencyInputPanel
              value={formattedAmounts[Field.OUTPUT]}
              onUserInput={handleTypeOutput}
              label={independentField === Field.INPUT && !showWrap && trade ? t('To (estimated)') : t('To')}
              showMaxButton={false}
              currency={currencies[Field.OUTPUT]}
              onCurrencySelect={handleOutputSelect}
              otherCurrency={currencies[Field.INPUT]}
              id="swap-currency-output"
              showCommonBases
              commonBasesType={CommonBasesType.SWAP_LIMITORDER}
            />

            {/* <Box style={{ display: isShowAccessToken ? 'block' : 'none' }}>
              <AccessRisk currency={currencies[Field.OUTPUT]} />
            </Box> */}

            {isExpertMode && recipient !== null && !showWrap ? (
              <>
                <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
                  <ArrowWrapper clickable={false}>
                    <ArrowDownIcon width="16px" />
                  </ArrowWrapper>
                  <Button variant="text" id="remove-recipient-button" onClick={() => onChangeRecipient(null)}>
                    {t('- Remove send')}
                  </Button>
                </AutoRow>
                <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} />
              </>
            ) : null}

            {showWrap ? null : (
              <AutoColumn gap="7px" style={{ padding: '0 16px' }}>
                <RowBetween align="center">
                  {Boolean(trade) && (
                    <>
                      <Label>{t('Price')}</Label>
                      {isLoading ? (
                        <Skeleton width="100%" ml="8px" height="24px" />
                      ) : (
                        <TradePrice
                          price={trade?.executionPrice}
                          showInverted={showInverted}
                          setShowInverted={setShowInverted}
                        />
                      )}
                    </>
                  )}
                </RowBetween>
                <RowBetween align="center">
                  <Label>{t('Slippage Tolerance')}</Label>
                  <Text bold color="primary">
                    {allowedSlippage / 100}%
                  </Text>
                </RowBetween>
              </AutoColumn>
            )}
          </AutoColumn>
          <Box mt="0.25rem" style={{ textAlign: 'center' }}>
            <SwapCommitButton
              swapIsUnsupported={swapIsUnsupported}
              account={account}
              showWrap={showWrap}
              wrapInputError={wrapInputError}
              onWrap={onWrap}
              wrapType={wrapType}
              parsedIndepentFieldAmount={parsedAmounts[independentField]}
              approval={approval}
              approveCallback={approveCallback}
              approvalSubmitted={approvalSubmitted}
              currencies={currencies}
              isExpertMode={isExpertMode}
              trade={trade}
              swapInputError={swapInputError}
              currencyBalances={currencyBalances}
              recipient={recipient}
              allowedSlippage={allowedSlippage}
              onUserInput={onUserInput}
            />
          </Box>
          {/* {chainId === ChainId.BSC && <GasSettings hideTitle/>} */}
        </Wrapper>
        {!swapIsUnsupported ? (
          trade && <AdvancedSwapDetailsDropdown trade={trade} />
        ) : (
          <UnsupportedCurrencyFooter currencies={[currencies.INPUT, currencies.OUTPUT]} />
        )}
      </>
    </>
  )
}
