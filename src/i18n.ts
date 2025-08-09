import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslation from '../public/locales/en/translation.json';
import zhTranslation from '../public/locales/zh/translation.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      zh: {
        translation: zhTranslation,
      },
    },
    lng: 'en', // default language
    fallbackLng: 'en', // fallback language if translation is not found

    interpolation: {
      escapeValue: false, // react already escapes by default
    },
  });

export default i18n;
