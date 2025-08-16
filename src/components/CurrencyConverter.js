import React, { useState } from 'react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('CNY');
  const [result, setResult] = useState('');

  const handleConvert = () => {
    // Placeholder for actual conversion logic
    // For demonstration, let's assume 1 USD = 7.185 CNY
    if (fromCurrency === 'USD' && toCurrency === 'CNY') {
      const convertedAmount = parseFloat(amount) * 7.185;
      setResult(`${amount} USD = ${convertedAmount.toFixed(2)} CNY`);
    } else {
      setResult('Conversion not supported for these currencies yet.');
    }
  };

  return (
    <div style={{
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'white',
      marginBottom: '20px'
    }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>汇率转换器</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label htmlFor="amount" style={{ flexShrink: 0, width: '60px', textAlign: 'right' }}>金额:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              flexGrow: 1,
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#add8e6'}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label htmlFor="fromCurrency" style={{ flexShrink: 0, width: '60px', textAlign: 'right' }}>从:</label>
          <select
            id="fromCurrency"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            style={{
              flexGrow: 1,
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#add8e6'}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          >
            <option value="USD">USD</option>
            <option value="CNY">CNY</option>
            {/* Add more currencies as needed */}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label htmlFor="toCurrency" style={{ flexShrink: 0, width: '60px', textAlign: 'right' }}>到:</label>
          <select
            id="toCurrency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            style={{
              flexGrow: 1,
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#add8e6'}
            onBlur={(e) => e.target.style.borderColor = '#ccc'}
          >
            <option value="CNY">CNY</option>
            <option value="USD">USD</option>
            {/* Add more currencies as needed */}
          </select>
        </div>

        <button
          onClick={handleConvert}
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#0070f3',
            color: 'white',
            cursor: 'pointer',
            fontSize: '16px',
            marginTop: '10px'
          }}
        >
          转换
        </button>

        {result && (
          <div style={{
            marginTop: '20px',
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#0070f3'
          }}>
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;