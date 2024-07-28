import { useMatchBreakpoints } from '@pancakeswap/uikit'
import styled, { css } from 'styled-components'

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
export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  background-color: ${({ theme }) => theme.colors.bitbackground};
  font-size: ${getMedia(['12px', '14px', '16px'])};
  color: #fff;
`
export const CommonWrapper = styled.div`
  width: 100%;
  max-width: 1132px;
  padding: ${getMedia(['0 21px', '0 21px', '0'])};
  margin: 0 auto;
  position: relative;
`
