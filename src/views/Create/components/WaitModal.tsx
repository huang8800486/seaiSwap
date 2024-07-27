import { useState, useEffect } from 'react'
import { Input, Button, Modal, useModal } from '@pancakeswap/uikit'
import styled from 'styled-components'

const ProperContent = styled.div`
  position: relative;
  max-width: 550px;
  .wait_box {
    font-size: 24px;
  }
  .comLoading {
    width: 100%;
    position: relative;
  }
  .loading {
    width: 60px;
    height: 60px;
    margin: 40px auto 0;

    .rect {
      background-color: #f5a603;
      height: 100%;
      width: 6px;
      margin: 0 3px;
      display: inline-block;
      -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
      animation: stretchdelay 1.2s infinite ease-in-out;
    }

    .rect2 {
      -webkit-animation-delay: -1.1s;
      animation-delay: -1.1s;
    }

    .rect3 {
      -webkit-animation-delay: -1s;
      animation-delay: -1s;
    }

    .rect4 {
      -webkit-animation-delay: -0.9s;
      animation-delay: -0.9s;
    }

    .rect5 {
      -webkit-animation-delay: -0.8s;
      animation-delay: -0.8s;
    }
  }
  @keyframes stretchdelay {
    0%,
    40%,
    100% {
      -webkit-transform: scaleY(0.4);
    }

    20% {
      -webkit-transform: scaleY(1);
    }
  }

  @keyframes stretchdelay {
    0%,
    40%,
    100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }

    20% {
      transform: scaleY(1);
      -webkit-transform: scaleY(1);
    }
  }
`

const WaitModal: React.FC<React.PropsWithChildren<any>> = ({ onDismiss }) => {
  return (
    <Modal title="Please Wait..." hideCloseButton onDismiss={onDismiss}>
      <ProperContent>
        {/* <div className="wait_box">Please Wait...</div> */}
        <div className="wait_img">
          <div className="comLoading">
            <div className="loading">
              <div className="rect rect1" />
              <div className="rect rect2" />
              <div className="rect rect3" />
              <div className="rect rect4" />
              <div className="rect rect5" />
            </div>
          </div>
        </div>
      </ProperContent>
    </Modal>
  )
}

export default WaitModal
