import { CNFlag } from '@modules/common/icons/flags/CNFlag';
import { CNFlagRound } from '@modules/common/icons/flags/CNFlagRound';
import { DEFlag } from '@modules/common/icons/flags/DEFlag';
import { DEFlagRound } from '@modules/common/icons/flags/DEFlagRound';
import { ESFlag } from '@modules/common/icons/flags/ESFlag';
import { ESFlagRound } from '@modules/common/icons/flags/ESFlagRound';
import { ILFlag } from '@modules/common/icons/flags/ILFlag';
import { ILFlagRound } from '@modules/common/icons/flags/ILFlagRound';
import { SAFlag } from '@modules/common/icons/flags/SAFlag';
import { SAFlagRound } from '@modules/common/icons/flags/SAFlagRound';
import { USFlag } from '@modules/common/icons/flags/USFlag';
import { USFlagRound } from '@modules/common/icons/flags/USFlagRound';
import { useRouter } from 'next/navigation';


const localeRTLList = ['ar', 'he'];
export function useIsRTL() {
  const { locale } = useRouter();
  if (locale && localeRTLList.includes(locale)) {
    return { isRTL: true, alignLeft: 'right', alignRight: 'left' };
  }
  return { isRTL: false, alignLeft: 'left', alignRight: 'right' };
}

export let languageMenu = [
  {
    id: "ar",
    name: "عربى",
    value: "ar",
    icon: <SAFlag width="20px" height="15px" />,
    iconMobile: <SAFlagRound />
  },
  {
    id: "zh",
    name: "中国人",
    value: "zh",
    icon: <CNFlag width="20px" height="15px" />,
    iconMobile: <CNFlagRound />
  },
  {
    id: "en",
    name: "English",
    value: "en",
    icon: <USFlag width="20px" height="15px" />,
    iconMobile: <USFlagRound />
  },
  {
    id: "de",
    name: "Deutsch",
    value: "de",
    icon: <DEFlag width="20px" height="15px" />,
    iconMobile: <DEFlagRound />
  },
  {
    id: "he",
    name: "rעברית",
    value: "he",
    icon: <ILFlag width="20px" height="15px" />,
    iconMobile: <ILFlagRound />
  },
  {
    id: "es",
    name: "Español",
    value: "es",
    icon: <ESFlag width="20px" height="15px" />,
    iconMobile: <ESFlagRound />
  },
]