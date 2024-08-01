import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useTranslation } from '@pancakeswap/localization'
import { useMatchBreakpoints, Input, Button, useToast } from '@pancakeswap/uikit'
import { copyText } from '@pancakeswap/utils/copyText'
import CommonItem from './CommonItem'

export const getMedia = (value: string[]) => () => {
  const { isMobile, isTablet } = useMatchBreakpoints()
  return isMobile ? value[0] : isTablet ? value[1] : value[2]
}
export const CommonContent = styled.div`
  .input_wrap {
    margin-bottom: 22px;
    input {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .button_wrap {
    width: 100%;
    padding: 0 20%;
  }
  .invite_content {
    margin-top: 12px;
    span {
      font-size: ${getMedia(['14px', '16px', '18px'])};
      display: block;
      margin-bottom: 14px;
      em {
        color: rgba(2, 196, 244, 1);
        font-style: normal;
      }
    }
  }
`
interface Props {
  isNotRecord?: boolean
}
const CommonInvite: React.FC<React.PropsWithChildren<Props>> = ({ isNotRecord, children }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const [inviteCode, setInviteCode] = useState('')
  useEffect(() => {
    setInviteCode(`${window.location.protocol}//${window.location.host}?inviteCode=${account}`)
  }, [account])
  const { toastError, toastSuccess } = useToast()
  const handleClick = () => {
    copyText(inviteCode, () => {
      toastSuccess('复制成功')
    })
  }
  return (
    <CommonContent>
      <CommonItem title="邀请" imgName="invite_icon" recordHref={!isNotRecord ? '/' : ''} recordText="邀请记录">
        <div className="invite_content">
          <span>
            已邀请人数：<em>1</em>
          </span>
        </div>
        <div className="input_wrap">
          <Input
            disabled
            style={{
              borderRadius: '10px',
              backgroundColor: '#384767',
              borderColor: '#384767',
              color: '#FFFFFF',
              padding: '10px 16px',
              height: '60px',
            }}
            value={!account ? '' : inviteCode}
            placeholder="请链接钱包"
          />
        </div>
        <div className="button_wrap">
          <Button as="a" scale="md" onClick={handleClick} style={{ width: '100%', borderRadius: '0' }}>
            复制链接
          </Button>
        </div>
      </CommonItem>
    </CommonContent>
  )
}

export default CommonInvite
