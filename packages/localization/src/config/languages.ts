import { Language } from '@pancakeswap/uikit'

export const ZHCN: Language = { locale: 'zh-CN', language: '简体中文', code: 'zh-cn' }
export const EN: Language = { locale: 'en-US', language: 'English', code: 'en' }
export const JA: Language = { locale: 'ja-JP', language: '日本語', code: 'ja' }
export const KO: Language = { locale: 'ko-KR', language: '한국어', code: 'ko' }
export const ESES: Language = { locale: 'es-ES', language: 'Español', code: 'es-ES' }

export const languages = {
  'en-US': EN,
  'zh-CN': ZHCN,
  'ko-KR': KO,
  'ja-JP': JA,
  'es-ES': ESES,
}

const languageList = Object.values(languages)

export default languageList
