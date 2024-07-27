import { Language } from "../LangSelector/types";
import { FooterLinkType } from "./types";
import {
  TwitterIcon,
  TelegramIcon,
  RedditIcon,
  InstagramIcon,
  FacebookIcon,
  GithubIcon,
  DiscordIcon,
  MediumIcon,
} from "../Svg";

export const footerLinks: FooterLinkType[] = [
  {
    label: "About",
    items: [
      {
        label: "Contact",
        href: "https://docs.pancakeswap.finance/contact-us",
      },
      {
        label: "Blog",
        href: "https://medium.com/pancakeswap",
      },
      {
        label: "Community",
        href: "https://docs.pancakeswap.finance/contact-us/telegram",
      },
      {
        label: "CAKE",
        href: "https://docs.pancakeswap.finance/tokenomics/cake",
      },
      {
        label: "—",
      },
      {
        label: "Online Store",
        href: "https://pancakeswap.creator-spring.com/",
        isHighlighted: true,
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        label: "Customer",
        href: "Support https://docs.pancakeswap.finance/contact-us/customer-support",
      },
      {
        label: "Troubleshooting",
        href: "https://docs.pancakeswap.finance/help/troubleshooting",
      },
      {
        label: "Guides",
        href: "https://docs.pancakeswap.finance/get-started",
      },
    ],
  },
  {
    label: "Developers",
    items: [
      {
        label: "Github",
        href: "https://github.com/pancakeswap",
      },
      {
        label: "Documentation",
        href: "https://docs.pancakeswap.finance",
      },
      {
        label: "Bug Bounty",
        href: "https://app.gitbook.com/@pancakeswap-1/s/pancakeswap/code/bug-bounty",
      },
      {
        label: "Audits",
        href: "https://docs.pancakeswap.finance/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited",
      },
      {
        label: "Careers",
        href: "https://docs.pancakeswap.finance/hiring/become-a-chef",
      },
    ],
  },
];

export const socials = [
  {
    label: "Telegram",
    icon: TelegramIcon,
    items: [
      {
        label: "English",
        href: "https://t.me/WebxBank2050",
      },
      {
        label: "中文",
        href: "https://t.me/WebxBank2050",
      },
      {
        label: "Español",
        href: "https://t.me/WebxBank2050",
      },
      {
        label: "日本語",
        href: "https://t.me/WebxBank2050",
      },
    ],
  },
  {
    label: "Instagram",
    icon: InstagramIcon,
    href: "https://www.youtube.com/channel/UCM_dhr99QWFI2xup3Rz7Dww",
  },
  {
    label: "Facebook",
    icon: FacebookIcon,
    href: "",
  },
  {
    label: "Twitter",
    icon: TwitterIcon,
    href: "https://twitter.com/BankWebx2050",
  },
  {
    label: "Reddit",
    icon: RedditIcon,
    href: "",
  },
  {
    label: "Github",
    icon: GithubIcon,
    href: "",
  },
  {
    label: "Discord",
    icon: DiscordIcon,
    href: "",
  },
  {
    label: "Medium",
    icon: MediumIcon,
    href: "",
  },
];

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));
