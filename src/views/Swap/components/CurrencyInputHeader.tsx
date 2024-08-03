import styled from 'styled-components'
import {
  ChartIcon,
  Flex,
  Box,
  Button,
  Heading,
  HistoryIcon,
  IconButton,
  NotificationDot,
  Text,
  useModal,
  ChartDisableIcon,
} from '@pancakeswap/uikit'
import TransactionsModal from 'components/App/Transactions/TransactionsModal'
import GlobalSettings from 'components/Menu/GlobalSettings'
import { useExpertModeManager } from 'state/user/hooks'
import RefreshIcon from 'components/Svg/RefreshIcon'
import { ReactElement, useCallback } from 'react'
import SettingsModal from '../../../components/Menu/GlobalSettings/SettingsModal'
import { SettingsMode } from '../../../components/Menu/GlobalSettings/types'

interface Props {
  title: string | ReactElement
  subtitle: string
  noConfig?: boolean
  setIsChartDisplayed?: React.Dispatch<React.SetStateAction<boolean>>
  isChartDisplayed?: boolean
  hasAmount: boolean
  onRefreshPrice: () => void
}

const CurrencyInputContainer = styled(Flex)`
  flex-direction: column;
  align-items: center;
  padding: 24px 1rem 0;
  width: 100%;
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder}; */
`

const ColoredIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.colors.textSubtle};
`

const CurrencyInputHeader: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  subtitle,
  setIsChartDisplayed,
  isChartDisplayed,
  hasAmount,
  onRefreshPrice,
}) => {
  const [expertMode] = useExpertModeManager()
  const [onPresentSettingsModal] = useModal(<SettingsModal mode={SettingsMode.SWAP_LIQUIDITY} />)
  const toggleChartDisplayed = () => {
    setIsChartDisplayed((currentIsChartDisplayed) => !currentIsChartDisplayed)
  }
  const [onPresentTransactionsModal] = useModal(<TransactionsModal />)
  const handleOnClick = useCallback(() => onRefreshPrice?.(), [onRefreshPrice])

  return (
    <CurrencyInputContainer>
      <Flex width="100%" alignItems="center" justifyContent="space-between">
        {/* {setIsChartDisplayed && (
          <ColoredIconButton onClick={toggleChartDisplayed} variant="text" scale="sm">
            {isChartDisplayed ? <ChartDisableIcon color="textSubtle" /> : <ChartIcon width="24px" color="textSubtle" />}
          </ColoredIconButton>
        )} */}
        <Flex flexDirection="column" width="100%" mr={18}>
          <Heading as="h2" textAlign="left" color="textSubtle2" fontSize="16px!important;" marginRight="32px">
            <Flex width="100%" alignItems="center">
              <Box width="36px" height="36px" marginRight="11px">
                <img className="title_img" src="/images/icons/trade_icon.png" alt="" />
              </Box>
              {title}
            </Flex>
          </Heading>
        </Flex>
        <Flex>
          {/* {setIsChartDisplayed && (
            <ColoredIconButton onClick={toggleChartDisplayed} variant="text" scale="sm">
              {isChartDisplayed ? (
                <ChartDisableIcon color="textSubtle2" />
              ) : (
                <ChartIcon width="24px" color="textSubtle2" />
              )}
            </ColoredIconButton>
          )} */}
          <NotificationDot show={expertMode}>
            <Flex>
              <Text
                onClick={onPresentSettingsModal}
                style={{
                  position: 'absolute',
                  right: '0',
                  top: '5px',
                  background: '#02C4F4',
                  borderRadius: '20px',
                  color: '#333333',
                  textAlign: 'center',
                  padding: '2px 18px',
                  whiteSpace: 'nowrap',
                  zIndex: '1',
                  display: 'flex',
                  alignItems: 'center',
                }}
                fontSize="12px"
              >
                设置滑点
                <img style={{ width: '14px', marginLeft: '2px' }} src="/images/icons/setting.png" alt="" />
              </Text>
              <GlobalSettings color="textSubtle2" mr="0" mode={SettingsMode.SWAP_LIQUIDITY} />
            </Flex>
          </NotificationDot>
          {/* <IconButton onClick={onPresentTransactionsModal} variant="text" scale="sm">
            <HistoryIcon color="textSubtle2" width="24px" />
          </IconButton> */}
          {/* <IconButton variant="text" scale="sm" onClick={handleOnClick}>
            <RefreshIcon disabled={!hasAmount} color="textSubtle2" width="27px" />
          </IconButton> */}
        </Flex>
      </Flex>
      {/* <Flex alignItems="center">
        <Text color="#CCCCCC" fontSize="14px">
          {subtitle}
        </Text>
      </Flex> */}
    </CurrencyInputContainer>
  )
}

export default CurrencyInputHeader
