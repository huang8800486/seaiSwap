import { Box, Flex, useMatchBreakpoints, Card } from '@pancakeswap/uikit'
import styled from 'styled-components'

export const getMedia = (value: string[]) => () => {
  const { isMobile, isTablet } = useMatchBreakpoints()
  return isMobile ? value[0] : isTablet ? value[1] : value[2]
}
export const getMedia2 = (value: string[]) => () => {
  const { isXl, isLg, isMd, isXs, isSm, isXxl } = useMatchBreakpoints()
  let result = ''
  if (isXxl) {
    result = value[5]
  } else if (isXl) {
    result = value[4]
  } else if (isLg) {
    result = value[3]
  } else if (isMd) {
    result = value[2]
  } else if (isXs) {
    result = value[1]
  } else if (isSm) {
    result = value[0]
  }
  return result
}
export const StyledBodyWrapper = styled(Card)`
  max-width: 436px;
  width: 100%;
  z-index: 1;
  background: #27334d !important;
  border-radius: 0 !important;
  min-width: 320px;
  padding-right: 0;
  padding-left: 0;
`
export const StyledSwapContainer = styled(Flex)<{ $isChartExpanded: boolean }>`
  flex-shrink: 0;
  height: fit-content;
  /* padding: 0 24px; */
  width: 100%;
  margin: 0 auto;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 0 40px;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    ${({ $isChartExpanded }) => ($isChartExpanded ? 'padding: 0 120px' : 'padding: 0 40px')};
  }
`

export const StyledInputCurrencyWrapper = styled(Box)`
  /* width: ${getMedia2(['320px', '340px', '368px', '392px', '392px', '392px'])}; */
  width: 100%;
`
