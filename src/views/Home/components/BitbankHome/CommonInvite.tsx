import React, { useMemo, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@pancakeswap/wagmi'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from '@pancakeswap/localization'
import { useSigner } from 'wagmi'
import { INVITED_ADDRESS } from '@pancakeswap/sdk'
import { getContract } from 'utils/contractHelpers'
import seaiInvited from 'config/abi/seaiInvited.json'
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
  const { chainId } = useActiveWeb3React()
  const { isMobile } = useMatchBreakpoints()
  const { account } = useWeb3React()
  const { data: signer } = useSigner()
  const [mySuperior, setMySuperior] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [inviteNumber, setInviteNumber] = useState(0)
  const invitedAddres = INVITED_ADDRESS[chainId] || INVITED_ADDRESS[-1]
  // console.log('invitedAddres', chainId, invitedAddres)
  const invitedPoolContract = useMemo(() => {
    return getContract({ abi: seaiInvited, address: invitedAddres, signer })
  }, [signer, invitedAddres])
  useEffect(() => {
    if (invitedPoolContract && account) {
      invitedPoolContract
        .teamInfo(account)
        .then((result) => {
          const value = result.validAgentSubordinate.toString()
          setInviteNumber(value)
        })
        .catch((err) => {
          console.log('teamInfo', err)
          setInviteNumber(0)
        })
      // console.log('invitedPoolContract', invitedPoolContract)
    }
  }, [invitedPoolContract, account])
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
      <CommonItem title="邀请" imgName="invite_icon" recordHref={!isNotRecord ? '/invited' : ''} recordText="邀请记录">
        <div className="invite_content">
          <span>
            已邀请人数：<em>{inviteNumber}</em>
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
