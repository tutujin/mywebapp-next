"use client";

import React from 'react';

import Calculator from '@/components/Calculator';
import CurrencyConverter from '@/components/CurrencyConverter';
// import { useTranslation } from 'react-i18next'; // Removed

export default function Home() {
  // const { t } = useTranslation('common'); // Removed

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Multi-Tool</h1> {/* Replaced t('multiTool') */}
      <div className="two-column-layout">
        <div className="column converter-column card"> {/* Added 'card' class here */}
          <CurrencyConverter />
        </div>
        <div className="column calculator-column card"> {/* Added 'card' class here */}
          <Calculator />
        </div>
      </div>
    </div>
  );
}