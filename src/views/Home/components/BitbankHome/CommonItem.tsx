import { useMatchBreakpoints } from '@pancakeswap/uikit'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import CommonBox from './CommonBox'

export const getMedia = (value: string[]) => () => {
  const { isMobile, isTablet } = useMatchBreakpoints()
  return isMobile ? value[0] : isTablet ? value[1] : value[2]
}
export const CommonContent = styled.div`
  width: 100%;
  position: relative;
  padding: ${getMedia(['22px 16px', '24px 18px', '26px 20px'])};
  background: rgba(39, 51, 77, 0.8);
  h2 {
    color: #fff;
    font-size: ${getMedia(['15px', '18px', '20px'])};
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    .title_img {
      width: 36px;
      height: 34px;
      display: block;
      margin-right: 11px;
    }
    .record {
      position: absolute;
      right: 0;
      top: 10px;
      color: #cccccc;
      font-size: ${getMedia(['13px', '14px', '15px'])};
      display: flex;
      justify-content: center;
      span {
        margin-right: 6px;
      }
      img {
        width: 8px;
        height: 12px;
      }
    }
  }
  .imte_box {
    position: relative;
    width: 100%;
  }
`
interface Props {
  isNotRecord?: string
  title?: string
  imgName?: string
  recordHref?: string
  recordText?: string
}
const CommonItem: React.FC<React.PropsWithChildren<Props>> = ({ title, recordHref, imgName, recordText, children }) => {
  return (
    <>
      <CommonBox>
        <CommonContent>
          <h2>
            {imgName && <img className="title_img" src={`/images/icons/${imgName}.png`} alt="" />}
            <span>{title}</span>
            {recordHref && (
              <Link href={recordHref}>
                <div className="record">
                  <span>{recordText}</span>
                  <img src="/images/icons/arrow-right.png" alt="" />
                </div>
              </Link>
            )}
          </h2>
          <div className="imte_box">{children}</div>
        </CommonContent>
      </CommonBox>
    </>
  )
}

export default CommonItem
