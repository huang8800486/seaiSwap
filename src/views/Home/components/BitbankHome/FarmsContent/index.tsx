import React from 'react'
import styled from 'styled-components'

import { Text, ArrowForwardIcon } from '@pancakeswap/uikit'
import Link from 'next/link'
import { CommonWrapper, getMedia } from '../styleds'
import SwiperList from './SwiperList/index'
import EarnList from './EarnList/index'
import Launchpools from './Launchpools/index'
import OurBenefits from './OurBenefits/index'

const FarmsWraper = styled.div`
  width: 100%;
  position: relative;
  padding-top: ${getMedia(['18px', '28px', '38px'])};
  background-color: ${({ theme }) => theme.colors.bitbackground};
`
const FarmsTableWrap = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: ${getMedia(['53px', '63px', '73px'])};
  flex-wrap: wrap;
`
const TableItem = styled.div`
  width: ${getMedia(['100%', '48%', '48%'])};
`
const TableTitlte = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  h2 {
    font-size: ${getMedia(['18px', '20px', '24px'])};
  }
  a {
    width: ${getMedia(['20px', '20px', '27px'])};
    height: ${getMedia(['20px', '20px', '27px'])};
    background-color: ${({ theme }) => theme.colors.startFram};
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.primary};
    svg {
      fill: ${({ theme }) => theme.colors.primary};
    }
    transition: all 0.3s ease;
    &:hover {
      opacity: 0.8;
    }
  }
`

export default function FarmsContent() {
  return (
    <FarmsWraper>
      <CommonWrapper>
        <SwiperList />
        <FarmsTableWrap>
          <TableItem>
            <TableTitlte>
              <h2>Earn BTH + Fees in Farms</h2>
              <Link href="/" passHref>
                <Text as="a">
                  <ArrowForwardIcon />
                </Text>
              </Link>
            </TableTitlte>
            <EarnList />
          </TableItem>
          <TableItem>
            <TableTitlte>
              <h2>Launchpools</h2>
              <Link href="/" passHref>
                <Text as="a">
                  <ArrowForwardIcon />
                </Text>
              </Link>
            </TableTitlte>
            <Launchpools />
          </TableItem>
        </FarmsTableWrap>
        <OurBenefits />
      </CommonWrapper>
    </FarmsWraper>
  )
}
