import styled from 'styled-components'

export const StylePageWrapper = styled.div`
  width: 646px;
  max-width: 100%;
  margin: 0 auto;
  padding: 24px;
  color: #fff;
  line-height: 1.5;
`
export const StyleCreateContent = styled.div`
  width: 100%;
  position: relative;
`
export const StyleH2 = styled.h2`
  font-weight: 600;
  font-size: 40px;
  letter-spacing: 0px;
  margin-bottom: 16px;
`
export const StyleUploadWrapper = styled.div`
  width: 100%;
  position: relative;
  p {
    font-weight: 500;
    font-size: 12px;
    color: #cdcdcd;
    em {
      color: rgb(235, 87, 87);
    }
  }
  .label_wrap {
    line-height: 24px;
    font-size: 16px;
    span {
      font-weight: bold;
    }
  }
`
export const StyleUpload = styled.div`
  width: 100%;
  max-width: 350px;
  height: 257px;
  border-radius: 10px;
  border: 1px dashed #cdcdcd;
  margin-top: 12px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  &:hover {
    border: 1px solid #fff;
    background-color: #333;
  }
  .uploading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
  .select_file {
    img {
      position: absolute;
      inset: 0px;
      box-sizing: border-box;
      padding: 0px;
      border: none;
      margin: auto;
      display: block;
      width: 0px;
      height: 0px;
      min-width: 100%;
      max-width: 100%;
      min-height: 100%;
      max-height: 100%;
      object-fit: cover;
    }
    video {
      width: 100%;
      object-fit: contain;
      height: calc(100% - 50px);
    }
  }
  input {
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
  }
`
export const Styledelete = styled.div`
  position: absolute;
  z-index: 111;
  transition: opacity 0.1s ease-in 0s;
  right: 16px;
  top: 16px;
  width: 22px;
  height: 22px;
  img {
    width: 100%;
    display: block;
  }
`
export const StyleCommon = styled.div`
  width: 100%;
  position: relative;
  margin-top: 24px;
  textarea {
    width: 100%;
    height: auto;
    padding: 12px;
    resize: vertical;
    border: 1px solid #fff;
    background-color: transparent;
    border-radius: 10px;
    font-size: 16px;
    line-height: 26px;
    min-height: 26px;
    color: #fff;
  }
  .currentListWrap {
    width: 100%;
    .currentList {
      text-align: center;
      color: #000;
      display: flex;
      flex-wrap: wrap;
      .item_list {
        background-color: #eeeaf4;
        border-radius: 6px;
        margin: 5px;
        margin-top: 10px;
        padding: 10px;
        width: 150px;
      }
      span {
        font-size: 14px;
      }
      h4 {
        color: #f5a603;
        font-size: 16px;
      }
    }
  }
`
export const StyleTitle = styled.div`
  width: 100%;
  margin-bottom: 12px;
`
export const StyleH3 = styled.h3`
  font-size: 16px;
`
export const StyleH4 = styled.h4`
  font-weight: normal;
  font-size: 16px;
  color: #cdcdcd;
`
export const StyleSpan = styled.span`
  font-size: 12px;
  color: #cdcdcd;
`
export const StyleButtonWrap = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  button {
    font-size: 20px;
  }
`
