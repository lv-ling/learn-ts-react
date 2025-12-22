import { useTranslation } from 'react-i18next';

export type Language = 'zh-CN' | 'en-US';

export function useLanguage() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: Language) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language as Language;

  return {
    currentLanguage,
    changeLanguage,
    isZhCN: currentLanguage === 'zh-CN',
    isEnUS: currentLanguage === 'en-US',
  };
}

