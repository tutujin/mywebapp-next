"use client";

import React from 'react';
import { I18nextProvider } from 'react-i18next';
import type { i18n as I18nInstanceType } from 'i18next';

interface I18nProviderProps {
  children: React.ReactNode;
  i18n: I18nInstanceType;
}

const I18nProvider: React.FC<I18nProviderProps> = ({ children, i18n }) => {
  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
};

export default I18nProvider;