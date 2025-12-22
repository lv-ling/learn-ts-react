import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zhCN from './locales/zh-CN.json';
import enUS from './locales/en-US.json';

// 语言资源
const resources = {
  'zh-CN': {
    translation: zhCN,
  },
  'en-US': {
    translation: enUS,
  },
};

i18n
  .use(initReactI18next) // 将 i18n 传递给 react-i18next
  .init({
    resources,
    lng: 'zh-CN', // 默认语言
    fallbackLng: 'zh-CN', // 回退语言
    interpolation: {
      escapeValue: false, // React 已经转义了，不需要再次转义
    },
  });

// 不能使用 export...from，因为需要先配置 i18n 实例
// eslint-disable-next-line
export default i18n;

