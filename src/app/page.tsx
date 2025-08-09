import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Calculator from '@/components/Calculator';
import CurrencyConverter from '@/components/CurrencyConverter';

export default function Home() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Multi-Tool</h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <CurrencyConverter />
        </div>
        <div className="col-md-6 mb-4">
          <Calculator />
        </div>
      </div>
    </div>
  );
}
