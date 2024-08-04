import styled, { css } from 'styled-components'

export const CommonContent = styled.div<{ $isNoMargin: boolean }>`
  width: 100%;
  position: relative;
  margin-bottom: 30px;
  margin-bottom: ${({ $isNoMargin }) => ($isNoMargin ? '0' : '30px')};
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
interface Props {
  isNoMargin?: boolean
}
const CommonBox: React.FC<React.PropsWithChildren<Props>> = ({ isNoMargin, children }) => {
  return (
    <>
      <CommonContent $isNoMargin={isNoMargin}>
        <i className="flag_box flag_box_1" />
        <i className="flag_box flag_box_2" />
        <i className="flag_box flag_box_3" />
        <i className="flag_box flag_box_4" />
        {children}
      </CommonContent>
    </>
  )
}

export default CommonBox
