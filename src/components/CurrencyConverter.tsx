"use client";
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const CurrencyConverter: React.FC = () => {
  const { t } = useTranslation('common');
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

  const inputStyle = {
    flexGrow: 1,
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.3s'
  };

  const focusStyle = {
    borderColor: '#add8e6'
  };

  return (
    <div className="currency-converter card">
      <div className="card-body">
        <h5 className="card-title text-center">{t('currencyConverter')}</h5>
        {loading && <p className="text-center text-info">{t('loadingRates')}</p>}
        {error && <p className="text-center text-danger">{t('error')}: {error}</p>}
        {!loading && !error && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <label style={{ flexShrink: 0, width: '60px', textAlign: 'right' }}>{t('amount')}</label>
              <input
                type="number"
                className="form-control"
                value={amount}
                onChange={handleAmountChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e) => e.target.style.borderColor = '#ccc'}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <label style={{ flexShrink: 0, width: '60px', textAlign: 'right' }}>{t('from')}</label>
              <select
                className="form-control"
                value={fromCurrency}
                onChange={handleFromCurrencyChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e) => e.target.style.borderColor = '#ccc'}
              >
                {currencyOptions.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <label style={{ flexShrink: 0, width: '60px', textAlign: 'right' }}>{t('to')}</label>
              <select
                className="form-control"
                value={toCurrency}
                onChange={handleToCurrencyChange}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e) => e.target.style.borderColor = '#ccc'}
              >
                {currencyOptions.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            <h4
              className="text-center mt-3"
              style={
                {
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#0070f3'
                }
              }
            >
              {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
            </h4>
          </>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;