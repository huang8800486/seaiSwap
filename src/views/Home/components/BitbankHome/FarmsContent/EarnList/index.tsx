import React, { useState } from 'react'
import { Text, useTooltip } from '@pancakeswap/uikit'
import Link from 'next/link'
import { useTranslation } from '@pancakeswap/localization'
import QuestionHelper from 'components/QuestionHelper'
import ImportApyModal from './ApyModal'
import { EarnWrapper } from './styleds'

export default function EarnList() {
  const { t } = useTranslation()
  const [showConfirmApyModal, setShowConfirmApyModal] = useState(0)
  return (
    <EarnWrapper>
      <div className="item_list_wrap earn_list_wrap">
        <div className="item_box">
          <div className="item_title">
            <div className="logo_img">
              <img src="/images/bitbank/usdt.png" alt="" />
              <img src="/images/bitbank/logo.png" alt="" />
            </div>
            <div className="tits">
              <span>USDT-BTH</span>
            </div>
          </div>
          <div className="item_center">
            <div className="apy_box">
              <span>APY</span>
              <Text
                className="item_apy"
                onClick={() => {
                  setShowConfirmApyModal(1)
                }}
              >
                <img src="/images/bitbank/apy_icon.png" alt="" />
              </Text>
              {showConfirmApyModal === 1 && (
                <ImportApyModal
                  setShowConfirmApyModal={setShowConfirmApyModal}
                  apyList={[
                    {
                      timeframe: '1d',
                      roi: '0.08%',
                      per: '4.39 BTH',
                    },
                    {
                      timeframe: '7d',
                      roi: '0.54%',
                      per: '30.76 BTH',
                    },
                  ]}
                />
              )}
            </div>
            <div className="question_box">
              <span>38.82%</span>
              <div className="item_question">
                <QuestionHelper
                  text={t(
                    'Setting a high slippage tolerance can help transactions succeed, but you may not get such a good price. Use with caution.',
                  )}
                  placement="top-start"
                />
              </div>
            </div>
          </div>
          <div className="item_button">
            <Link href="/" passHref>
              <Text as="a">Start Farm</Text>
            </Link>
          </div>
        </div>
        <div className="item_box">
          <div className="item_title">
            <div className="logo_img">
              <img src="/images/bitbank/usdt.png" alt="" />
              <img src="/images/bitbank/logo.png" alt="" />
            </div>
            <span>USDT-BTH</span>
          </div>
          <div className="item_center">
            <div className="apy_box">
              <span>APY</span>
              <Text
                className="item_apy"
                onClick={() => {
                  setShowConfirmApyModal(2)
                }}
              >
                <img src="/images/bitbank/apy_icon.png" alt="" />
              </Text>
              {showConfirmApyModal === 2 && (
                <ImportApyModal
                  setShowConfirmApyModal={setShowConfirmApyModal}
                  apyList={[
                    {
                      timeframe: '1d',
                      roi: '0.08%',
                      per: '4.39 BTH',
                    },
                    {
                      timeframe: '7d',
                      roi: '0.54%',
                      per: '30.76 BTH',
                    },
                    {
                      timeframe: '11d',
                      roi: '0.54%',
                      per: '30.76 BTH',
                    },
                  ]}
                />
              )}
            </div>
            <div className="question_box">
              <span>38.82%</span>
              <div className="item_question">
                <QuestionHelper
                  text={t(
                    'Setting a high slippage tolerance can help transactions succeed, but you may not get such a good price. Use with caution.',
                  )}
                  placement="top-start"
                />
              </div>
            </div>
          </div>
          <div className="item_button">
            <Link href="/" passHref>
              <Text as="a">Start Farm</Text>
            </Link>
          </div>
        </div>
      </div>
    </EarnWrapper>
  )
}
