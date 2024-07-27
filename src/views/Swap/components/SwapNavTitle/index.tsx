import styled from 'styled-components'
import { Box, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'

const Wrapper = styled(Box)<{ isMobile: boolean }>`
  display: flex;
  width: 100%;
  height: ${({ isMobile }) => (isMobile ? '64px' : 'auto')};
`
const NavListWrap = styled(Box)`
  // background: var(--colors-primary);
  display: flex;
  padding: 11px 5px;
  width: 100%;
`
const NavItem = styled.a<{ isMobile: boolean; isCurrent: boolean }>`
  flex: 1;
  text-align: center;
  width: 100%;
  padding: ${({ isMobile }) => (isMobile ? '5px 0' : '10px 0')};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  &:hover {
    &:before {
      opacity: 1;
    }
  }
  &:before {
    transition: all 0.3s ease;
    opacity: ${({ isCurrent }) => (isCurrent ? '1' : '0')};
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate3d(-50%, 0, 0);
    height: ${({ isMobile }) => (isMobile ? '2px' : '2px')};
    border-radius: ${({ isMobile }) => (isMobile ? '2px' : '2px')};
    width: 40px;
    background: var(--colors-primary);
  }
`
interface PageProps {
  currentIndex: number
  changeCurrent: any
}
const SwapNavTitle: React.FC<React.PropsWithChildren<PageProps>> = ({ currentIndex, changeCurrent }) => {
  const { isMobile } = useMatchBreakpoints()
  const { t } = useTranslation()
  const config = [
    {
      text: t('Swap'),
      id: 0,
    },
    {
      text: t('Liquidity'),
      id: 1,
    },
    {
      text: t('History'),
      id: 2,
    },
    // {
    //   text: t('Buy Crypto'),
    //   id: 3,
    // },
  ]
  return (
    <>
      <Wrapper isMobile={isMobile}>
        <NavListWrap>
          {config.map((item, index) => {
            return (
              <NavItem
                isMobile={isMobile}
                isCurrent={currentIndex === index}
                onClick={() => {
                  changeCurrent(index)
                }}
                key={item.id}
              >
                {item.text}
              </NavItem>
            )
          })}
        </NavListWrap>
      </Wrapper>
    </>
  )
}
export default SwapNavTitle
