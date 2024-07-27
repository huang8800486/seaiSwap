export interface PlayInfoType {
  extractedTokenReturn: string | number | undefined
  id: string | number | undefined
  nonces: string | number | undefined
  referrer: string | number | undefined
  totalAmount: string | number | undefined
  totalRemainingAmount: string | number | undefined
}
export interface TeamInfoType {
  cdwAmount: string | number | undefined
  pendingCDWAmount: string | number | undefined
  referrReward: string | number | undefined
  remaingCDWAmount: string | number | undefined
  totalFlow: string | number | undefined
  totalTeamReward: string | number | undefined
  validAgentSubordinate: string | number | undefined
  validDirectRecommend: string | number | undefined
}
export interface WithdrawHistory {
  withdrawAmount: string
  withdrawTime: string
}
export interface InvitedHistoryType {
  amount: string
  address: string
}
export const defaultReferrerAddress = ''
