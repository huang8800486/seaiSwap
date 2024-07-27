import { useMatchBreakpoints } from '@pancakeswap/uikit'
import styled, { css } from 'styled-components'

export const getMedia = (value: string[]) => () => {
  const { isMobile, isTablet } = useMatchBreakpoints()
  return isMobile ? value[0] : isTablet ? value[1] : value[2]
}

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  background-color: ${({ theme }) => theme.colors.bitbackground};
  font-size: ${getMedia(['12px', '14px', '16px'])};
  margin-top: -1px;
`
export const CommonWrapper = styled.div`
  width: 100%;
  max-width: 1132px;
  padding: 0 16px;
  margin: 0 auto;
  position: relative;
`
