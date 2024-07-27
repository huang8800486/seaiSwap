import { FooterLinkType } from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: 'About Us',
    items: [
      {
        label: 'Docs',
        href: '',
      },
      {
        label: 'Team',
        href: '',
      },
      {
        label: 'News',
        href: '',
      },
      {
        label: 'Github',
        href: '',
      },
      {
        label: 'Bug Bounty',
        href: '',
      },
      {
        label: 'Mirrors',
        href: '',
      },
      {
        label: 'Terms of Use',
        href: '',
      },
      {
        label: 'Privacy Policy',
        href: '',
      },
    ],
  },
  {
    label: 'Features',
    items: [
      {
        label: 'Exchange',
        href: '',
      },
      {
        label: 'Liquidity',
        href: '',
      },
      {
        label: 'Farms',
        href: '',
      },
      {
        label: 'Launchpools',
        href: '',
      },
      {
        label: 'Multi-Reward Pool',
        href: '',
      },
      {
        label: 'Fixed Staking',
        href: '',
      },
      {
        label: 'Analytics',
        href: '',
      },
    ],
  },
  {
    label: 'Service',
    items: [
      {
        label: 'Referral Program',
        href: '',
      },
      {
        label: 'BTH Token',
        href: '',
      },
      {
        label: 'Apply to Launch',
        href: '',
      },
      {
        label: '$10M Program',
        href: '',
      },
      {
        label: 'Space Agents',
        href: '',
      },
    ],
  },
]
