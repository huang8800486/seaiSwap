import styled from 'styled-components'
import { Flex, Box } from '@pancakeswap/uikit'

export const BodyWrap = styled.div<{ isMobile: boolean }>`
  max-width: 1000px;
  padding: 0 10px;
  margin: ${({ isMobile }) => (isMobile ? '20px auto' : '80px auto')};
  min-height: 80vh;
`
export const InviterdWrap = styled.div`
  width: 100%;
  position: relative;
`
export const InviterdTitle = styled.div<{ isMobile: boolean }>`
  width: 100%;
  position: relative;
  font-size: ${({ isMobile }) => (isMobile ? '14px' : '20px')};
  padding: ${({ isMobile }) => (isMobile ? '5px 0' : '20px 0')};
  display: flex;
  flex-wrap: wrap;
  word-break: break-all;
  line-height: 1.5;
`
export const InviterdText = styled.div<{ isMobile: boolean }>`
  width: 100%;
  position: relative;
  font-size: ${({ isMobile }) => (isMobile ? '18px' : '40px')};
  margin-top: ${({ isMobile }) => (isMobile ? '20px' : '40px')};
  margin-bottom: ${({ isMobile }) => (isMobile ? '20px' : '40px')};
  text-align: center;
  font-weight: bold;
`
export const InviterdList = styled.div<{ isMobile: boolean }>`
  width: 100%;
  position: relative;
  height: 54vh;
  overflow-y: auto;
  border: 1px solid var(--colors-cardBorder);
`
export const InviterdItem = styled.div<{ isMobile: boolean }>`
  width: 100%;
  font-size: ${({ isMobile }) => (isMobile ? '14px' : '20px')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: ${({ isMobile }) => (isMobile ? '10px' : '20px 10px')};
  border-bottom: 1px solid var(--colors-cardBorder);
  text-align: center;
`
