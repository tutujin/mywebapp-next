import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend) // load translations using http (default public/locales/)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: 'en', // fallback language if translation is not found
    lng: 'en', // default language
    debug: false,
    interpolation: {
      escapeValue: false, // react already escapes by default
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

export default i18n;