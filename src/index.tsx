import styled from 'styled-components'
import { useEffect, useState, ReactNode, useMemo } from 'react'
import { useWeb3React } from '@pancakeswap/wagmi'
import { BLOCKED_ADDRESSES } from './config/constants'
import ListsUpdater from './state/lists/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'

const BaseLayout = styled.div`
  width: 100%;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  justify-content: center;
  z-index: 1030;

  img {
    width: 100%;
    max-width: 511px;
    display: block;
    margin-top: -10%;
  }
`
export function Updaters() {
  const [isMounted, setIsMounted] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setIsMounted(false)
    }, 7000)
  }, [])
  return (
    <>
      {isMounted && (
        <BaseLayout>
          <img src="/images/start.gif" alt="" />
        </BaseLayout>
      )}
      <ListsUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
    </>
  )
}

export function Blocklist({ children }: { children: ReactNode }) {
  const { account } = useWeb3React()
  const blocked: boolean = useMemo(() => Boolean(account && BLOCKED_ADDRESSES.indexOf(account) !== -1), [account])
  if (blocked) {
    return <div>Blocked address</div>
  }
  return <>{children}</>
}
