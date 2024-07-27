import { useState, useEffect, useCallback } from 'react'
import { Modal, Box, Text, InjectedModalProps } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'

const ApyWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 13px 8px;
  border-radius: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.bitColor};
  &.apy_0 {
    color: rgb(112, 141, 183);
    font-size: 12px;
  }
  :nth-child(2n) {
    background-color: ${({ theme }) => theme.colors.apyBox};
  }
`
const ApyItem = styled.div`
  position: relative;
  flex: 1;
`

interface Props extends InjectedModalProps {
  apyList: any[]
  setShowConfirmApyModal: (number) => void
}

const ImportApyModal: React.FC<React.PropsWithChildren<Props>> = ({ apyList, setShowConfirmApyModal }) => {
  const { t } = useTranslation()
  const [currentList, setCurrentList] = useState([])

  const isMatchDateis = useCallback(() => {
    setCurrentList([
      {
        timeframe: 'Timeframe',
        roi: 'Roi',
        per: 'BTH per $1 000',
      },
      ...apyList,
    ])
  }, [apyList])

  useEffect(() => {
    isMatchDateis()
  }, [isMatchDateis])
  return (
    <>
      <Modal left={['-16px']} minWidth={['320px']} title={t('ROI')} onDismiss={() => setShowConfirmApyModal(-1)}>
        <Text fontSize={12} mb={20}>
          Calculated based on current rates. Rates are estimates provided for your convenience only, and by no means
          represent guaranteed returns.
        </Text>
        <Box>
          {currentList.map((item, index) => {
            const apyKey = `Apy${index}`
            return (
              <ApyWrapper className={`apy_pop_list apy_${index}`} key={apyKey}>
                <ApyItem>{item.timeframe}</ApyItem>
                <ApyItem>{item.roi}</ApyItem>
                <ApyItem>{item.per}</ApyItem>
              </ApyWrapper>
            )
          })}
        </Box>
      </Modal>
    </>
  )
}

export default ImportApyModal
