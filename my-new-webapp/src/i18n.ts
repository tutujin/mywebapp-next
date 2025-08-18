import i18n from 'i18next';
import enCommon from '../public/locales/en/common.json';
import zhCommon from '../public/locales/zh/common.json';

export const getResources = () => ({
  en: {
    common: enCommon,
  },
  zh: {
    common: zhCommon,
  },
});

export const initI18n = async (locale: string, resources: any) => {
  const i18nInstance = i18n.createInstance();
  await i18nInstance.init({
    lng: locale,
    fallbackLng: locale,
    ns: ['common'],
    defaultNS: 'common',
    resources, // Use the passed resources
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });
  return i18nInstance;
};