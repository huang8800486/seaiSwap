import styled from 'styled-components'
import { PageMeta } from 'components/Layout/Page'
import BitBanner from './components/BitbankHome/BitBanner'
import IntroContent from './components/BitbankHome/IntroContent'

const BitWraper = styled.div`
  width: 100%;
  position: relative;
  background: ${({ theme }) => theme.colors.bitbackground};
  color: #fff;
`
const Home: React.FC<React.PropsWithChildren> = () => {
  return (
    <>
      <PageMeta />
      <BitWraper>
        <BitBanner />
        <IntroContent/>
      </BitWraper>
    </>
  )
}

export default Home
