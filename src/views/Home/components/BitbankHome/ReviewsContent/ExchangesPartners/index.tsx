import React from 'react'
import styled from 'styled-components'
import { getMedia } from '../../styleds'
import PartnersSwiper from './PartnersSwiper'

const PartnersWrapper = styled.div`
  width: 100%;
  position: relative;
  .partner_content {
    width: 100%;
    position: relative;
    padding-bottom: ${getMedia(['16px', '36px', '56px'])};
    .partner_title {
      width: 100%;
      position: relative;
      font-size: ${getMedia(['24px', '28px', '32px'])};
      text-align: center;
      margin-bottom: ${getMedia(['24px', '28px', '32px'])};
    }
  }
`

export default function ExchangesPartners() {

  const ExchangeList = [
    {
      image: '/images/bitbank/icon/Bitcoin.svg',
      activeImage: '/images/bitbank/icon/Bitcoin_focus.svg',
    },
    {
      image: '/images/bitbank/icon/BusinessInsider.svg',
      activeImage: '/images/bitbank/icon/BusinessInsider_focus.svg',
    },
    {
      image: '/images/bitbank/icon/Coindesk.svg',
      activeImage: '/images/bitbank/icon/Coindesk_focus.svg',
    },
    {
      image: '/images/bitbank/icon/CoinEdition.svg',
      activeImage: '/images/bitbank/icon/CoinEdition_focus.svg',
    },
    {
      image: '/images/bitbank/icon/CryptoDaily.svg',
      activeImage: '/images/bitbank/icon/CryptoDaily_focus.svg',
    },
    {
      image: '/images/bitbank/icon/CT.svg',
      activeImage: '/images/bitbank/icon/CT_focus.svg',
    },
    {
      image: '/images/bitbank/icon/FinanceMagnates.svg',
      activeImage: '/images/bitbank/icon/FinanceMagnates_focus.svg',
    },
    {
      image: '/images/bitbank/icon/Investing.svg',
      activeImage: '/images/bitbank/icon/Investing_focus.svg',
    },
    {
      image: '/images/bitbank/icon/Kasobu.svg',
      activeImage: '/images/bitbank/icon/Kasobu_focus.svg',
    },
    {
      image: '/images/bitbank/icon/SCMP.svg',
      activeImage: '/images/bitbank/icon/SCMP_focus.svg',
    },
    {
      image: '/images/bitbank/icon/TET.svg',
      activeImage: '/images/bitbank/icon/TET_focus.svg',
    },
    {
      image: '/images/bitbank/icon/TIA.svg',
      activeImage: '/images/bitbank/icon/TIA_focus.svg',
    },
  ]
  return (
    <PartnersWrapper>
      <div className="partner_content">
        <div className="partner_title">WebxBank Partners</div>
        <div className="partner_list">
          <PartnersSwiper swiperList={ExchangeList} />
        </div>
      </div>
      {/* <div className="partner_content">
        <div className="partner_title">Bitwap Partners</div>
        <div className="partner_list">
          <PartnersSwiper swiperList={PartnersList} />
        </div>
      </div> */}
    </PartnersWrapper>
  )
}
