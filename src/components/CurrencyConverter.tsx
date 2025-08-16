"use client";
import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next'; // Removed

const CurrencyConverter: React.FC = () => {
  // const { t } = useTranslation('common'); // Removed
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('CNY');
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({});
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiResponseDebug, setApiResponseDebug] = useState<any>(null); // For debugging API response

  // Fetch exchange rates from our own API route
  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      setError(null);
      setApiResponseDebug(null); // Clear previous debug info
      try {
        const response = await fetch(`/api/exchange-rate?from=${fromCurrency}`);
        if (!response.ok) {
          const errorData = await response.json();
          setApiResponseDebug(errorData); // Store error response for debugging
          throw new Error(errorData.error || `Failed to fetch rates for ${fromCurrency} (Status: ${response.status})`);
        }
        const data = await response.json();
        setApiResponseDebug(data); // Store full response for debugging
        if (data.conversion_rates) {
          setExchangeRates(data.conversion_rates);
        } else {
          throw new Error("API response missing 'conversion_rates' field.");
        }
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
        <h5 className="card-title text-center">Currency Converter</h5> {/* Replaced t('currencyConverter') */}
        {loading && <p className="text-center text-info">Loading rates...</p>} {/* Replaced t('loadingRates') */}
        {error && <p className="text-center text-danger">Error: {error}</p>} {/* Replaced t('error') */}
        {apiResponseDebug && (
          <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #f00', backgroundColor: '#ffebeb', fontSize: '0.8em' }}>
            <strong>API Debug Info:</strong>
            <pre>{JSON.stringify(apiResponseDebug, null, 2)}</pre>
          </div>
        )}
        {!loading && !error && (
          <>
            {Object.keys(exchangeRates).length === 0 && (
              <p className="text-center text-warning">No currency options loaded. Check API key and response.</p>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <label style={{ flexShrink: 0, width: '60px', textAlign: 'right' }}>Amount</label> {/* Replaced t('amount') */}
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
              <label style={{ flexShrink: 0, width: '60px', textAlign: 'right' }}>From</label> {/* Replaced t('from') */}
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
              <label style={{ flexShrink: 0, width: '60px', textAlign: 'right' }}>To</label> {/* Replaced t('to') */}
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