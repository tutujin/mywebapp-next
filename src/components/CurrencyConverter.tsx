"use client";

import React, { useState, useEffect } from 'react';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('CNY');
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({});
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch exchange rates from our own API route
  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/exchange-rate?from=${fromCurrency}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to fetch rates for ${fromCurrency}`);
        }
        const data = await response.json();
        setExchangeRates(data.conversion_rates);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, [fromCurrency]);

  // Perform conversion when amount, currencies, or rates change
  useEffect(() => {
    if (exchangeRates[toCurrency]) {
      setConvertedAmount(amount * exchangeRates[toCurrency]);
    }
  }, [amount, toCurrency, exchangeRates]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleFromCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value);
  };

  const currencyOptions = Object.keys(exchangeRates).sort();

  return (
    <div className="currency-converter card">
      <div className="card-body">
        <h5 className="card-title text-center">Currency Converter</h5>
        {loading && <p className="text-center text-info">Loading rates...</p>}
        {error && <p className="text-center text-danger">Error: {error}</p>}
        {!loading && !error && (
          <>
            <div className="form-group">
              <label>Amount</label>
              <input type="number" className="form-control" value={amount} onChange={handleAmountChange} />
            </div>
            <div className="form-group mt-2">
              <label>From</label>
              <select className="form-control" value={fromCurrency} onChange={handleFromCurrencyChange}>
                {currencyOptions.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            <div className="form-group mt-2">
              <label>To</label>
              <select className="form-control" value={toCurrency} onChange={handleToCurrencyChange}>
                {currencyOptions.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            <h4 className="text-center mt-3">
              {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
            </h4>
          </>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
