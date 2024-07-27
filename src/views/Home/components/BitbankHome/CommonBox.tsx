import styled, { css } from 'styled-components'
export const CommonContent = styled.div`
  width: 100%;
  position: relative;
  .flag_box {
    position: absolute;
    z-index: 10;
    &:before,
    &:after {
      content: '';
      position: absolute;
      background: ${({ theme }) => theme.colors.primary};
    }
  }
  .flag_box_1 {
    left: 0;
    top: 0;
    &:before {
      left: 0;
      top: 0;
      width: 10px;
      height: 2px;
    }
    &:after {
      left: 0;
      top: 0;
      width: 2px;
      height: 10px;
    }
  }
  .flag_box_2 {
    right: 0;
    top: 0;
    &:before {
      right: 0;
      top: 0;
      width: 10px;
      height: 2px;
    }
    &:after {
      right: 0;
      top: 0;
      width: 2px;
      height: 10px;
    }
  }
  .flag_box_3 {
    left: 0;
    bottom: 0;
    &:before {
      left: 0;
      bottom: 0;
      width: 10px;
      height: 2px;
    }
    &:after {
      left: 0;
      bottom: 0;
      width: 2px;
      height: 10px;
    }
  }
  .flag_box_4 {
    right: 0;
    bottom: 0;
    &:before {
      right: 0;
      bottom: 0;
      width: 10px;
      height: 2px;
    }
    &:after {
      right: 0;
      bottom: 0;
      width: 2px;
      height: 10px;
    }
  }
`
const CommonBox: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <CommonContent>
        <i className="flag_box flag_box_1"></i>
        <i className="flag_box flag_box_2"></i>
        <i className="flag_box flag_box_3"></i>
        <i className="flag_box flag_box_4"></i>
        {children}
      </CommonContent>
    </>
  )
}

export default CommonBox
