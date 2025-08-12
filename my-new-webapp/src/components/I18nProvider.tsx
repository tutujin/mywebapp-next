"use client";

import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { initI18n } from '../i18n'; // Corrected import path

interface I18nProviderProps {
  children: React.ReactNode;
  locale: string;
  resources: any;
}
// Added a comment to force recompile

const I18nProvider = ({ children, locale, resources }: I18nProviderProps) => {
  const [i18nInstance, setI18nInstance] = useState<any>(null);

  useEffect(() => {
    const initialize = async () => {
      const instance = await initI18n(locale, resources);
      setI18nInstance(instance);
    };
    initialize();
  }, [locale, resources]);

  if (!i18nInstance) {
    return null; // Or a loading spinner
  }

  return (
    <I18nextProvider i18n={i18nInstance}>
      {children}
    </I18nextProvider>
  );
};

export default I18nProvider;
