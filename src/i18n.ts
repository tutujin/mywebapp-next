import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

// Function to create a new i18n instance
export const createI18nInstance = (locale: string) => {
  const instance = i18n.createInstance();
  instance
    .use(HttpBackend) // load translations using http (default public/locales/)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      fallbackLng: 'en', // fallback language if translation is not found
      lng: locale, // use the provided locale
      debug: false,
      interpolation: {
        escapeValue: false, // react already escapes by default
      },
      backend: {
        loadPath: '/locales/{{lng}}/translation.json',
      },
    });
  return instance;
};

// Initialize a default instance for client-side use if needed
const defaultInstance = createI18nInstance('en');
export default defaultInstance;
