import styled from 'styled-components'
import { Card } from '@pancakeswap/uikit'

export const BodyWrapper = styled(Card)`
  max-width: 436px;
  width: 100%;
  z-index: 1;
  background: #27334d !important;
  border-radius: 0 !important;
  min-width: 320px;
  padding-right: 0;
  padding-left: 0;
  margin: 0 auto;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
