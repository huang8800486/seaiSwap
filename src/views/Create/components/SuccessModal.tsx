import { useState, useEffect } from 'react'
import { Input, Button, Modal, useModal } from '@pancakeswap/uikit'
import styled from 'styled-components'
import CurrentInput from './CurrentInput'

const ProperContent = styled.div`
  position: relative;
  max-width: 550px;
  .img_box {
    height: 184px;
    width: 184px;
    margin: 0 auto;
    img {
      width: 100%;
      display: block;
    }
    video {
      width: 100%;
      object-fit: contain;
      height: calc(100% - 50px);
    }
  }
  .address_box {
    font-size: 16px;
    margin-top: 20px;
    span {
      font-weight: bold;
      margin-bottom: 10px;
      display: inline-block;
    }
  }
`

const SuccessModal: React.FC<React.PropsWithChildren<any>> = ({ preview, address, tokenId, onDismiss }) => {
  return (
    <Modal title="Created" onDismiss={onDismiss}>
      <ProperContent>
        {preview && <div className="img_box">{preview}</div>}
        <div className="address_box">
          <span>NFT合约地址</span>
          <p>{address}</p>
        </div>
        <div className="address_box">
          <span>tokenId</span>
          <p>{tokenId}</p>
        </div>
      </ProperContent>
    </Modal>
  )
}

export default SuccessModal
