"use client";

import React from 'react';

interface I18nProviderProps {
  children: React.ReactNode;
  locale: string;
  resources: any;
}

const I18nProvider = ({ children, locale, resources }: I18nProviderProps) => {
  return (
    <>
      {children}
    </>
  );
};

export default I18nProvider;